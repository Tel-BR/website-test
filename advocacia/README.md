# Site Advocacia

Site institucional para escritórios de advocacia com integração Google Sheets.

## 🚀 Tecnologias
- React 18 + Vite
- TailwindCSS
- Framer Motion
- Lucide React (ícones)
- Google Sheets como CMS

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Copie `.env.example` para `.env.local`
2. Configure a URL da planilha Google Sheets publicada
3. Ajuste os GIDs de cada aba

## 🏃 Desenvolvimento

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## ☁️ Deploy (Cloudflare Pages)

- **Root directory:** `advocacia`
- **Build command:** `npm run build`
- **Output directory:** `dist`

## 📊 Estrutura da Planilha

Abas necessárias: `config`, `home`, `sobre`, `servicos`, `equipe`, `portfolio`, `blog`, `contato`, `diferencial`, `depoimentos`, `faq`, `cta`, `seo`
