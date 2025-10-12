export function parseCSV(csvText) {
  const rows = []
  let i = 0, field = '', row = [], inQuotes = false
  const pushField = () => { row.push(field); field = '' }
  const pushRow = () => { rows.push(row); row = [] }
  while (i < csvText.length) {
    const char = csvText[i]
    if (inQuotes) {
      if (char === '"' && csvText[i+1] === '"') { field += '"'; i += 2; continue }
      if (char === '"') { inQuotes = false; i++; continue }
      field += char; i++; continue
    }
    if (char === '"') { inQuotes = true; i++; continue }
    if (char === ',') { pushField(); i++; continue }
    if (char === '\n') { pushField(); pushRow(); i++; continue }
    if (char === '\r') { i++; continue }
    field += char; i++
  }
  if (field.length || row.length) { pushField(); pushRow() }
  if (!rows.length) return []
  const headers = rows[0].map(h => h.trim())
  return rows.slice(1).filter(r => r.length && r.some(v => v && v.trim() !== '')).map(r => {
    const obj = {}
    headers.forEach((h, idx) => { obj[h] = (r[idx] ?? '').trim() })
    return obj
  })
}
