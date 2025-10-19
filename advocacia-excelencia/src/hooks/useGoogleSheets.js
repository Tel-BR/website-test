import { useState, useEffect } from 'react';
import { parseCSV, parseConfig } from '../utils/csvParser';

const cache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Fetch single sheet by GID
 * @param {string} baseUrl - Base Google Sheets URL
 * @param {string} gid - Sheet GID
 * @returns {Promise<string>} CSV text
 */
async function fetchSheetByGID(baseUrl, gid) {
  const cacheKey = `${baseUrl}-${gid}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const url = `${baseUrl}?gid=${gid}&single=true&output=csv`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet ${gid}: ${response.statusText}`);
  }
  
  const data = await response.text();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}

/**
 * Hook to load config from Google Sheets
 * @returns {Object} { config, loading, error }
 */
export function useConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        // Load config.json first
        const configResponse = await fetch('/config.json');
        const configData = await configResponse.json();
        
        // Try to fetch from Google Sheets
        try {
          const csvText = await fetchSheetByGID(configData.sheetsUrl, configData.gids.config);
          const configArray = parseCSV(csvText);
          const parsedConfig = parseConfig(configArray);
          
          // Merge with GIDs
          parsedConfig.gids = configData.gids;
          parsedConfig.sheetsUrl = configData.sheetsUrl;
          
          setConfig(parsedConfig);
        } catch (sheetsError) {
          console.warn('Failed to load from Sheets, using fallback:', sheetsError);
          
          // Load fallback
          const fallbackResponse = await fetch('/fallback.json');
          const fallback = await fallbackResponse.json();
          fallback.config.gids = configData.gids;
          fallback.config.sheetsUrl = configData.sheetsUrl;
          
          setConfig(fallback.config);
        }
      } catch (err) {
        setError(err);
        console.error('Error loading config:', err);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  return { config, loading, error };
}

/**
 * Hook to load single sheet data
 * @param {string} sheetName - Name of the sheet (e.g., 'home', 'servicos')
 * @param {Object} config - Config object with sheetsUrl and gids
 * @returns {Object} { data, loading, error }
 */
export function useSingleSheet(sheetName, config) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config || !config.gids || !config.gids[sheetName]) {
      setLoading(false);
      return;
    }

    async function loadSheet() {
      try {
        const csvText = await fetchSheetByGID(config.sheetsUrl, config.gids[sheetName]);
        const parsed = parseCSV(csvText);
        setData(parsed);
      } catch (err) {
        console.warn(`Failed to load ${sheetName}, using fallback:`, err);
        
        // Try fallback
        try {
          const fallbackResponse = await fetch('/fallback.json');
          const fallback = await fallbackResponse.json();
          setData(fallback[sheetName] || []);
        } catch (fallbackErr) {
          setError(fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    }

    loadSheet();
  }, [sheetName, config]);

  return { data, loading, error };
}
