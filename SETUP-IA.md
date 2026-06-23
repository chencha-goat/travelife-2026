# 🤖 Activar la IA real (Google Gemini) — gratis

Tu app es **estática** (GitHub Pages), así que **no se puede** poner la API key
directamente en el código: sería pública y te la podrían robar. La solución
gratuita es un **proxy** (un mini-servidor en Cloudflare Workers, capa gratis)
que esconde la llave.

El mapa y el clima **ya funcionan sin nada de esto**. Esta guía es solo para el
asistente **Travel AI**.

---

## Paso 1 — Consigue una API key de Gemini (gratis)

1. Entra a **https://aistudio.google.com/app/apikey** con tu cuenta de Google.
2. Haz clic en **"Create API key"**.
3. Copia la llave (algo como `AIza...`). **No la compartas ni la subas a GitHub.**

> Gemini tiene una capa gratuita generosa. Para una app personal/demo es de sobra.

---

## Paso 2 — Crea el proxy en Cloudflare Workers (gratis)

### Opción A — Desde el panel web (sin instalar nada)

1. Crea una cuenta gratis en **https://dash.cloudflare.com**.
2. Ve a **Workers & Pages → Create → Worker**, ponle nombre `travelife-ai` y **Deploy**.
3. Pulsa **Edit code**, borra todo y pega el contenido de [`worker.js`](worker.js). **Deploy**.
4. Ve a **Settings → Variables and Secrets → Add → Secret**:
   - Nombre: `GEMINI_API_KEY`
   - Valor: tu llave del Paso 1
   - **Encrypt / Save** y vuelve a **Deploy**.
5. Copia la URL del worker, por ejemplo:
   `https://travelife-ai.TU-USUARIO.workers.dev`

### Opción B — Con Wrangler (terminal)

```bash
npm install -g wrangler
wrangler login
wrangler deploy worker.js --name travelife-ai
wrangler secret put GEMINI_API_KEY   # pega tu llave cuando lo pida
```

---

## Paso 3 — Conecta el proxy a la app

Abre [`index.html`](index.html) y pega la URL de tu worker en la config:

```js
window.TRAVELIFE_CONFIG = {
  AI_PROXY_URL: "https://travelife-ai.TU-USUARIO.workers.dev"
};
```

Guarda, haz `git commit` y `git push`. ¡Listo! El Travel AI ahora responde con
IA real. Si dejas `AI_PROXY_URL` vacío, el asistente usa respuestas locales de
respaldo (no se rompe nada).

---

## ¿Cuánto cuesta? 💸

- **Cloudflare Workers**: gratis (100,000 peticiones/día en la capa free).
- **Gemini API**: gratis dentro de la capa free de Google AI Studio.
- **Mapa (OpenStreetMap) y rutas (OSRM)**: gratis, sin llave.
- **Clima (Open-Meteo)**: gratis, sin llave.

**Total: $0** para uso personal/demo. 🎉

---

## Seguridad

- La API key vive **solo** en el worker (como secret cifrado), nunca en el navegador.
- El worker solo reenvía mensajes a Gemini y devuelve el texto.
- Si quieres restringir quién usa tu worker, en `worker.js` cambia
  `Access-Control-Allow-Origin: "*"` por tu dominio exacto
  (`https://chencha-goat.github.io`).
