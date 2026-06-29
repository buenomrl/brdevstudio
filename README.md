# BRDev Studio — Site Portfólio

Site de portfólio e divulgação de serviços de Murillo Bueno.

**Ao vivo:** https://brdesenvolvimentos.vercel.app

---

## Serviços

- Lojas NuvemShop (setup completo + pagamentos + treinamento)
- Sites e Landing Pages (HTML/CSS/JS, React, Next.js)
- Identidade Visual / Logo
- Banners e artes para redes sociais
- Edição de vídeos (DaVinci Resolve)
- Imagens com IA (Claude, OpenAI) + Photoshop

---

## Stack

- Vanilla HTML + CSS + JavaScript (sem framework, sem build tool)
- Deploy via Vercel CLI
- Vídeos hospedados no YouTube com lazy loading (facade pattern)
- i18n PT/EN por classes CSS (`.pt-only` / `.en-only`)
- Dark mode via `body.dark` + CSS custom properties
- Preferências salvas em `localStorage`

---

## Estrutura

```
index.html    — página única
style.css     — estilos e dark mode
script.js     — dark mode, idioma, animações, filtro de portfólio, form → WhatsApp
img/          — todos os assets (logos, ícones, fotos, favicon)
```

---

## Deploy

```powershell
git add .
git commit -m "mensagem"
git push
vercel --prod
```

---

## Contato

- WhatsApp: +55 19 99359-8381
- Email: murillobueno77@gmail.com
