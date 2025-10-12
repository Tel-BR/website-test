# 🚀 Guia de Configuração - Sorrir Bem Odontologia

Este guia detalha como configurar e personalizar o site do zero.

## 📋 Pré-requisitos

- **Node.js** 18+ instalado ([Download](https://nodejs.org/))
- **Git** instalado (opcional)
- Conta Google (para Google Sheets)
- Editor de código (VS Code recomendado)

## 🔧 Instalação Inicial

### 1. Clone ou Baixe o Projeto

```bash
# Via Git
git clone [URL_DO_REPOSITORIO]
cd odontologia-website

# Ou baixe o ZIP e extraia
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 📊 Configuração do Google Sheets

### Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Nomeie como "Sorrir Bem - Conteúdo Site"

### Passo 2: Criar as Abas

Crie as seguintes abas (nomes EXATOS):

- `config`
- `home`
- `sobre`
- `equipe`
- `servicos`
- `diferencial`
- `depoimentos`
- `faq`
- `cta`
- `seo`
- `numeros`
- `premios`

### Passo 3: Preencher os Dados

Copie os dados TSV fornecidos no briefing para cada aba correspondente.

**Importante:** Cole como valores (Ctrl+Shift+V) para evitar formatação incorreta.

### Passo 4: Publicar a Planilha

1. Clique em **Arquivo** → **Compartilhar** → **Publicar na web**
2. Selecione **Planilha inteira**
3. Formato: **CSV**
4. Clique em **Publicar**
5. Copie a URL gerada

### Passo 5: Obter os GIDs

Para cada aba:
1. Clique na aba
2. Veja a URL: `...#gid=123456789`
3. Copie o número após `gid=`
4. Cole na aba `config` no campo correspondente

Exemplo:
```
home_GID        1667578598
sobre_GID       1926868684
equipe_GID      1293421888
...
```

### Passo 6: Atualizar URL no Código

Edite `src/utils/sheetsLoader.js`:

```javascript
const SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/[SUA_URL_AQUI]/pub';
```

Substitua pela URL da sua planilha (sem `?output=csv` no final).

## 🎨 Personalização de Cores

### Via Google Sheets (Recomendado)

Edite a aba `config`:

```
primaryColor    #0EA5E9    (Cor principal)
secondaryColor  #0284C7    (Cor secundária)
accentColor     #06B6D4    (Cor de destaque)
```

### Via Código

Edite `src/index.css`:

```css
:root {
  --primary: #0EA5E9;
  --secondary: #0284C7;
  --accent: #06B6D4;
}
```

## 📧 Configuração do Formulário de Contato

### Método 1: FormSubmit (Recomendado)

1. O e-mail é lido automaticamente da aba `config`
2. No primeiro envio, você receberá um e-mail de confirmação
3. Clique no link para ativar
4. Pronto! Os formulários chegarão no e-mail

### Método 2: Netlify Forms

Se hospedar na Netlify, edite `src/sections/Contato.jsx`:

```jsx
<form name="contato" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contato" />
  {/* ... resto do formulário ... */}
</form>
```

### Método 3: Formspree

1. Crie conta em [Formspree.io](https://formspree.io)
2. Obtenha seu endpoint
3. Edite `src/sections/Contato.jsx`:

```javascript
const response = await fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  // ...
});
```

## 🗺️ Configuração do Google Maps

O mapa usa a API pública do Google Maps. Para produção:

1. Obtenha uma API Key em [Google Cloud Console](https://console.cloud.google.com)
2. Ative a **Maps Embed API**
3. Edite `src/sections/Contato.jsx`:

```jsx
src={`https://www.google.com/maps/embed/v1/place?key=SUA_API_KEY&q=${encodeURIComponent(config.endereco)}`}
```

## 🌐 Deploy

### Vercel (Mais Fácil)

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Para produção:
```bash
vercel --prod
```

### Netlify

1. Faça build:
```bash
npm run build
```

2. Acesse [Netlify](https://netlify.com)
3. Arraste a pasta `dist/` para o site
4. Pronto!

### GitHub Pages

1. Edite `vite.config.js`:
```javascript
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ...
})
```

2. Build:
```bash
npm run build
```

3. Deploy:
```bash
npm install -g gh-pages
gh-pages -d dist
```

## 🔄 Atualização de Conteúdo

### Sem Redeployar

Basta editar a planilha Google Sheets. As mudanças aparecem em até 5 minutos (cache).

### Limpar Cache Manualmente

Adicione `?nocache=1` na URL ou abra o console do navegador:

```javascript
localStorage.clear();
location.reload();
```

## 🎯 Checklist Pré-Lançamento

- [ ] Planilha publicada e GIDs configurados
- [ ] URL da planilha atualizada no código
- [ ] Cores personalizadas
- [ ] Formulário de contato testado
- [ ] Todas as imagens carregando
- [ ] Links de redes sociais funcionando
- [ ] WhatsApp com número correto (formato E.164)
- [ ] Meta tags SEO preenchidas
- [ ] Favicon personalizado
- [ ] Teste em mobile, tablet e desktop
- [ ] Google Maps exibindo corretamente
- [ ] Build de produção sem erros

## 🐛 Problemas Comuns

### "Erro ao carregar configurações"

**Causa:** URL da planilha incorreta ou não publicada

**Solução:**
1. Verifique se a planilha está publicada
2. Confirme a URL em `sheetsLoader.js`
3. Teste a URL diretamente no navegador

### Imagens não carregam

**Causa:** URLs inválidas ou bloqueadas por CORS

**Solução:**
1. Use URLs do Unsplash ou servidores públicos
2. Hospede imagens no mesmo servidor
3. Configure CORS no servidor de imagens

### Formulário não envia

**Causa:** FormSubmit não ativado ou e-mail incorreto

**Solução:**
1. Verifique o e-mail na aba `config`
2. Teste em produção (não funciona em localhost)
3. Confirme no spam o e-mail de ativação

### Cores não aplicam

**Causa:** Cache do navegador ou CSS não compilado

**Solução:**
1. Limpe o cache (Ctrl+Shift+R)
2. Reinicie o servidor de desenvolvimento
3. Verifique se os valores HEX estão corretos

### Menu mobile não abre

**Causa:** JavaScript não carregado ou erro de build

**Solução:**
1. Verifique o console do navegador
2. Reinstale dependências: `rm -rf node_modules && npm install`
3. Limpe o cache do Vite: `rm -rf .vite`

## 📱 Testes Recomendados

### Navegadores

- [ ] Chrome/Edge (últimas 2 versões)
- [ ] Firefox (últimas 2 versões)
- [ ] Safari (macOS/iOS)

### Dispositivos

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad/Android)
- [ ] Desktop (1920x1080)

### Funcionalidades

- [ ] Navegação por menu
- [ ] Links de âncora (#sobre, #contato, etc)
- [ ] Formulário de contato
- [ ] Botão WhatsApp
- [ ] Links de redes sociais
- [ ] Scroll suave
- [ ] Animações hover

## 🔐 Segurança

### Boas Práticas

1. **Nunca commite** API keys no código
2. Use variáveis de ambiente para dados sensíveis
3. Mantenha dependências atualizadas: `npm audit fix`
4. Configure HTTPS no deploy (automático em Vercel/Netlify)

### Variáveis de Ambiente

Crie `.env` na raiz:

```env
VITE_SHEET_URL=https://docs.google.com/...
VITE_MAPS_API_KEY=sua_api_key
```

Use no código:

```javascript
const SHEET_BASE_URL = import.meta.env.VITE_SHEET_URL;
```

## 📞 Suporte

### Documentação Oficial

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

### Comunidade

- [Stack Overflow](https://stackoverflow.com)
- [GitHub Issues](https://github.com)

---

**Boa sorte com seu site! 🚀**
