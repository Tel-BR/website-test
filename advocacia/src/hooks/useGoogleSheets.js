import { useEffect, useMemo, useState } from 'react'
import { parseCSV } from '../utils/csvParser'

async function fetchCSV(baseUrl, gid) {
  // Constrói URL de forma robusta, evitando duplicar gid e garantindo output=csv
  let url
  try {
    const u = new URL(baseUrl)
    if (gid) u.searchParams.set('gid', String(gid))
    if (!u.searchParams.get('output')) u.searchParams.set('output', 'csv')
    // Mantém single=true se já existir; caso não exista, não é obrigatório
    url = u.toString()
  } catch {
    // Fallback para bases sem URL absoluta (incomum)
    url = gid ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}gid=${gid}` : baseUrl
  }
  // Removed noisy console logs before production build
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Falha ao carregar planilha (status ${res.status})`)
  const text = await res.text()
  return parseCSV(text)
}

function buildWhatsappLink(num, msg) {
  if (!num) return ''
  const enc = encodeURIComponent(msg)
  return `https://wa.me/${num}?text=${enc}`
}

function parseConfigFlexible(rows) {
  if (!rows || !rows.length) return null
  // 1) Padrão campo/valor
  const hasCampoValor = rows[0] && Object.prototype.hasOwnProperty.call(rows[0], 'campo') && Object.prototype.hasOwnProperty.call(rows[0], 'valor')
  if (hasCampoValor) {
    const out = {}
    for (const r of rows) {
      if (r.campo) out[r.campo] = r.valor
    }
    if (Object.keys(out).length) return out
  }
  // 2) Qualquer dois primeiros campos como KV
  const allKeys = Object.keys(rows[0] || {})
  if (allKeys.length >= 2) {
    const k1 = allKeys[0], k2 = allKeys[1]
    const out = {}
    for (const r of rows) {
      const key = (r[k1] || '').trim()
      const val = (r[k2] || '').trim()
      if (key) out[key] = val
    }
    if (Object.keys(out).length) return out
  }
  // 3) Primeira linha como objeto completo (colunas = chaves)
  return rows[0]
}

export function useGoogleSheets() {
  // URL hardcoded - edite aqui para mudar a planilha
  const baseUrl = import.meta.env.VITE_SHEET_PUBLIC_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZbz9yApkk7BSqX8KTRbe2bUW8kdkPU1hwvbtNdP5WNCJKyxEjrAfgyEtNMxu2G_GqfuqdmmRFYfNe/pub'
  const configGid = import.meta.env.VITE_CONFIG_GID || '697226083'
  const [state, setState] = useState({ loading: true, error: '', config: null, tabs: {}, loadingTabs: {} })
  const useEnvGids = (import.meta.env.VITE_USE_ENV_GIDS || '').toString() === '1'

  const TAB_KEYS = ['home','sobre','servicos','equipe','portfolio','blog','contato','diferencial','depoimentos','faq','cta','seo']
  const cacheKey = `gidCache:${baseUrl}`
  const cacheTTL = 1000 * 60 * 60 * 24 * 7 // 7 dias

  function getEnvGidMap() {
    const map = {}
    TAB_KEYS.forEach(k => {
      const v = import.meta.env[`VITE_${k.toUpperCase()}_GID`]
      if (v) map[`${k}_GID`] = String(v).match(/\d+/g)?.join('') || ''
    })
    return map
  }

  function getCachedGidMap() {
    try {
      const raw = localStorage.getItem(cacheKey)
      if (!raw) return null
      const data = JSON.parse(raw)
      if (!data?.ts || !data?.map) return null
      if (Date.now() - data.ts > cacheTTL) return null
      return data.map
    } catch { return null }
  }

  function setCachedGidMap(map) {
    try { localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), map })) } catch {}
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        if (!baseUrl || !configGid) throw new Error('VITE_SHEET_PUBLIC_URL ou VITE_CONFIG_GID ausentes')

        // 1) GIDs via .env
        let gidMap = useEnvGids ? getEnvGidMap() : null
        // 2) Se não houver .env, tenta cache local
        if (!gidMap || Object.keys(gidMap).length === 0) {
          gidMap = getCachedGidMap()
        }
        // 3) Sempre ler config do CSV para meta (como *_bg), além dos GIDs
        const configRows = await fetchCSV(baseUrl, configGid)
        const rawConfig = parseConfigFlexible(configRows)
        if (!rawConfig) throw new Error('Config vazia ou inválida')
        const normKey = (s) => String(s || '')
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '_')
        const sanitized = (() => {
          const out = {}
          for (const [k, v] of Object.entries(rawConfig)) {
            const trimmed = typeof v === 'string' ? v.trim() : v
            if (String(k).endsWith('_GID')) {
              const onlyDigits = String(trimmed || '').match(/\d+/g)?.join('') || ''
              out[k] = onlyDigits
              const nk = normKey(k)
              if (nk !== k) out[nk] = onlyDigits
            } else {
              out[k] = trimmed
              const nk = normKey(k)
              if (nk !== k) out[nk] = trimmed
            }
          }
          return out
        })()
        if (!gidMap || Object.keys(gidMap).length === 0) {
          gidMap = Object.fromEntries(TAB_KEYS.map(k => [`${k}_GID`, sanitized[`${k}_GID`] || '']))
          setCachedGidMap(gidMap)
        }

        // Carrega somente a HOME inicialmente usando gidMap
        const gidHome = gidMap?.home_GID
        const home = gidHome ? await fetchCSV(baseUrl, gidHome) : []

        const config = { ...sanitized, ...gidMap }
        const partial = { loading: false, error: '', config, tabs: { home }, loadingTabs: {} }
        if (mounted) setState(partial)
      } catch (e) {
        console.error('[Sheets] Erro:', e)
        try {
          const fb = await fetch('/fallback.json').then(r => r.json())
          if (mounted) setState({ loading: false, error: e.message, config: fb.config, tabs: fb.tabs, loadingTabs: {} })
        } catch {
          if (mounted) setState({ loading: false, error: e.message, config: null, tabs: {}, loadingTabs: {} })
        }
      }
    })()
    return () => { mounted = false }
  }, [baseUrl, configGid])

  async function loadTab(key) {
    // Evita recarregar
    if (state.tabs[key] && state.tabs[key].__loaded) return
    if (state.loadingTabs[key]) return
    // Ordem de preferência: .env -> cache (em config) -> planilha
    let gid = null
    if (useEnvGids) {
      gid = import.meta.env[`VITE_${key.toUpperCase()}_GID`] || null
      gid = gid ? String(gid).match(/\d+/g)?.join('') || '' : ''
    }
    if (!gid) gid = state.config?.[`${key}_GID`]
    if (!gid) {
      console.debug(`[Sheets] Skip ${key} (sem GID)`)
      return
    }
    setState(s => ({ ...s, loadingTabs: { ...s.loadingTabs, [key]: true } }))
    try {
      const data = await fetchCSV(baseUrl, gid)
      console.debug(`[Sheets] ${key}`, data.length)
      setState(s => ({ ...s, tabs: { ...s.tabs, [key]: Object.assign([], data, { __loaded: true }) }, loadingTabs: { ...s.loadingTabs, [key]: false } }))
    } catch (e) {
      console.error(`[Sheets] Erro carregando ${key}:`, e)
      setState(s => ({ ...s, loadingTabs: { ...s.loadingTabs, [key]: false } }))
    }
  }

  const helpers = useMemo(() => ({
    wpLink(msg = 'Olá, preciso de orientação jurídica') {
      const num = state?.config?.whatsapp || ''
      return buildWhatsappLink(num, msg)
    },
    loadTab,
  }), [state?.config])

  return { ...state, ...helpers }
}
