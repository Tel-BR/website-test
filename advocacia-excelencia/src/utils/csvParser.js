/**
 * Parse CSV to array of objects
 * @param {string} csvText - Raw CSV text
 * @returns {Array<Object>} Array of objects with headers as keys
 */
export function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  // Detect separator (comma or tab)
  const firstLine = lines[0];
  const separator = firstLine.includes('\t') ? '\t' : ',';

  const headers = lines[0].split(separator).map(h => h.trim().replace(/^"|"$/g, ''));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(separator);
    const row = {};
    
    headers.forEach((header, index) => {
      let value = values[index] || '';
      value = value.trim().replace(/^"|"$/g, '');
      
      // Convert \n to actual line breaks
      value = value.replace(/\\n/g, '\n');
      
      row[header] = value;
    });
    
    data.push(row);
  }

  return data;
}

/**
 * Parse config data to key-value object
 * @param {Array} configArray - Array from parseCSV with campo/valor structure
 * @returns {Object} Config object
 */
export function parseConfig(configArray) {
  const config = {};
  
  configArray.forEach(row => {
    if (row.campo && row.valor !== undefined) {
      config[row.campo] = row.valor;
    }
  });
  
  return config;
}
