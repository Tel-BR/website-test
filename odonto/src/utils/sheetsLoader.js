const SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMZbriZzspnUygt7KZc38BOVicLhkwaFkF3GmlJrESFE7jQAWLEzshC-797h4l96X3-0JBEAXeT_vk/pub';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

function parseCsv(csv) {
  const lines = [];
  let current = '';
  let inQuotes = false;
  
  // Parse respeitando aspas (para quebras de linha dentro de células)
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === '\n' && !inQuotes) {
      if (current.trim()) {
        lines.push(current);
      }
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    lines.push(current);
  }
  
  if (lines.length < 2) return [];
  
  // Parse header
  const headers = [];
  let headerLine = lines[0];
  current = '';
  inQuotes = false;
  
  for (let char of headerLine) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      headers.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  headers.push(current.trim().replace(/^"|"$/g, ''));
  
  // Parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    current = '';
    inQuotes = false;
    
    for (let char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      data.push(row);
    }
  }
  
  return data;
}

async function fetchSheet(gid) {
  const cacheKey = `sheet_${gid}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    if (import.meta.env.DEV) {
      console.log(`[Cache Hit] GID ${gid}`);
    }
    return cached.data;
  }
  
  try {
    const url = `${SHEET_BASE_URL}?gid=${gid}&output=csv`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const csv = await response.text();
    const data = parseCsv(csv);
    
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    if (import.meta.env.DEV) {
      console.log(`[Loaded] GID ${gid}:`, data.length, 'rows');
    }
    
    return data;
  } catch (error) {
    console.error(`[Error] Failed to load GID ${gid}:`, error);
    return [];
  }
}

export async function loadConfig() {
  try {
    // Carregar a aba config sem GID (primeira aba da planilha)
    const url = `${SHEET_BASE_URL}?output=csv`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const csv = await response.text();
    const data = parseCsv(csv);
    
    if (data.length === 0) {
      throw new Error('Config vazia');
    }
    
    const config = {};
    data.forEach(row => {
      if (row.campo && row.valor !== undefined) {
        config[row.campo] = row.valor;
      }
    });
    
    // Aplicar cores CSS
    if (config.primaryColor) {
      document.documentElement.style.setProperty('--primary', config.primaryColor);
    }
    if (config.secondaryColor) {
      document.documentElement.style.setProperty('--secondary', config.secondaryColor);
    }
    if (config.accentColor) {
      document.documentElement.style.setProperty('--accent', config.accentColor);
    }
    
    if (import.meta.env.DEV) {
      console.log('[Config] Carregado com sucesso');
    }
    
    return config;
  } catch (error) {
    console.error('[Config] Erro ao carregar, usando fallback:', error);
    const fallback = await fetch('/fallback.json').then(r => r.json());
    return fallback.config;
  }
}

export async function loadSection(gid) {
  if (!gid || gid === '') return [];
  return await fetchSheet(gid);
}

export function clearCache() {
  cache.clear();
  console.log('[Cache] Limpo');
}
