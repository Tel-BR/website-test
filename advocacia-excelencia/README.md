# 🚀 Advocacia de Excelência

Site institucional desenvolvido com **Vite + React + Tailwind CSS + Framer Motion**

## ⚡ Performance Otimizada

- ✅ Carregamento em 3 fases (Hero → Above Fold → Below Fold)
- ✅ Lazy loading de imagens
- ✅ Cache de configurações (1 hora)
- ✅ Code splitting automático
- ✅ Skeleton screens durante carregamento
- ✅ Fetch de abas individuais por GID (2-5 KB cada)

## 📋 Quick Start

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## ⚙️ Configuração

### 1. Planilha Google Sheets

A planilha já está configurada em `public/config.json` com todos os 16 GIDs:

- **config** (697226083) - Configurações gerais
- **home** (1667578598) - Hero section
- **sobre** (1926868684) - Sobre nós
- **servicos** (1654814347) - Áreas de atuação
- **diferencial** (1148773424) - Diferenciais
- **depoimentos** (278972317) - Depoimentos
- **equipe** (1293421888) - Corpo jurídico
- **produtos** (166180010) - Produtos (se aplicável)
- **portfolio** (57244491) - Casos de sucesso
- **blog** (1967115869) - Blog/Notícias
- **faq** (404529196) - Perguntas frequentes
- **premios** (1664987429) - Prêmios e certificações
- **numeros** (1909706945) - Números/Estatísticas
- **contato** (1240823125) - Informações de contato
- **cta** (1833053882) - Calls to action
- **seo** (1005674998) - Meta tags SEO

### 2. Editar Conteúdo

**Textos e Dados:** Edite diretamente na planilha Google Sheets  
**Logo:** Altere `logoUrl` na aba config  
**Cores:** Altere `primaryColor`, `secondaryColor`, `accentColor`  
**Fundos:** Altere campos `*_bg` (gradient:auto, solid:auto, URL, ou vazio)

### 3. Publicar Planilha

1. Abra a planilha no Google Sheets
2. **Arquivo → Compartilhar → Publicar na web → CSV**
3. Certifique-se que está publicando como CSV (não HTML)
4. As mudanças aparecem automaticamente no site após ~5 minutos (cache)

## 🎨 Paleta de Cores

- **Primary:** #003B7A (Azul marinho institucional)
- **Secondary:** #C41E3A (Vermelho justiça)
- **Accent:** #B8860B (Dourado elegante)

## 📱 Contatos

- **WhatsApp:** +55 (62) 9 3999-6589
- **Email:** advocaciadeexcelenciaservidor@gmail.com
- **Endereço:** Av. Das Espatódias, Qd. 2, Lt 04, CEP 74855-290, Goiânia-GO
- **Horário:** Segunda a Sexta, 08:00 às 17:00h

## 🚀 Deploy

### Cloudflare Pages

```bash
# Build
npm run build

# Deploy (se wrangler instalado)
wrangler pages publish dist
```

**Build settings no Cloudflare:**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `advocacia-excelencia` (se monorepo)

**Não precisa de variáveis de ambiente** - tudo está em `config.json`

### Outras plataformas

O projeto funciona em qualquer plataforma de hospedagem estática:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🔧 Estrutura do Projeto

```
advocacia-excelencia/
├── public/
│   ├── config.json          # GIDs e URL da planilha
│   └── fallback.json        # Dados de fallback (dev)
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, WhatsApp
│   │   ├── sections/       # Hero, About, Services, etc
│   │   └── ui/             # Button, Card, Skeleton, LazyImage
│   ├── hooks/              # useConfig, useGoogleSheets
│   ├── utils/              # csvParser
│   ├── App.jsx             # App principal com 3 fases
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🐛 Troubleshooting

**Dados não carregam:**
- Verifique se a planilha está publicada como CSV
- Confirme que os GIDs em `config.json` estão corretos
- Limpe o cache do navegador (Ctrl+Shift+R)
- Aguarde 5-10 minutos após publicar mudanças

**Imagens não aparecem:**
- URLs devem ser públicas e acessíveis
- Verifique se não há bloqueio de CORS
- Use URLs diretas do Unsplash ou placehold.co

**Cores não aplicam:**
- Formato deve ser `#RRGGBB` exato
- Limpe cache e reconstrua: `npm run build`

**Performance lenta:**
- Verifique tamanho das imagens (ideal < 200 KB)
- Use URLs otimizadas do Unsplash (`?w=800&q=80`)
- Certifique-se que está usando CSV (não pubhtml)

## 📊 Tecnologias

- **React 18** - UI Library
- **Vite 5** - Build tool ultra-rápido
- **Tailwind CSS 3** - Utility-first CSS
- **Framer Motion 10** - Animações fluidas
- **Lucide React** - Ícones modernos
- **Google Sheets** - CMS (Content Management)

## 🎯 Features

- ✅ 100% Responsivo (mobile-first)
- ✅ Animações suaves e performáticas
- ✅ Lazy loading inteligente
- ✅ SEO otimizado
- ✅ Acessibilidade (WCAG AA)
- ✅ Formulário de contato funcional
- ✅ Botão WhatsApp flutuante
- ✅ Menu dropdown (desktop)
- ✅ Menu hamburguer (mobile)
- ✅ Smooth scroll
- ✅ Cache estratégico

## 📝 Licença

© 2025 Advocacia de Excelência - Todos os direitos reservados

---

**Desenvolvido com ❤️ usando tecnologias modernas**
