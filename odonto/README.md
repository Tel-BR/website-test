# 🦷 Sorrir Bem Odontologia - Website

Site institucional moderno e responsivo desenvolvido em React + Vite, integrado com Google Sheets para gerenciamento dinâmico de conteúdo.

## 🎯 Características

- ✅ **Integração com Google Sheets** - Conteúdo gerenciável sem código
- ✅ **Design Responsivo** - Otimizado para mobile, tablet e desktop
- ✅ **Performance Otimizada** - Cache inteligente, lazy loading e pré-carregamento
- ✅ **SEO Friendly** - Meta tags dinâmicas e estrutura semântica
- ✅ **Formulário de Contato** - Integração com FormSubmit
- ✅ **Acessibilidade** - Contraste adequado e navegação por teclado
- ✅ **Animações Suaves** - Transições e hover effects profissionais

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e leves
- **Google Sheets API** - Gerenciamento de conteúdo
- **FormSubmit** - Envio de formulários sem backend

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🗂️ Estrutura do Projeto

```
odontologia-website/
├── public/
│   ├── fallback.json      # Dados de fallback
│   └── favicon.svg        # Ícone do site
├── src/
│   ├── components/
│   │   ├── Header.jsx     # Cabeçalho com menu
│   │   └── Footer.jsx     # Rodapé
│   ├── sections/
│   │   ├── Hero.jsx       # Seção principal
│   │   ├── Sobre.jsx      # Sobre + Números + Prêmios
│   │   ├── Diferenciais.jsx
│   │   ├── Servicos.jsx
│   │   ├── Equipe.jsx
│   │   ├── Depoimentos.jsx
│   │   ├── FAQ.jsx
│   │   ├── CTA.jsx
│   │   └── Contato.jsx    # Formulário + Mapa
│   ├── utils/
│   │   └── sheetsLoader.js # Carregador Google Sheets
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globais
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Paleta de Cores

- **Primary:** `#0EA5E9` (Sky 500) - Azul vibrante
- **Secondary:** `#0284C7` (Sky 600) - Azul profundo
- **Accent:** `#06B6D4` (Cyan 500) - Ciano para CTAs

## 📊 Google Sheets

O site carrega dados dinamicamente de uma planilha Google Sheets publicada. As abas incluem:

- `config` - Configurações gerais, cores, contatos
- `home` - Hero section
- `sobre` - Sobre a clínica
- `equipe` - Profissionais
- `servicos` - Especialidades
- `diferencial` - Diferenciais
- `depoimentos` - Depoimentos de pacientes
- `faq` - Perguntas frequentes
- `cta` - Call to action
- `seo` - Meta tags
- `numeros` - Estatísticas
- `premios` - Reconhecimentos

### Como Atualizar Conteúdo

1. Acesse a planilha Google Sheets
2. Edite os dados nas abas correspondentes
3. As alterações aparecem no site em até 5 minutos (cache)

## 📧 Formulário de Contato

O formulário usa **FormSubmit.co** para envio de e-mails:

- Sem necessidade de backend
- Proteção anti-spam
- Notificações por e-mail
- Resposta automática configurável

## 🌐 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Arraste a pasta dist/ para Netlify
```

### Outras Plataformas

O site é 100% estático após o build. Basta fazer upload da pasta `dist/` para qualquer servidor web.

## 🔧 Configuração

### Alterar URL da Planilha

Edite `src/utils/sheetsLoader.js`:

```javascript
const SHEET_BASE_URL = 'SUA_URL_AQUI';
```

### Alterar E-mail de Contato

Edite a aba `config` da planilha, campo `email`.

### Personalizar Cores

Edite a aba `config` da planilha:
- `primaryColor`
- `secondaryColor`
- `accentColor`

## 📱 Responsividade

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## ⚡ Performance

- **Cache:** 5 minutos para dados do Sheets
- **Lazy Loading:** Imagens carregadas sob demanda
- **Code Splitting:** Componentes otimizados
- **Minificação:** CSS e JS minificados no build

## 🐛 Troubleshooting

### Dados não carregam

1. Verifique se a planilha está publicada
2. Confirme os GIDs na aba `config`
3. Verifique o console do navegador

### Formulário não envia

1. Confirme o e-mail na aba `config`
2. Verifique se o FormSubmit está ativo
3. Teste em modo de produção (não funciona em localhost)

## 📄 Licença

Este projeto foi desenvolvido para **Sorrir Bem Odontologia**.

## 👨‍💻 Suporte

Para dúvidas ou suporte, entre em contato através do e-mail configurado na planilha.

---

**Desenvolvido com ❤️ usando React + Vite + TailwindCSS**
