# 🔧 Correções Aplicadas

## Problema Identificado

O erro HTTP 400 ocorreu porque a URL do Google Sheets estava incorreta para carregar a aba `config`.

### Erro Original:
```
GET https://...?gid=0&output=csv 400 (Bad Request)
```

### Causa:
A aba `config` é a primeira aba da planilha e não precisa do parâmetro `gid=0`.

## ✅ Correções Aplicadas

### 1. `src/utils/sheetsLoader.js`
- **Alterado:** Função `loadConfig()` agora carrega sem GID
- **Antes:** `?gid=0&output=csv`
- **Depois:** `?output=csv`

### 2. `public/fallback.json`
- **Adicionado:** Todos os GIDs das abas
- **Adicionado:** Configurações de background (`*_bg`)

### 3. `src/App.jsx`
- **Adicionado:** Logs de debug para verificar dados carregados

## 🧪 Como Testar

1. **Recarregue a página** (Ctrl + Shift + R para forçar)
2. **Abra o Console** (F12)
3. **Verifique os logs progressivos:**

Você deve ver:
```
[Config] Carregado com sucesso
[Loaded] GID 1667578598: 1 rows
[App] Fase 1 completa - Hero carregado
[Loaded] GID 1926868684: 1 rows
[Loaded] GID 1148773424: 3 rows
[App] Fase 2 completa - Sobre/Diferenciais carregados
[Loaded] GID 1654814347: 5 rows
[App] Fase 3 completa - Todas as seções carregadas
```

**Importante:** O loading screen deve desaparecer em ~1 segundo, mostrando o Hero imediatamente!

## 🔍 Diagnóstico

### Se ainda houver erro 400:
1. Verifique se a planilha está **publicada**
2. Confirme a URL em `src/utils/sheetsLoader.js` linha 1
3. Teste a URL diretamente no navegador:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-1vTMZbriZzspnUygt7KZc38BOVicLhkwaFkF3GmlJrESFE7jQAWLEzshC-797h4l96X3-0JBEAXeT_vk/pub?output=csv
   ```

### Se as seções não aparecem:
1. Verifique o console: `[App] Seções carregadas`
2. Se todos os valores forem `0`, os GIDs estão incorretos
3. Verifique os GIDs na planilha (URL da aba: `#gid=NUMERO`)

### Se apenas Contato aparece:
- Isso é normal se os dados não carregarem
- Contato não depende do Google Sheets
- Verifique os logs do console

## 🚀 Próximos Passos

Após recarregar, você deve ver:
- ✅ Hero section (topo)
- ✅ Sobre
- ✅ Números (estatísticas)
- ✅ Prêmios
- ✅ Diferenciais
- ✅ Serviços
- ✅ Equipe
- ✅ Depoimentos
- ✅ FAQ
- ✅ CTA
- ✅ Contato

## 📝 Notas

- O fallback será usado se o Google Sheets falhar
- Cache de 5 minutos está ativo
- Para limpar cache: `localStorage.clear()` no console
