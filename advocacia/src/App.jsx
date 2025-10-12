import { useMemo, useRef, useEffect, useState } from 'react'
import { useGoogleSheets } from './hooks/useGoogleSheets'
import { motion } from 'framer-motion'
import { Circle, User, MessageCircle } from 'lucide-react'

function Section({ id, children }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 py-16">{children}</section>
  )
}

function Hero({ config, home }) {
  const item = home?.[0] || {}
  const bgStyle = item.imagem_url
    ? { backgroundImage: `linear-gradient(135deg, rgba(10,61,98,0.85), rgba(6,42,67,0.85)), url(${item.imagem_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: `linear-gradient(135deg, var(--primary,#0A3D62), #062a43)` }
  return (
    <div className="relative text-white overflow-hidden" style={bgStyle}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
        <svg className="w-[120%] h-[120%] -translate-x-10 -translate-y-10" viewBox="0 0 800 600" fill="none">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent,#F5C542)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="120" r="160" fill="url(#g1)" />
          <circle cx="700" cy="520" r="140" fill="url(#g1)" />
        </svg>
      </div>
      <Section id="home">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h1 className="heading-font text-3xl md:text-5xl font-semibold">{item.titulo || 'Defesa especializada para Militares e Servidores'}</h1>
            <p className="mt-4 text-lg/7 opacity-95">{item.subtitulo || config?.siteSlogan || ''}</p>
            <div className="mt-8">
              <a href={item.cta_link || '#'} className="inline-block bg-[var(--secondary,#B71C1C)] text-white px-6 py-3 rounded-md shadow hover:shadow-lg hover:-translate-y-0.5 transition">{item.cta_texto || 'Falar no WhatsApp'}</a>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}

function Sobre({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="sobre">
      <h2 className="heading-font text-2xl font-semibold mb-6">Sobre Nós</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg glass" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            <div className="text-sm uppercase tracking-wide text-slate-500">{r.secao}</div>
            <div className="mt-2 text-xl font-medium heading-font">{r.titulo}</div>
            {r.imagem_url ? (
              <img src={r.imagem_url} alt="" className="mt-3 w-full h-40 object-cover rounded-md" />
            ) : null}
            <div className="mt-2 leading-relaxed">{r.conteudo}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

const ICONS = { Circle, User, MessageCircle }
function IconByName({ name }) {
  const Comp = ICONS[name] || Circle
  return <Comp className="w-5 h-5" />
}

function Servicos({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="servicos">
      <h2 className="heading-font text-2xl font-semibold mb-6">Áreas de Atuação</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg flex flex-col gap-3 hover:shadow-lg transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-[var(--primary,#0A3D62)]"><IconByName name={r.icone} /><span className="font-medium heading-font">{r.titulo}</span></div>
            <div className="text-sm leading-relaxed">{r.descricao}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Equipe({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="equipe">
      <h2 className="heading-font text-2xl font-semibold mb-6">Nossa Equipe</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg text-center hover:shadow-lg transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            {r.imagem_url ? (
              <img src={r.imagem_url} alt="" className="mx-auto mb-3 w-20 h-20 object-cover rounded-full" />
            ) : null}
            <div className="text-lg font-medium heading-font">{r.nome}</div>
            <div className="text-sm text-slate-500">{r.cargo}</div>
            <div className="mt-2 text-sm leading-relaxed">{r.bio}</div>
            {r.whatsapp ? (
              <a
                href={`https://wa.me/${String(r.whatsapp).replace(/\D/g,'')}?text=${encodeURIComponent('Olá, gostaria de falar com ' + (r.nome || 'o(a) advogado(a)'))}`}
                className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-md text-white bg-[var(--secondary,#B71C1C)] hover:-translate-y-0.5 transition"
                target="_blank" rel="noopener"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            ) : null}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Portfolio({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="portfolio">
      <h2 className="heading-font text-2xl font-semibold mb-6">Portfólio</h2>
      <div className="space-y-4">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg hover:shadow-lg transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            {r.imagem_url ? (
              <img src={r.imagem_url} alt="" className="w-full h-44 object-cover rounded-md mb-4" />
            ) : null}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="font-medium heading-font">{r.titulo}</div>
              <div className="text-sm text-slate-500">{r['cliente/órgão']}</div>
              <div className="text-sm text-emerald-700">{r.resultado}</div>
            </div>
            <div className="mt-2 text-sm leading-relaxed">{r.resumo}</div>
            {r.link_url ? (
              <a href={r.link_url} target="_blank" rel="noopener" className="inline-block mt-3 text-[var(--primary,#0A3D62)] hover:underline">Ver detalhes</a>
            ) : null}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Blog({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="blog">
      <h2 className="heading-font text-2xl font-semibold mb-6">Blog / Notícias</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {rows.map((r, i) => (
          <motion.article key={i} className="border rounded-lg overflow-hidden hover:shadow-lg transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            {r.imagem_url ? <img src={r.imagem_url} alt="" className="w-full h-40 object-cover" /> : null}
            <div className="p-6">
              <div className="flex flex-wrap gap-3 items-center">
                <a className="font-medium text-[var(--primary,#0A3D62)] heading-font" href={`/${r.slug || ''}`}>{r.titulo}</a>
                <div className="text-sm text-slate-500">{r.data}</div>
              </div>
              <div className="mt-2 text-sm leading-relaxed">{r.resumo}</div>
              {r.keywords ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.keywords.split(';').map((k, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-slate-100">{k.trim()}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function Contato({ rows, wp }) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' })
  const onChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }))
  return (
    <Section id="contato">
      <h2 className="heading-font text-2xl font-semibold mb-6">Fale Conosco</h2>
      <div className="max-w-2xl p-4 border rounded-lg">
        <div className="text-sm text-slate-600 mb-3">Nos envie uma mensagem e retornaremos o quanto antes.</div>
        <form className="space-y-3" action="https://formsubmit.co/advocaciadeexcelenciaservidor@gmail.com" method="POST">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Contato pelo site" />
          <input type="hidden" name="_template" value="table" />
          <input name="nome" value={form.nome} onChange={onChange} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Seu nome" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="email" type="email" value={form.email} onChange={onChange} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="E-mail" />
            <input name="telefone" value={form.telefone} onChange={onChange} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Telefone" />
          </div>
          <textarea name="mensagem" value={form.mensagem} onChange={onChange} className="w-full border rounded-md px-3 py-2 text-sm min-h-[120px]" placeholder="Como podemos ajudar?"></textarea>
          <div className="flex gap-2">
            <button type="submit" className="inline-flex items-center gap-2 bg-[var(--secondary,#B71C1C)] text-white px-4 py-2 rounded-md shadow hover:-translate-y-0.5 transition">Enviar</button>
          </div>
        </form>
        <div className="mt-6 text-sm text-slate-700">
          <div><strong>Endereço:</strong> Av. Das Espatódias, Qd. 2, Lt 04 CEP 74855290</div>
          <div className="mt-2"><strong>Horário:</strong> Segunda a Sexta, 08:00 às 17:00</div>
          <div className="mt-2"><strong>E-mail:</strong> <a className="text-[var(--primary,#0A3D62)]" href="mailto:advocaciadeexcelenciaservidor@gmail.com">advocaciadeexcelenciaservidor@gmail.com</a></div>
          <div className="mt-2"><strong>Blog:</strong> <a className="text-[var(--primary,#0A3D62)]" href="https://advocaciadeexcelencia.blogspot.com/" target="_blank" rel="noreferrer">https://advocaciadeexcelencia.blogspot.com/</a></div>
        </div>
      </div>
    </Section>
  )
}

function Diferencial({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="diferencial">
      <h2 className="heading-font text-2xl font-semibold mb-6">Diferenciais</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg flex gap-3 items-start hover:shadow-lg transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            <div className="text-[var(--primary,#0A3D62)]"><IconByName name={r.icone} /></div>
            <div>
              <div className="font-medium">{r.titulo}</div>
              <div className="text-sm mt-1">{r.descricao}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Depoimentos({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="depoimentos">
      <h2 className="heading-font text-2xl font-semibold mb-6">Depoimentos</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg hover:shadow transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-2">
              {r.avatar_url ? <img src={r.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" /> : <User className="w-10 h-10 text-slate-400" />}
              <div>
                <div className="text-sm text-slate-900">{r.nome}</div>
                <div className="text-xs text-slate-500">{r.cargo}</div>
              </div>
            </div>
            <div className="text-sm leading-relaxed">“{r.depoimento}”</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function FAQ({ rows }) {
  if (!rows?.length) return null
  return (
    <Section id="faq">
      <h2 className="heading-font text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {rows.map((r, i) => (
          <details key={i} className="p-4 border rounded-lg hover:shadow transition">
            <summary className="font-medium">{r.pergunta}</summary>
            <div className="mt-2 text-sm leading-relaxed">{r.resposta}</div>
          </details>
        ))}
      </div>
    </Section>
  )
}

function CTA({ rows, wp }) {
  if (!rows?.length) return null
  return (
    <Section id="cta">
      <div className="grid md:grid-cols-2 gap-6">
        {rows.map((r, i) => (
          <motion.div key={i} className="p-6 border rounded-lg hover:shadow-lg transition" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i*0.05 }} viewport={{ once: true }}>
            <div className="text-xl font-medium heading-font">{r.titulo}</div>
            <div className="text-sm mt-1">{r.subtitulo}</div>
            <a href={r.cta_link === '[auto]' ? wp() : r.cta_link} className="inline-block mt-4 bg-[var(--secondary,#B71C1C)] text-white px-5 py-2 rounded-md shadow hover:-translate-y-0.5 transition">{r.cta_texto}</a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function LazySection({ id, loadKey, loadTab, children, style, className }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !loadKey || !loadTab) return
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        loadTab(loadKey)
        io.disconnect()
      }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [loadKey, loadTab])
  return <div ref={ref} id={id} style={style} className={className}>{children}</div>
}

export default function App() {
  const { loading, error, config, tabs, wpLink, loadTab } = useGoogleSheets()
  const [viewRoute, setViewRoute] = useState('/')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState({ faz: false, quem: false, rec: false })
  const hoverTimers = useRef({})
  const openWithDelay = (key) => {
    const t = hoverTimers.current[key]
    if (t) clearTimeout(t)
    setOpenDrop(s => ({ ...s, [key]: true }))
  }
  const closeWithDelay = (key) => {
    const t = hoverTimers.current[key]
    if (t) clearTimeout(t)
    hoverTimers.current[key] = setTimeout(() => {
      setOpenDrop(s => ({ ...s, [key]: false }))
    }, 150)
  }
  const themeVars = useMemo(() => ({
    '--primary': config?.primary_color || '#0A3D62',
    '--secondary': config?.secondary_color || '#B71C1C',
    '--accent': config?.accent_color || '#F5C542',
    '--font-primary': config?.primaryFont || 'Inter, ui-sans-serif, system-ui, sans-serif',
    '--font-secondary': config?.secondaryFont || 'Spectral, ui-serif, Georgia, serif',
  }), [config])

  // BG helpers: usa config["<sec>_bg"]. Se URL, usa imagem; se 'gradient:auto' usa gradiente leve; se vazio, sem fundo; padrão placeholder sólido muito claro baseado em primary.
  const hexToRgb = (hex) => {
    const m = String(hex || '').replace('#','').match(/.{1,2}/g)
    if (!m || (m.length !== 3 && m.length !== 4)) return { r:10, g:61, b:98 }
    const [r,g,b] = [parseInt(m[0],16), parseInt(m[1],16), parseInt(m[2],16)]
    return { r: r||0, g: g||0, b: b||0 }
  }
  const sectionBgStyle = (key) => {
    const val = config?.[`${key}_bg`] || ''
    const prim = config?.primary_color || '#0A3D62'
    const acc = config?.accent_color || '#F5C542'
    const { r, g, b } = hexToRgb(prim)
    if (!val) {
      // sem fundo explícito: manter como está (sem background)
      return undefined
    }
    if (/^https?:\/\//i.test(val) || val.startsWith('data:') || val.startsWith('url(')) {
      return {
        backgroundImage: val.startsWith('url(') ? val : `url(${val})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    }
    if (val === 'gradient:auto') {
      const a = hexToRgb(acc)
      return {
        backgroundImage: `linear-gradient(180deg, rgba(${r},${g},${b},0.05), rgba(${a.r},${a.g},${a.b},0.05))`
      }
    }
    // fallback: cor chapada muito clara derivada do primary
    return { backgroundColor: `rgba(${r},${g},${b},0.04)` }
  }

  useEffect(() => {
    const getHash = () => (typeof location !== 'undefined' && location.hash ? location.hash.slice(1) : '')
    if (typeof location !== 'undefined' && !location.hash) {
      location.hash = '#/'
    }
    // Título e favicon (internalizados)
    try {
      const title = 'Advocacia de Excelência'
      if (document.title !== title) document.title = title
      const fav = '/favicon.svg'
      const ensureFavicon = (href) => {
        const rels = ['icon','shortcut icon']
        rels.forEach(rel => {
          let link = document.querySelector(`link[rel="${rel}"]`)
          if (!link) {
            link = document.createElement('link')
            link.rel = rel
            document.head.appendChild(link)
          }
          link.href = href
          link.type = href.endsWith('.svg') ? 'image/svg+xml' : 'image/x-icon'
        })
      }
      ensureFavicon(fav)
    } catch {}
    const applyHash = () => {
      const h = getHash()
      if (h.startsWith('/')) {
        setViewRoute(h || '/')
      } else {
        // Trata como âncora one-page
        setViewRoute('/')
        if (h) {
          const key = h
          if (key !== 'home') loadTab?.(key)
          const el = document.getElementById(key)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
    applyHash()
    const onHash = () => applyHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Prefetch de dados da rota (carrega a aba correspondente sem navegar)
  const prefetch = (href) => {
    try {
      const str = href || '/'
      const key = str.startsWith('/') ? str.replace('/','') : str.replace('#','') || 'home'
      if (key !== 'home') loadTab?.(key)
    } catch {}
  }

  const goAnchor = (e, key) => {
    e.preventDefault()
    if (typeof location !== 'undefined') {
      location.hash = `#${key}`
    }
  }
  console.debug('[App] render', { viewRoute, hasConfig: !!config, tabsKeys: Object.keys(tabs||{}) })
  const showFallback = !config
  return (
    <div style={themeVars} className="min-h-screen" >
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#home" onClick={(e)=> goAnchor(e,'home')} onMouseEnter={() => prefetch('home')} className="flex items-center gap-2">
            {config?.logo_url ? (
              <img src={config.logo_url} alt="logo" className="h-10 w-auto" />
            ) : (
              <span className="heading-font font-semibold text-[var(--primary,#0A3D62)]">{config?.siteName || 'Site'}</span>
            )}
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {/* Início */}
            <a href="#home" onMouseEnter={() => prefetch('home')} onClick={(e)=> goAnchor(e,'home')} className="hover:text-[var(--primary,#0A3D62)]">Início</a>

            {/* Quem Somos: Sobre(+Diferencial+Depoimentos) + Equipe */}
            <div className="relative" onMouseEnter={()=>openWithDelay('quem')} onMouseLeave={()=>closeWithDelay('quem')}>
              <button className="hover:text-[var(--primary,#0A3D62)]">Quem Somos</button>
              {openDrop.quem && (
                <div className="absolute left-0 mt-2 w-max min-w-[140px] bg-white/80 backdrop-blur-md shadow-md p-1 animate-in fade-in zoom-in-95">
                  <a href="#sobre" onMouseEnter={()=> prefetch('sobre')} onClick={(e)=> goAnchor(e,'sobre')} className="block px-2 py-1 text-sm whitespace-nowrap hover:bg-slate-50">Sobre</a>
                  <a href="#equipe" onMouseEnter={()=> prefetch('equipe')} onClick={(e)=> goAnchor(e,'equipe')} className="block px-2 py-1 text-sm whitespace-nowrap hover:bg-slate-50">Equipe</a>
                </div>
              )}
            </div>

            {/* O que Fazemos: Serviços + Portfólio */}
            <div className="relative" onMouseEnter={()=>openWithDelay('faz')} onMouseLeave={()=>closeWithDelay('faz')}>
              <button className="hover:text-[var(--primary,#0A3D62)]">O que Fazemos</button>
              {openDrop.faz && (
                <div className="absolute left-0 mt-2 w-max min-w-[140px] bg-white/80 backdrop-blur-md shadow-md p-1 animate-in fade-in zoom-in-95">
                  <a href="#servicos" onMouseEnter={()=> prefetch('servicos')} onClick={(e)=> goAnchor(e,'servicos')} className="block px-2 py-1 text-sm whitespace-nowrap hover:bg-slate-50">Serviços</a>
                  <a href="#portfolio" onMouseEnter={()=> prefetch('portfolio')} onClick={(e)=> goAnchor(e,'portfolio')} className="block px-2 py-1 text-sm whitespace-nowrap hover:bg-slate-50">Portfólio</a>
                </div>
              )}
            </div>

            {/* Recursos: Blog + FAQ */}
            <div className="relative" onMouseEnter={()=>openWithDelay('rec')} onMouseLeave={()=>closeWithDelay('rec')}>
              <button className="hover:text-[var(--primary,#0A3D62)]">Recursos</button>
              {openDrop.rec && (
                <div className="absolute left-0 mt-2 w-max min-w-[140px] bg-white/80 backdrop-blur-md shadow-md p-1 animate-in fade-in zoom-in-95">
                  <a href="#blog" onMouseEnter={()=> prefetch('blog')} onClick={(e)=> goAnchor(e,'blog')} className="block px-2 py-1 text-sm whitespace-nowrap hover:bg-slate-50">Blog</a>
                  <a href="#faq" onMouseEnter={()=> prefetch('faq')} onClick={(e)=> goAnchor(e,'faq')} className="block px-2 py-1 text-sm whitespace-nowrap hover:bg-slate-50">FAQ</a>
                </div>
              )}
            </div>
          </nav>
          {/* CTA de destaque no header */}
          {(() => {
            // Força CTA para abrir a página de contato, com o texto desejado
            const ctaText = 'Entre em contato'
            return (
              <a href="#contato" onMouseEnter={()=> prefetch('contato')} onClick={(e)=> goAnchor(e,'contato')} className="ml-4 inline-flex items-center gap-2 bg-[var(--secondary,#B71C1C)] text-white px-4 py-2 rounded-md shadow hover:-translate-y-0.5 transition">
                {ctaText}
              </a>
            )
          })()}
        </div>
      </header>

      {showFallback && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-sm text-slate-600">[App] Carregando conteúdo…</div>
        </div>
      )}

      {viewRoute === '/' && (
        <>
          <div id="home" style={sectionBgStyle('home')}>
            <Hero config={config} home={tabs.home} />
          </div>
          {/* Nova ordem: Quem Somos (Sobre + Diferencial + Depoimentos + Equipe) */}
          <LazySection id="sobre" loadKey="sobre" loadTab={loadTab} style={sectionBgStyle('sobre')}>
            <Sobre rows={tabs.sobre} />
          </LazySection>
          <LazySection id="diferencial" loadKey="diferencial" loadTab={loadTab} style={sectionBgStyle('diferencial')}>
            <Diferencial rows={tabs.diferencial} />
          </LazySection>
          <LazySection id="depoimentos" loadKey="depoimentos" loadTab={loadTab} style={sectionBgStyle('depoimentos')}>
            <Depoimentos rows={tabs.depoimentos} />
          </LazySection>
          <LazySection id="equipe" loadKey="equipe" loadTab={loadTab} style={sectionBgStyle('equipe')}>
            <Equipe rows={tabs.equipe} />
          </LazySection>
          {/* O que Fazemos (Serviços, Portfólio) */}
          <LazySection id="servicos" loadKey="servicos" loadTab={loadTab} style={sectionBgStyle('servicos')}>
            <Servicos rows={tabs.servicos} />
          </LazySection>
          <LazySection id="portfolio" loadKey="portfolio" loadTab={loadTab} style={sectionBgStyle('portfolio')}>
            <Portfolio rows={tabs.portfolio} />
          </LazySection>
          {/* Recursos (Blog + FAQ) */}
          <LazySection id="blog" loadKey="blog" loadTab={loadTab} style={sectionBgStyle('blog')}>
            <Blog rows={tabs.blog} />
          </LazySection>
          <LazySection id="faq" loadKey="faq" loadTab={loadTab} style={sectionBgStyle('faq')}>
            <FAQ rows={tabs.faq} />
          </LazySection>
          {/* Fale Conosco */}
          <LazySection id="contato" loadKey="contato" loadTab={loadTab} style={sectionBgStyle('contato')}>
            <Contato rows={tabs.contato} wp={wpLink} />
          </LazySection>
        </>
      )}
      {viewRoute === '/sobre' && (
        <>
          <Sobre rows={tabs.sobre} />
        </>
      )}
      {viewRoute === '/servicos' && (
        <>
          <Servicos rows={tabs.servicos} />
        </>
      )}
      {viewRoute === '/equipe' && (
        <>
          <Equipe rows={tabs.equipe} />
        </>
      )}
      {viewRoute === '/portfolio' && (
        <>
          <Portfolio rows={tabs.portfolio} />
        </>
      )}
      {viewRoute === '/blog' && (
        <>
          <Blog rows={tabs.blog} />
        </>
      )}
      {viewRoute === '/contato' && (
        <>
          <Contato rows={tabs.contato} wp={wpLink} />
        </>
      )}
      {viewRoute === '/depoimentos' && (
        <>
          <Depoimentos rows={tabs.depoimentos} />
        </>
      )}
      {viewRoute === '/faq' && (
        <>
          <FAQ rows={tabs.faq} />
        </>
      )}
      {viewRoute === '/cta' && (
        <>
          <CTA rows={tabs.cta} wp={wpLink} />
        </>
      )}

      {/* Lazy: quando a rota mudar, tentar carregar a aba correspondente */}
      <RouteLoader route={viewRoute} loadTab={loadTab} />

      <footer className="mt-16 border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-600">{config?.siteSlogan || ''}</div>
      </footer>

      {/* Sticky CTA WhatsApp */}
      <a href={wpLink()} className="fixed bottom-4 right-4 z-50 bg-[var(--secondary,#B71C1C)] text-white px-4 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition">
        <span className="inline-flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Falar no WhatsApp</span>
      </a>

      {loading && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center text-sm bg-white/50">Carregando…</div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white text-sm px-3 py-2 rounded">{error}</div>
      )}
    </div>
  )
}

function RouteLoader({ route, loadTab }) {
  useEffect(() => {
    const key = route.replace('/','') || 'home'
    if (key !== 'home') loadTab(key)
  }, [route])
  return null
}
