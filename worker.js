/**
 * TRAVELIFE 2026 — Proxy de IA (Cloudflare Worker)
 * --------------------------------------------------
 * Esconde tu API key de Google Gemini para que NUNCA quede
 * expuesta en el frontend (GitHub Pages es público).
 *
 * El frontend envía:  POST { system, messages:[{role:"user"|"model", text}] }
 * El worker responde:  { text: "..." }
 *
 * Configura tu llave como SECRET (no la pegues aquí):
 *   wrangler secret put GEMINI_API_KEY
 * o en el panel de Cloudflare: Settings → Variables → Add secret.
 *
 * Ver SETUP-IA.md para el paso a paso completo.
 */

const MODEL = "gemini-2.0-flash"; // gratis en la capa free de Google AI Studio

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (request.method !== "POST") {
      return json({ error: "Usa POST" }, 405);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: "Falta GEMINI_API_KEY en el worker" }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "JSON inválido" }, 400);
    }

    const system = String(body.system || "");
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const contents = messages
      .filter((m) => m && m.text)
      .map((m) => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: String(m.text) }],
      }));

    if (contents.length === 0) {
      return json({ error: "No hay mensajes" }, 400);
    }

    const geminiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;

    const payload = {
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
    };
    if (system) {
      payload.system_instruction = { parts: [{ text: system }] };
    }

    try {
      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return json({ error: "Gemini error", detail: data }, 502);
      }
      const text =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
      return json({ text });
    } catch (err) {
      return json({ error: "Fallo al contactar Gemini", detail: String(err) }, 502);
    }
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
