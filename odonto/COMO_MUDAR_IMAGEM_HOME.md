# 🖼️ Como Mudar a Imagem da Home

## 📍 Localização

A imagem da home (Hero section) agora é **editável pela planilha Google Sheets**.

---

## 📝 Passo a Passo

### 1. Abra a Planilha Google Sheets

Acesse sua planilha do site.

### 2. Vá para a Aba `home`

Clique na aba chamada **home** (primeira linha de dados do site).

### 3. Adicione a Coluna `imagem_url`

**Estrutura atual da aba `home`:**
```
titulo | subtitulo | cta_texto | cta_link
```

**Estrutura NOVA (adicione as colunas):**
```
titulo | subtitulo | cta_texto | cta_link | imagem_url | imagem_alt
```

### 4. Preencha os Dados

**Exemplo:**

| titulo | subtitulo | cta_texto | cta_link | imagem_url | imagem_alt |
|--------|-----------|-----------|----------|------------|------------|
| Odontologia moderna com atendimento humanizado para toda a família | Cuidamos do seu sorriso com tecnologia de ponta... | Agendar Consulta | #contato | https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80 | Clínica Odontológica Moderna |

### 5. Salve e Aguarde

- A planilha salva automaticamente
- Aguarde até 5 minutos (cache)
- Recarregue o site (Ctrl + Shift + R)

---

## 🎨 Onde Encontrar Imagens

### **Opção 1: Unsplash (Gratuito)**

1. Acesse: https://unsplash.com
2. Busque por: "dental clinic", "dentist office", "modern clinic"
3. Clique na imagem desejada
4. Clique em "Download" (botão verde)
5. Copie a URL da imagem

**Formato da URL:**
```
https://images.unsplash.com/photo-XXXXXXX?w=800&q=80
```

**Dica:** Adicione `?w=800&q=80` no final para otimizar o tamanho.

### **Opção 2: Suas Próprias Fotos**

1. Faça upload em um serviço:
   - **Google Drive:** Compartilhe publicamente e use o link direto
   - **Imgur:** https://imgur.com/upload
   - **ImgBB:** https://imgbb.com
   - **Cloudinary:** https://cloudinary.com

2. Copie a URL direta da imagem
3. Cole na coluna `imagem_url`

### **Opção 3: Pexels (Gratuito)**

1. Acesse: https://pexels.com
2. Busque por: "dentist", "dental clinic", "healthcare"
3. Baixe a imagem
4. Faça upload em um serviço (opção 2)

---

## 📐 Especificações Recomendadas

### **Dimensões:**
- **Largura:** 800-1200px
- **Altura:** 600-900px
- **Proporção:** 4:3 ou 16:9

### **Formato:**
- **Recomendado:** JPG ou WebP
- **Evitar:** PNG pesado (> 500KB)

### **Tamanho do Arquivo:**
- **Ideal:** 100-300KB
- **Máximo:** 500KB

---

## 🔧 Código Atualizado

**Arquivo:** `src/sections/Hero.jsx` (linha 79)

**Antes:**
```jsx
<img
  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
  alt="Clínica Odontológica"
  ...
/>
```

**Depois:**
```jsx
<img
  src={hero.imagem_url || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"}
  alt={hero.imagem_alt || config.siteName}
  ...
/>
```

**Explicação:**
- `hero.imagem_url` → Lê da planilha (coluna `imagem_url`)
- `|| "https://..."` → Fallback se a coluna estiver vazia
- `hero.imagem_alt` → Texto alternativo para acessibilidade

---

## ✅ Exemplo Completo de Aba `home`

Copie e cole no Google Sheets:

```tsv
titulo	subtitulo	cta_texto	cta_link	imagem_url	imagem_alt
Odontologia moderna com atendimento humanizado para toda a família	Cuidamos do seu sorriso com tecnologia de ponta e profissionais especializados. Agende sua consulta e descubra como podemos transformar sua saúde bucal.	Agendar Consulta	#contato	https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80	Clínica Odontológica Sorrir Bem
```

---

## 🎯 Sugestões de Imagens para Odontologia

### **Unsplash:**
```
https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80
https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80
https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80
https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80
```

### **Pexels:**
```
https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?w=800
https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?w=800
```

---

## 🐛 Troubleshooting

### **Imagem não aparece:**
1. Verifique se a URL está correta (cole no navegador)
2. Confirme que a URL começa com `https://`
3. Certifique-se de que a imagem é pública
4. Limpe o cache: Ctrl + Shift + R

### **Imagem aparece distorcida:**
1. Use imagens com proporção 4:3 ou 16:9
2. Evite imagens muito pequenas (< 600px)
3. Evite imagens muito grandes (> 2000px)

### **Imagem carrega lento:**
1. Comprima a imagem: https://tinypng.com
2. Use formato WebP: https://cloudconvert.com/jpg-to-webp
3. Adicione `?w=800&q=80` na URL (Unsplash)

---

## 📱 Responsividade

A imagem se adapta automaticamente a todos os tamanhos de tela:
- **Desktop:** Largura total
- **Tablet:** Largura total
- **Mobile:** Largura total (empilha abaixo do texto)

---

## 🎉 Pronto!

Agora você pode mudar a imagem da home **sem mexer no código**, diretamente pela planilha Google Sheets!

**Lembre-se:**
- Adicione as colunas `imagem_url` e `imagem_alt` na aba `home`
- Use URLs públicas e otimizadas
- Aguarde até 5 minutos para o cache atualizar
