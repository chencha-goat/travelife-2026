const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const mock = {
  dashboardStats: [
    { icon: "route", tone: "blue", value: "8", label: "días de viaje", trend: "Guadalajara → CDMX" },
    { icon: "ticket", tone: "cyan", value: "1", label: "partido confirmado", trend: "2 boletos" },
    { icon: "shield-check", tone: "green", value: "Verde", label: "riesgo actual", trend: "estable" }
  ],
  agenda: [
    { time: "10:30", title: "Check-in hotel Reforma", meta: "Recepcion prioritaria" },
    { time: "14:00", title: "Comida cerca de Condesa", meta: "Reserva para 2 personas" },
    { time: "17:10", title: "Salida sugerida al estadio", meta: "Ruta con buffer de trafico" }
  ],
  itinerary: [
    {
      day: "Dia 1",
      date: "20 Jun",
      city: "Guadalajara → CDMX",
      status: "Confirmado",
      items: [
        { icon: "plane", title: "Vuelo GDL → CDMX", meta: "Salida 09:30 · llegada AICM T2" },
        { icon: "hotel", title: "Check-in Hotel Reforma", meta: "7 noches · desayuno incluido" },
        { icon: "utensils", title: "Cena en Polanco", meta: "Reserva 20:30" }
      ]
    },
    {
      day: "Dia 6",
      date: "25 Jun",
      city: "Partido en CDMX",
      status: "Alta prioridad",
      items: [
        { icon: "cloud-sun", title: "Revision de clima", meta: "Llevar capa ligera" },
        { icon: "ticket", title: "Mexico vs República Checa", meta: "Estadio Azteca · 19:00 · puerta 4" },
        { icon: "car", title: "Regreso al hotel", meta: "Punto de reunion norte" }
      ]
    },
    {
      day: "Dia 8",
      date: "27 Jun",
      city: "CDMX → Guadalajara",
      status: "Pendiente check-in",
      items: [
        { icon: "plane-takeoff", title: "Vuelo CDMX → GDL", meta: "Salida 18:00 · equipaje incluido" },
        { icon: "car", title: "Traslado al aeropuerto", meta: "Pickup hotel 15:30" }
      ]
    }
  ],
  checklist: [
    { label: "Pasaporte vigente", done: true },
    { label: "Boletos descargados offline", done: true },
    { label: "Seguro medico internacional", done: true },
    { label: "eSIM activada", done: false },
    { label: "Tarjeta backup agregada", done: true },
    { label: "Reservas sincronizadas", done: true },
    { label: "Contacto de emergencia", done: true },
    { label: "Plan de lluvia guardado", done: false }
  ],
  alerts: [
    { level: "orange", icon: "traffic-cone", title: "Alta afluencia", meta: "Zona estadio desde 16:00. Sal 40 min antes." },
    { level: "blue", icon: "badge-alert", title: "Documentos", meta: "Guarda copia offline de pasaporte y seguro." }
  ],
  contacts: [
    { icon: "phone", name: "Emergencias Mexico", value: "911" },
    { icon: "building-2", name: "Embajada / consulado", value: "+52 55 0000 2026" },
    { icon: "heart-pulse", name: "Seguro medico", value: "TRV-26-4450" }
  ],
  weather: {
    cdmx: {
      city: "Ciudad de Mexico",
      temp: 23,
      condition: "Nubes ligeras",
      rain: "42%",
      wind: "12 km/h",
      uv: "Alto",
      advice: "Lleva chamarra ligera, bloqueador y una capa compacta. La mejor ventana para salir al estadio es antes de las 17:15.",
      forecast: [
        ["Hoy", "23°", "Nubes", "42%"],
        ["Jue", "25°", "Soleado", "18%"],
        ["Vie", "22°", "Lluvia", "64%"],
        ["Sab", "24°", "Parcial", "30%"],
        ["Dom", "26°", "Soleado", "12%"]
      ]
    },
    la: {
      city: "Los Angeles",
      temp: 27,
      condition: "Soleado",
      rain: "8%",
      wind: "10 km/h",
      uv: "Muy alto",
      advice: "Prioriza hidratacion y sombra. Para fan zones al aire libre, usa lentes, gorra y bloqueador cada 2 horas.",
      forecast: [
        ["Hoy", "27°", "Soleado", "8%"],
        ["Jue", "28°", "Soleado", "5%"],
        ["Vie", "29°", "Soleado", "4%"],
        ["Sab", "27°", "Parcial", "11%"],
        ["Dom", "26°", "Brisa", "14%"]
      ]
    },
    miami: {
      city: "Miami",
      temp: 30,
      condition: "Humedo",
      rain: "58%",
      wind: "18 km/h",
      uv: "Alto",
      advice: "Planea traslados con margen por lluvia tropical. Ropa ligera, impermeable compacto y botella de agua.",
      forecast: [
        ["Hoy", "30°", "Humedo", "58%"],
        ["Jue", "31°", "Tormenta", "70%"],
        ["Vie", "30°", "Parcial", "38%"],
        ["Sab", "32°", "Soleado", "22%"],
        ["Dom", "31°", "Lluvia", "54%"]
      ]
    },
    ny: {
      city: "New York",
      temp: 24,
      condition: "Parcial",
      rain: "24%",
      wind: "14 km/h",
      uv: "Medio",
      advice: "Clima comodo para caminar. Lleva capa ligera para la noche y revisa tiempos del metro antes de salir.",
      forecast: [
        ["Hoy", "24°", "Parcial", "24%"],
        ["Jue", "25°", "Soleado", "15%"],
        ["Vie", "23°", "Nubes", "28%"],
        ["Sab", "22°", "Lluvia", "52%"],
        ["Dom", "25°", "Soleado", "10%"]
      ]
    }
  },
  matches: [
    { group: "Grupo A", a: "Mexico", b: "República Checa", date: "25 Jun", city: "CDMX", saved: true },
    { group: "Grupo B", a: "USA", b: "Canada", date: "17 Jun", city: "Los Angeles", saved: true },
    { group: "Grupo C", a: "Brazil", b: "Japan", date: "21 Jun", city: "Miami", saved: false },
    { group: "Octavos", a: "TBD", b: "TBD", date: "29 Jun", city: "New York", saved: false }
  ],
  poi: [
    { icon: "hotel", name: "Hotel Reforma", addr: "Paseo de la Reforma", tag: "12 min al metro" },
    { icon: "ticket", name: "Estadio Azteca", addr: "Calz. de Tlalpan", tag: "Evento guardado" },
    { icon: "utensils", name: "Mercado Gourmet", addr: "Roma Norte", tag: "Reserva sugerida" },
    { icon: "shield-check", name: "Punto seguro", addr: "Fan Zone Norte", tag: "24h" }
  ],
  expenses: [
    { icon: "hotel", name: "Hotel", amount: 1260, color: "#1D4ED8", pct: 74 },
    { icon: "plane", name: "Vuelos", amount: 880, color: "#06B6D4", pct: 82 },
    { icon: "utensils", name: "Comida", amount: 340, color: "#22C55E", pct: 44 },
    { icon: "ticket", name: "Tickets", amount: 360, color: "#F59E0B", pct: 60 }
  ],
  transactions: [
    { icon: "hotel", name: "Hotel Reforma", meta: "Alojamiento · CDMX", amount: -620 },
    { icon: "utensils", name: "Cena Polanco", meta: "Comida · Reserva", amount: -86 },
    { icon: "ticket", name: "Upgrade asiento", meta: "Partido · VIP", amount: -140 },
    { icon: "circle-dollar-sign", name: "Reembolso transfer", meta: "Transporte", amount: 35 }
  ],
  recommendations: {
    food: [
      { icon: "utensils", name: "Contramar Express", addr: "Roma Norte", tag: "Seafood", price: "$$$" },
      { icon: "salad", name: "Verde Match", addr: "Condesa", tag: "Ligero", price: "$$" },
      { icon: "pizza", name: "Forza Pizza", addr: "Coyoacan", tag: "Post partido", price: "$$" }
    ],
    coffee: [
      { icon: "coffee", name: "Cafe Avellaneda", addr: "Coyoacan", tag: "Especialidad", price: "$$" },
      { icon: "cup-soda", name: "Morning Lab", addr: "Reforma", tag: "Trabajo", price: "$$" },
      { icon: "croissant", name: "Pan y Ruta", addr: "Roma", tag: "Desayuno", price: "$" }
    ],
    transport: [
      { icon: "train", name: "Metro + caminata", addr: "Ruta al estadio", tag: "Rapido", price: "$" },
      { icon: "car", name: "Transfer privado", addr: "Hotel pickup", tag: "Comodo", price: "$$$" },
      { icon: "bus", name: "Shuttle Fan Zone", addr: "Norte", tag: "Seguro", price: "$$" }
    ]
  },
  aiPrompts: [
    "Organiza mi dia de partido",
    "Que llevo si llueve?",
    "Como llego seguro al estadio?",
    "Donde puedo ahorrar hoy?"
  ]
};

/* ============================================================
   TRIP — FUENTE DE LA VERDAD del viaje (definida a mano).
   Todo (dashboard, presupuesto, contexto de la IA) sale de aquí.
   Cambia estos valores y la app + la IA se actualizan juntas.
   ============================================================ */
const TRIP = {
  traveler: "Rodrigo Ascencio",
  homeCity: "Guadalajara",
  dates: "20–27 de junio de 2026",
  days: 8,
  hostCityKey: "cdmx",
  hostCity: "Ciudad de México",
  hotel: "Zona Paseo de la Reforma, CDMX",
  match: {
    home: "México", away: "República Checa", group: "Grupo A",
    homeCode: "MX", awayCode: "CZ",
    date: "25 de junio de 2026", time: "19:00",
    datetimeISO: "2026-06-25T19:00:00-06:00",
    city: "Ciudad de México", venue: "Estadio Azteca", tickets: 2
  },
  budget: {
    total: 4200, used: 2840, currency: "USD",
    categories: [
      { name: "Hotel", amount: 1260 },
      { name: "Vuelos", amount: 880 },
      { name: "Comida", amount: 340 },
      { name: "Tickets", amount: 360 }
    ]
  }
};

/* Contexto en vivo que se inyecta a la IA (clima real actualizado). */
const tlLiveContext = { weather: null };

/* ============================================================
   IDIOMA + MONEDA + PRESUPUESTO (interactivos)
   ============================================================ */
let tlLang = "es";
let tlCurrency = "USD";
let tlRate = 18.0; // MXN por USD; se actualiza con tipo de cambio real

/* --- Moneda --- */
function formatMoney(usd) {
  const n = Number(usd) || 0;
  if (tlCurrency === "MXN") {
    return "$" + Math.round(n * tlRate).toLocaleString("es-MX") + " MXN";
  }
  return "$" + Math.round(n).toLocaleString("en-US");
}

async function loadExchangeRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    if (data && data.rates && data.rates.MXN) tlRate = data.rates.MXN;
  } catch (e) { /* deja el tipo de cambio por defecto */ }
}

/* --- Presupuesto: el "usado" = suma de categorías --- */
function budgetUsedUSD() {
  return mock.expenses.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
}

function updateBudgetUI() {
  const total = TRIP.budget.total;
  const used = budgetUsedUSD();
  const remaining = Math.max(0, total - used);
  const pct = Math.min(100, Math.round((used / total) * 100));

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const width = (id, p) => { const el = document.getElementById(id); if (el) el.style.width = p + "%"; };

  // Tarjeta de presupuesto del dashboard
  set("budgetUsed", formatMoney(used));
  set("budgetTotal", formatMoney(total));
  set("budgetPct", pct + "%");
  width("budgetFill", pct);

  // Hero de Gastos
  set("expTotalAmt", formatMoney(used));
  set("expTotalBudget", `${tr("de")} ${formatMoney(total)} ${tr("presupuestados")}`);
  set("expBarPct", `${tr("Te quedan")} ${formatMoney(remaining)} ${tr("disponibles")}`);
  width("expBarFill", pct);
}

function updatePremiumPrice() {
  const el = document.getElementById("premiumPrice");
  if (el) el.textContent = formatMoney(Number(el.dataset.usd) || 0);
}

function setCurrency(cur) {
  tlCurrency = cur === "MXN" ? "MXN" : "USD";
  renderExpenses();      // re-formatea categorías y transacciones
  updateBudgetUI();
  updatePremiumPrice();
}

/* --- Idioma (traducción de la interfaz visible) --- */
const DICT_EN = {
  // Navegación
  "Landing": "Landing", "Inicio": "Home", "Travel AI": "Travel AI", "Mi Viaje": "My Trip",
  "Partidos": "Matches", "Mapa": "Map", "Gastos": "Expenses", "Safety Center": "Safety Center",
  "Weather Center": "Weather Center", "Recomendaciones": "Recommendations", "Premium": "Premium",
  "Perfil": "Profile", "Configuracion": "Settings", "Configuración": "Settings",
  "Viaje": "Trip", "Centros": "Centers", "Cuenta": "Account",
  "Home": "Home", "Safety": "Safety", "Clima": "Weather", "AI": "AI",
  // Topbar (data-title)
  "Landing Premium": "Premium Landing", "Travel AI Assistant": "Travel AI Assistant",
  // Botones
  "Ver Mi Viaje": "View My Trip", "Planear con AI": "Plan with AI", "Abrir asistente": "Open assistant",
  "Revisar itinerario": "Review itinerary", "Agregar evento": "Add event", "Emergencia": "Emergency",
  "Subir": "Upload", "Activar Premium": "Activate Premium", "Editar": "Edit", "Limpiar": "Clear",
  "Gasto": "Expense", "Agregar al itinerario": "Add to itinerary", "Registrar gasto": "Save expense",
  "Guardar documento": "Save document", "Cancelar": "Cancel", "Guardar": "Save",
  // Títulos y subtítulos
  "Todo lo importante, antes de que lo necesites.": "Everything that matters, before you need it.",
  "Pregunta antes de moverte.": "Ask before you move.",
  "Travel AI Assistant": "Travel AI Assistant",
  "Resumen ejecutivo de tu viaje de Guadalajara a Ciudad de México.": "Executive summary of your trip from Guadalajara to Mexico City.",
  "Agenda de hoy": "Today's agenda", "Presupuesto del viaje": "Trip budget", "En rango": "On track",
  "Contexto activo": "Active context", "Acciones inteligentes": "Smart actions",
  "Optimizar mi dia": "Optimize my day", "Plan B por lluvia": "Rain plan B", "Revisar presupuesto": "Review budget",
  "Itinerario con reservas, traslados, partidos y tareas clave.": "Itinerary with bookings, transfers, matches and key tasks.",
  "Checklist": "Checklist", "Reservas": "Reservations",
  "Recomendacion AI": "AI recommendation", "Forecast 5 dias": "5-day forecast",
  "Mapa real con rutas al estadio, hoteles y fan zones de las sedes del Mundial 2026.":
    "Real map with routes to the stadium, hotels and fan zones of the 2026 World Cup host cities.",
  "Clima real (Open-Meteo) por ciudad sede, recomendaciones de outfit y alertas de partido.":
    "Real weather (Open-Meteo) by host city, outfit tips and match alerts.",
  "Asistente con IA real (Google Gemini) para responder sobre agenda, rutas, clima, presupuesto y seguridad.":
    "Real AI assistant (Google Gemini) for your agenda, routes, weather, budget and safety.",
  // Gastos
  "Total gastado": "Total spent", "Usado": "Used", "Total": "Total", "utilizado": "used",
  "Te quedan": "You have", "disponibles": "available", "de": "of", "presupuestados": "budgeted",
  "Transacciones recientes": "Recent transactions",
  // Configuración
  "Notificaciones": "Notifications", "Alertas de viaje": "Trip alerts",
  "Clima, seguridad y cambios de agenda": "Weather, safety and schedule changes",
  "Recordatorios de partido": "Match reminders", "Avisos antes de salir al estadio": "Reminders before heading to the stadium",
  "Preferencias": "Preferences", "Idioma": "Language", "Interfaz principal": "Main interface",
  "Moneda": "Currency", "Presupuesto y gastos": "Budget and expenses",
  // Otros
  "Alertas activas": "Active alerts", "Contactos rapidos": "Quick contacts",
  "Documentos y cobertura": "Documents and coverage", "Datos": "Details", "Plan": "Plan",
  "Ciudad base": "Home city", "Activar Premium": "Activate Premium"
};

function tr(text) {
  const s = (text || "").trim();
  if (tlLang !== "en") return text;
  return DICT_EN[s] || text;
}

function applyLanguage(lang) {
  tlLang = lang === "en" ? "en" : "es";
  document.documentElement.lang = tlLang;
  const selector = [
    ".nav-label", ".nav-section-label", ".bn-label",
    ".page-title", ".page-sub", ".section-title", ".section-kicker",
    ".small-title", ".btn", ".budget-title", ".match-hero-label",
    ".card-head h3", ".ai-mini-panel h3", ".ai-mini-panel p", ".smart-action span",
    ".settings-section-title", ".settings-row-label", ".settings-row-sub",
    "[data-i18n]", ".profile-section-title", ".txn-header h3"
  ].join(",");

  $$(selector).forEach(el => {
    el.childNodes.forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (node.__esText === undefined) node.__esText = trimmed; // guarda original ES
      const translated = tlLang === "en" ? (DICT_EN[node.__esText] || node.__esText) : node.__esText;
      node.nodeValue = raw.replace(trimmed, translated);
    });
  });

  // Título del topbar (se setea por JS al navegar)
  const active = $(".screen.active");
  if (active) $("#topbarTitle").textContent = tr(active.dataset.title || "TRAVELIFE");
  updateBudgetUI(); // re-traduce las etiquetas de dinero
}

function setLanguage(lang) {
  applyLanguage(lang);
  notifyLangCurrency();
}
function notifyLangCurrency() { /* placeholder, evita errores si se llama temprano */ }

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 2 } });
  }
}

function navigate(screenId, updateHash = true) {
  const screen = $(`#screen-${screenId}`);
  if (!screen) return;

  $$(".screen").forEach(item => item.classList.toggle("active", item === screen));
  $$("[data-screen-target]").forEach(item => {
    item.classList.toggle("active", item.dataset.screenTarget === screenId);
  });

  $("#topbarTitle").textContent = tr(screen.dataset.title || "TRAVELIFE");
  $("#sidebar").classList.remove("mobile-open");
  $("#sidebarOverlay").classList.remove("open");

  if (updateHash && window.location.hash !== `#${screenId}`) {
    history.pushState(null, "", `#${screenId}`);
  }

  // Inicialización perezosa / refresco al entrar a cada sección
  if (screenId === "map") renderMap();
  if (screenId === "weather") renderWeather($("#weatherCitySelect")?.value || "cdmx");
}

function bindNavigation() {
  document.addEventListener("click", event => {
    const target = event.target.closest("[data-screen-target]");
    if (!target) return;
    event.preventDefault();
    navigate(target.dataset.screenTarget);
  });

  $("#menuBtn").addEventListener("click", () => {
    $("#sidebar").classList.add("mobile-open");
    $("#sidebarOverlay").classList.add("open");
  });

  $("#sidebarOverlay").addEventListener("click", () => {
    $("#sidebar").classList.remove("mobile-open");
    $("#sidebarOverlay").classList.remove("open");
  });

  $(".topbar-user").addEventListener("click", () => navigate("profile"));

  window.addEventListener("popstate", () => {
    const id = window.location.hash.replace("#", "") || "landing";
    navigate(id, false);
  });
}

function renderDashboard() {
  $("#dashboardStats").innerHTML = mock.dashboardStats.map(stat => `
    <article class="stat-card">
      <div class="stat-card-header">
        <span class="stat-card-icon ${stat.tone}"><i data-lucide="${stat.icon}"></i></span>
        <span class="stat-card-trend">${stat.trend}</span>
      </div>
      <div class="stat-card-val">${stat.value}</div>
      <div class="stat-card-lbl">${stat.label}</div>
    </article>
  `).join("");

  $("#todayAgenda").innerHTML = mock.agenda.map(item => `
    <div class="agenda-item">
      <div class="agenda-time">${item.time}</div>
      <div>
        <strong>${item.title}</strong>
        <span>${item.meta}</span>
      </div>
    </div>
  `).join("");
}

function renderTrip() {
  $("#tripTimeline").innerHTML = mock.itinerary.map(stop => `
    <div class="timeline-day">
      <div class="timeline-date">
        <span>${stop.day}</span>
        <strong>${stop.date}</strong>
      </div>
      <div class="timeline-body">
        <div class="timeline-day-head">
          <div>
            <h3>${stop.city}</h3>
            <p>${stop.items.length} eventos sincronizados</p>
          </div>
          <span class="badge ${stop.status === "Alta prioridad" ? "badge-orange" : "badge-blue"}">${stop.status}</span>
        </div>
        ${stop.items.map(item => `
          <div class="timeline-event">
            <span class="timeline-icon"><i data-lucide="${item.icon}"></i></span>
            <div>
              <strong>${item.title}</strong>
              <span>${item.meta}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  $("#tripChecklist").innerHTML = mock.checklist.map((item, index) => `
    <button class="check-item ${item.done ? "done" : ""}" type="button" data-check-index="${index}">
      <span><i data-lucide="${item.done ? "check" : "circle"}"></i></span>
      ${item.label}
    </button>
  `).join("");
}

function renderSafety() {
  $("#safetyAlerts").innerHTML = mock.alerts.map(alert => `
    <div class="alert-row ${alert.level}">
      <span><i data-lucide="${alert.icon}"></i></span>
      <div>
        <strong>${alert.title}</strong>
        <p>${alert.meta}</p>
      </div>
    </div>
  `).join("");

  $("#emergencyContacts").innerHTML = mock.contacts.map(contact => `
    <a class="contact-row" href="tel:${contact.value.replaceAll(" ", "")}">
      <span><i data-lucide="${contact.icon}"></i></span>
      <div>
        <strong>${contact.name}</strong>
        <p>${contact.value}</p>
      </div>
      <i data-lucide="chevron-right"></i>
    </a>
  `).join("");
}

/* Códigos meteorológicos WMO -> texto en español + icono Lucide */
function wmoToInfo(code) {
  const map = {
    0: ["Despejado", "sun"], 1: ["Mayormente despejado", "sun"], 2: ["Parcialmente nublado", "cloud-sun"],
    3: ["Nublado", "cloud"], 45: ["Niebla", "cloud-fog"], 48: ["Niebla con escarcha", "cloud-fog"],
    51: ["Llovizna ligera", "cloud-drizzle"], 53: ["Llovizna", "cloud-drizzle"], 55: ["Llovizna intensa", "cloud-drizzle"],
    61: ["Lluvia ligera", "cloud-rain"], 63: ["Lluvia", "cloud-rain"], 65: ["Lluvia fuerte", "cloud-rain-wind"],
    71: ["Nieve ligera", "cloud-snow"], 73: ["Nieve", "cloud-snow"], 75: ["Nieve fuerte", "cloud-snow"],
    80: ["Chubascos", "cloud-rain"], 81: ["Chubascos", "cloud-rain"], 82: ["Chubascos fuertes", "cloud-rain-wind"],
    95: ["Tormenta", "cloud-lightning"], 96: ["Tormenta con granizo", "cloud-lightning"], 99: ["Tormenta fuerte", "cloud-lightning"]
  };
  return map[code] || ["Variable", "cloud-sun"];
}

function weatherAdvice(temp, rainProb, condition) {
  const parts = [];
  if (rainProb >= 60) parts.push("alta probabilidad de lluvia: lleva impermeable compacto y sal con 25 min extra");
  else if (rainProb >= 30) parts.push("posible lluvia: una capa ligera no estorba");
  else parts.push("baja probabilidad de lluvia");
  if (temp >= 30) parts.push("calor: hidrátate, gorra y bloqueador");
  else if (temp <= 12) parts.push("frío: lleva chamarra abrigadora");
  else parts.push("temperatura agradable para caminar");
  return `Hoy: ${condition.toLowerCase()}. ${parts.join("; ")}.`;
}

async function renderWeather(cityId = "cdmx") {
  const city = HOST_CITIES[cityId] || HOST_CITIES.cdmx;
  const main = $("#weatherMain");
  if (main) main.innerHTML = `<div class="weather-current"><div><span class="badge badge-cyan">${city.name}</span><h2>…</h2><p>Cargando clima real…</p></div><div class="weather-icon"><i data-lucide="loader"></i></div></div>`;
  renderIcons();

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.weather.lat}&longitude=${city.weather.lon}`
    + `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,uv_index`
    + `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`
    + `&timezone=auto&forecast_days=5`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const cur = data.current;
    const [condition, icon] = wmoToInfo(cur.weather_code);
    const rainProb = data.daily.precipitation_probability_max[0] ?? 0;
    const uv = cur.uv_index;
    const uvLabel = uv == null ? "—" : uv >= 8 ? "Muy alto" : uv >= 6 ? "Alto" : uv >= 3 ? "Medio" : "Bajo";

    $("#weatherMain").innerHTML = `
      <div class="weather-current">
        <div>
          <span class="badge badge-cyan">${city.name}</span>
          <h2>${Math.round(cur.temperature_2m)}°</h2>
          <p>${condition}</p>
        </div>
        <div class="weather-icon"><i data-lucide="${icon}"></i></div>
      </div>
      <div class="weather-metrics">
        <div><i data-lucide="cloud-rain"></i><span>Lluvia</span><strong>${rainProb}%</strong></div>
        <div><i data-lucide="wind"></i><span>Viento</span><strong>${Math.round(cur.wind_speed_10m)} km/h</strong></div>
        <div><i data-lucide="sun"></i><span>UV</span><strong>${uvLabel}</strong></div>
      </div>
    `;
    $("#weatherAdvice").textContent = weatherAdvice(cur.temperature_2m, rainProb, condition);

    const days = data.daily.time.map((iso, i) => {
      const d = new Date(iso + "T12:00:00");
      const dayName = i === 0 ? "Hoy" : d.toLocaleDateString("es-MX", { weekday: "short" }).replace(".", "");
      const [cond] = wmoToInfo(data.daily.weather_code[i]);
      return `<div class="forecast-row">
        <strong>${dayName}</strong>
        <span>${cond}</span>
        <b>${Math.round(data.daily.temperature_2m_max[i])}°</b>
        <em>${data.daily.precipitation_probability_max[i] ?? 0}%</em>
      </div>`;
    }).join("");
    $("#forecastList").innerHTML = days;
    renderIcons();

    // Guarda el clima de la ciudad sede para alimentar a la IA y el panel de contexto
    if (cityId === TRIP.hostCityKey) {
      tlLiveContext.weather = { city: city.name, temp: Math.round(cur.temperature_2m), condition, rain: rainProb + "%" };
      const ctxRain = document.getElementById("ctxRain");
      if (ctxRain) ctxRain.textContent = rainProb + "%";
      const ctxTemp = document.getElementById("ctxTemp");
      if (ctxTemp) ctxTemp.textContent = Math.round(cur.temperature_2m) + "°";
    }
  } catch (e) {
    $("#weatherMain").innerHTML = `<div class="weather-current"><div><span class="badge badge-orange">${city.name}</span><h2>—</h2><p>No se pudo cargar el clima real. Revisa tu conexión.</p></div><div class="weather-icon"><i data-lucide="cloud-off"></i></div></div>`;
    renderIcons();
  }
}

function renderMatches() {
  $("#matchesGrid").innerHTML = mock.matches.map((match, index) => `
    <article class="match-card ${match.saved ? "saved" : ""}">
      <div class="match-card-top">
        <span class="match-card-group">${match.group}</span>
        <button class="match-card-save ${match.saved ? "saved" : ""}" type="button" data-match-index="${index}" aria-label="Guardar partido">
          <i data-lucide="star"></i>
        </button>
      </div>
      <div class="match-card-teams">
        <div class="mini-team"><strong>${match.a}</strong></div>
        <span class="badge badge-blue">VS</span>
        <div class="mini-team"><strong>${match.b}</strong></div>
      </div>
      <div class="match-card-info">
        <span><i data-lucide="calendar"></i>${match.date}</span>
        <span><i data-lucide="map-pin"></i>${match.city}</span>
      </div>
    </article>
  `).join("");
}

/* ============================================================
   DATOS REALES — Sedes del Mundial FIFA 2026 (coordenadas reales)
   Estadios oficiales, hoteles de referencia y fan zones.
   ============================================================ */
const HOST_CITIES = {
  cdmx: {
    name: "Ciudad de México", center: [19.36, -99.16], zoom: 11,
    weather: { lat: 19.4326, lon: -99.1332 },
    places: [
      { type: "stadium", icon: "ticket", name: "Estadio Azteca", addr: "Calz. de Tlalpan 3465, Coyoacán", coord: [19.3029, -99.1505], tag: "Sede del partido" },
      { type: "hotel", icon: "hotel", name: "Zona Paseo de la Reforma", addr: "Hoteles · Cuauhtémoc", coord: [19.4270, -99.1677], tag: "Alojamiento" },
      { type: "fanzone", icon: "flag", name: "Fan Festival — Zócalo", addr: "Plaza de la Constitución", coord: [19.4326, -99.1332], tag: "Fan Zone" },
      { type: "safe", icon: "shield-check", name: "Hospital Ángeles Roma", addr: "Punto médico de referencia", coord: [19.4150, -99.1620], tag: "Apoyo 24h" }
    ]
  },
  la: {
    name: "Los Angeles", center: [33.99, -118.30], zoom: 11,
    weather: { lat: 33.9535, lon: -118.3392 },
    places: [
      { type: "stadium", icon: "ticket", name: "SoFi Stadium", addr: "1001 Stadium Dr, Inglewood", coord: [33.9535, -118.3392], tag: "Sede del partido" },
      { type: "hotel", icon: "hotel", name: "Downtown LA", addr: "Hoteles · centro", coord: [34.0494, -118.2548], tag: "Alojamiento" },
      { type: "fanzone", icon: "flag", name: "Fan Festival — L.A. LIVE", addr: "800 W Olympic Blvd", coord: [34.0430, -118.2673], tag: "Fan Zone" },
      { type: "safe", icon: "shield-check", name: "Centro de visitantes", addr: "Punto de apoyo", coord: [34.0410, -118.2670], tag: "Apoyo 24h" }
    ]
  },
  miami: {
    name: "Miami", center: [25.86, -80.20], zoom: 11,
    weather: { lat: 25.9580, lon: -80.2389 },
    places: [
      { type: "stadium", icon: "ticket", name: "Hard Rock Stadium", addr: "347 Don Shula Dr, Miami Gardens", coord: [25.9580, -80.2389], tag: "Sede del partido" },
      { type: "hotel", icon: "hotel", name: "South Beach", addr: "Hoteles · Miami Beach", coord: [25.7907, -80.1300], tag: "Alojamiento" },
      { type: "fanzone", icon: "flag", name: "Fan Festival — Bayfront Park", addr: "301 Biscayne Blvd", coord: [25.7753, -80.1860], tag: "Fan Zone" },
      { type: "safe", icon: "shield-check", name: "Jackson Memorial", addr: "Punto médico de referencia", coord: [25.7890, -80.2110], tag: "Apoyo 24h" }
    ]
  },
  ny: {
    name: "New York / NJ", center: [40.78, -74.02], zoom: 11,
    weather: { lat: 40.8135, lon: -74.0745 },
    places: [
      { type: "stadium", icon: "ticket", name: "MetLife Stadium", addr: "1 MetLife Stadium Dr, East Rutherford NJ", coord: [40.8135, -74.0745], tag: "Final · sede" },
      { type: "hotel", icon: "hotel", name: "Midtown Manhattan", addr: "Hoteles · Times Square", coord: [40.7549, -73.9840], tag: "Alojamiento" },
      { type: "fanzone", icon: "flag", name: "Fan Festival — Liberty State Park", addr: "Jersey City, NJ", coord: [40.7050, -74.0560], tag: "Fan Zone" },
      { type: "safe", icon: "shield-check", name: "Mount Sinai West", addr: "Punto médico de referencia", coord: [40.7700, -73.9870], tag: "Apoyo 24h" }
    ]
  }
};

let tlMap = null;
let tlLayers = null;
let tlCurrentCity = "cdmx";

function makeMarkerIcon(place) {
  return L.divIcon({
    className: "",
    html: `<div class="tl-marker ${place.type}"><i data-lucide="${place.icon}"></i></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
}

async function drawRealRoute(from, to, stadiumName) {
  const banner = $("#mapRouteInfo");
  const url = `https://router.project-osrm.org/route/v1/driving/${from.coord[1]},${from.coord[0]};${to.coord[1]},${to.coord[0]}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const route = data.routes && data.routes[0];
    if (!route) throw new Error("sin ruta");
    const line = route.geometry.coordinates.map(c => [c[1], c[0]]);
    const poly = L.polyline(line, { color: "#22D3EE", weight: 5, opacity: 0.9 }).addTo(tlLayers);
    L.polyline(line, { color: "#0A1628", weight: 9, opacity: 0.25 }).addTo(tlLayers).bringToBack();
    const km = (route.distance / 1000).toFixed(1);
    const min = Math.round(route.duration / 60);
    if (banner) banner.innerHTML = `<strong>${from.name} → ${stadiumName}</strong> · <b>${km} km</b> · ~<b>${min} min</b> en auto (ruta real OSRM)`;
    if (tlMap) tlMap.fitBounds(poly.getBounds().pad(0.25));
  } catch (e) {
    if (banner) banner.innerHTML = `<strong>${from.name} → ${stadiumName}</strong> · ruta directa (no se pudo calcular el trazado en este momento).`;
    L.polyline([from.coord, to.coord], { color: "#22D3EE", weight: 4, dashArray: "8 8", opacity: 0.8 }).addTo(tlLayers);
  }
}

function renderMap(cityId = tlCurrentCity) {
  const city = HOST_CITIES[cityId] || HOST_CITIES.cdmx;
  tlCurrentCity = cityId;
  const mapEl = $("#leafletMap");
  if (!mapEl || !window.L) return;

  if (!tlMap) {
    tlMap = L.map(mapEl, { zoomControl: true, attributionControl: true }).setView(city.center, city.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(tlMap);
    tlLayers = L.layerGroup().addTo(tlMap);
  } else {
    tlLayers.clearLayers();
    tlMap.setView(city.center, city.zoom);
  }

  const bounds = [];
  city.places.forEach(place => {
    const marker = L.marker(place.coord, { icon: makeMarkerIcon(place) }).addTo(tlLayers);
    marker.bindPopup(`<strong>${place.name}</strong><small>${place.addr}</small>`);
    bounds.push(place.coord);
  });
  if (bounds.length) tlMap.fitBounds(bounds, { padding: [40, 40] });

  // Ruta real hotel -> estadio
  const hotel = city.places.find(p => p.type === "hotel");
  const stadium = city.places.find(p => p.type === "stadium");
  if (hotel && stadium) drawRealRoute(hotel, stadium, stadium.name);

  // Sidebar de puntos de interés (datos reales)
  $("#poiList").innerHTML = city.places.map((point, i) => `
    <article class="poi-card" data-poi-index="${i}" style="cursor:pointer">
      <div class="poi-card-top">
        <span class="poi-icon stat-card-icon cyan"><i data-lucide="${point.icon}"></i></span>
        <div class="poi-info">
          <div class="poi-name">${point.name}</div>
          <div class="poi-addr">${point.addr}</div>
        </div>
      </div>
      <div class="poi-meta"><span class="badge badge-blue">${point.tag}</span></div>
    </article>
  `).join("");

  // Click en tarjeta -> centra el mapa y abre popup
  $$("#poiList .poi-card").forEach(card => {
    card.addEventListener("click", () => {
      const place = city.places[Number(card.dataset.poiIndex)];
      if (place && tlMap) { tlMap.setView(place.coord, 15); }
    });
  });

  renderIcons();
  // Leaflet necesita recalcular tamaño cuando la sección estaba oculta
  setTimeout(() => { if (tlMap) tlMap.invalidateSize(); }, 60);
}

function renderExpenses() {
  $("#expenseCats").innerHTML = mock.expenses.map(cat => `
    <article class="exp-cat-card">
      <div class="exp-cat-icon"><i data-lucide="${cat.icon}"></i></div>
      <div class="exp-cat-name">${cat.name}</div>
      <div class="exp-cat-amt">${formatMoney(cat.amount)}</div>
      <div class="exp-cat-bar"><div class="exp-cat-bar-fill" style="width:${cat.pct}%;background:${cat.color}"></div></div>
    </article>
  `).join("");

  $("#transactionsList").innerHTML = mock.transactions.map(txn => `
    <div class="txn-item">
      <span class="txn-icon stat-card-icon cyan"><i data-lucide="${txn.icon}"></i></span>
      <div class="txn-body">
        <div class="txn-name">${txn.name}</div>
        <div class="txn-meta">${txn.meta}</div>
      </div>
      <div class="txn-amt ${txn.amount > 0 ? "income" : ""}">${txn.amount > 0 ? "+" : "-"}${formatMoney(Math.abs(txn.amount))}</div>
    </div>
  `).join("");

  updateBudgetUI();
  renderIcons();
}

function renderRecommendations(type = "food") {
  $("#recommendationsGrid").innerHTML = mock.recommendations[type].map(item => `
    <article class="rec-card">
      <div class="rec-img">
        <i data-lucide="${item.icon}"></i>
        <span class="rec-img-badge badge badge-white">${item.tag}</span>
      </div>
      <div class="rec-body">
        <div class="rec-name">${item.name}</div>
        <div class="rec-addr"><i data-lucide="map-pin"></i>${item.addr}</div>
        <div class="rec-tags"><span class="badge badge-cyan">AI pick</span><span class="badge badge-green">Cerca</span></div>
      </div>
      <div class="rec-footer">
        <span class="rec-price">${item.price}</span>
        <button class="rec-save-btn" type="button" aria-label="Guardar"><i data-lucide="bookmark"></i></button>
      </div>
    </article>
  `).join("");
  renderIcons();
}

function resetChat() {
  $("#aiMessages").innerHTML = "";
  tlChatHistory.length = 0;
  addAiMessage("assistant", "¡Hola! Soy tu Travel AI. Conozco tu viaje: CDMX, México vs República Checa el 25 jun a las 19:00 en el Estadio Azteca, y tu presupuesto. Pregúntame sobre rutas, clima, seguridad o cómo organizar tu día.");
}

function addAiMessage(role, text) {
  const messages = $("#aiMessages");
  const row = document.createElement("div");
  row.className = `ai-message ${role}`;
  row.innerHTML = `
    <span class="ai-avatar"><i data-lucide="${role === "assistant" ? "bot" : "user-round"}"></i></span>
    <div class="ai-bubble">${text}</div>
  `;
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
  renderIcons();
}

function aiReply(question) {
  const q = question.toLowerCase();
  if (q.includes("lluv") || q.includes("llue") || q.includes("clima") || q.includes("impermeable")) {
    return "Plan recomendado: impermeable compacto, tenis con suela comoda y salida 25 minutos antes. Si la lluvia sube de 60%, cambia comida a una zona cubierta cerca de la ruta del estadio.";
  }
  if (q.includes("segur") || q.includes("estadio") || q.includes("ruta")) {
    return "Ruta segura sugerida: del hotel al metro Reforma, transbordo directo y caminata por el corredor principal. Evita calles laterales despues del partido y usa el punto de reunion norte.";
  }
  if (q.includes("presupuesto") || q.includes("ahorrar")) {
    return "Puedes ahorrar hoy usando shuttle compartido y comida casual antes del estadio. Mantendrias el gasto diario cerca de $115 y liberarias margen para Miami.";
  }
  if (q.includes("organiza") || q.includes("dia")) {
    return "Agenda sugerida: 10:30 check-in, 13:00 comida ligera, 15:30 descanso, 17:10 salida al estadio, 22:15 regreso por ruta norte. Deja 20 minutos extra por afluencia.";
  }
  return "Lo revisaria asi: prioriza seguridad, tiempo de traslado y clima. Con tu itinerario actual, deja buffers de 30-40 minutos y guarda documentos offline antes de salir.";
}

function bindInteractions() {
  $("#aiPrompts").innerHTML = mock.aiPrompts.map(prompt => `
    <button class="prompt-chip" type="button" data-ai-question="${prompt}">${prompt}</button>
  `).join("");

  document.addEventListener("click", event => {
    const questionBtn = event.target.closest("[data-ai-question]");
    if (questionBtn) {
      submitAiQuestion(questionBtn.dataset.aiQuestion);
    }

    const check = event.target.closest("[data-check-index]");
    if (check) {
      const index = Number(check.dataset.checkIndex);
      mock.checklist[index].done = !mock.checklist[index].done;
      renderTrip();
      renderIcons();
    }

    const matchSave = event.target.closest("[data-match-index]");
    if (matchSave) {
      const index = Number(matchSave.dataset.matchIndex);
      mock.matches[index].saved = !mock.matches[index].saved;
      renderMatches();
      renderIcons();
    }

    const recSave = event.target.closest(".rec-save-btn");
    if (recSave) {
      recSave.classList.toggle("saved");
    }

    const toggle = event.target.closest(".toggle");
    if (toggle) {
      toggle.classList.toggle("on");
    }
  });

  $("#aiForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#aiInput");
    submitAiQuestion(input.value.trim());
    input.value = "";
  });

  $("#clearChat").addEventListener("click", resetChat);

  $("#weatherCitySelect").addEventListener("change", event => renderWeather(event.target.value));

  $$(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".tab-btn").forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      renderRecommendations(tab.dataset.recTab);
    });
  });
}

/* ============================================================
   TRAVEL AI — Asistente con IA real (Google Gemini vía proxy)
   El proxy (Cloudflare Worker) esconde la API key. Si no hay
   proxy configurado, usa las respuestas locales (aiReply).
   ============================================================ */
const tlChatHistory = [];

function aiSystemPrompt() {
  const t = TRIP;
  const remaining = t.budget.total - t.budget.used;
  const desglose = t.budget.categories.map(c => `${c.name} $${c.amount}`).join(", ");
  const lines = [
    "Eres Travel AI, el asistente de TRAVELIFE 2026, una app de viajes para el Mundial FIFA 2026.",
    "Respondes en español, claro y breve (máx 5 frases), con tono cercano y práctico de agente de viajes.",
    "DATOS REALES DEL VIAJE (esta es tu única verdad; no inventes otros datos):",
    `- Viajero: ${t.traveler}, sale de ${t.homeCity}.`,
    `- Fechas: ${t.dates} (${t.days} días).`,
    `- Ciudad sede: ${t.hostCity}. Hospedaje: ${t.hotel}.`,
    `- Partido: ${t.match.home} vs ${t.match.away} (${t.match.group}), ${t.match.date} a las ${t.match.time}, ${t.match.venue}. Boletos: ${t.match.tickets}.`,
    `- Presupuesto: ${t.budget.total} ${t.budget.currency} en total, ${t.budget.used} usados, ${remaining} disponibles. Desglose: ${desglose}.`,
    "- La app tiene un Mapa con la ruta real hotel→estadio (OSRM) y un Weather Center con clima real (Open-Meteo)."
  ];
  if (tlLiveContext.weather) {
    const w = tlLiveContext.weather;
    lines.push(`- CLIMA REAL AHORA en ${w.city}: ${w.temp}°, ${w.condition}, probabilidad de lluvia ${w.rain}. Usa este clima real para recomendar ropa, horarios de salida y plan B.`);
  }
  lines.push("Si te falta un dato (p. ej. precios de boletos que no están aquí), dilo con honestidad en vez de inventarlo.");
  return lines.join("\n");
}

function addTypingBubble() {
  const messages = $("#aiMessages");
  const row = document.createElement("div");
  row.className = "ai-message assistant ai-typing";
  row.id = "aiTyping";
  row.innerHTML = `<span class="ai-avatar"><i data-lucide="bot"></i></span>
    <div class="ai-bubble"><span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span></div>`;
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
  renderIcons();
}
function removeTypingBubble() {
  const t = $("#aiTyping");
  if (t) t.remove();
}

async function callGeminiProxy(question) {
  const url = (window.TRAVELIFE_CONFIG && window.TRAVELIFE_CONFIG.AI_PROXY_URL || "").trim();
  if (!url) return null; // sin proxy -> usar respaldo local
  const res = await fetch(url.replace(/\/$/, ""), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: aiSystemPrompt(),
      messages: tlChatHistory.slice(-10)
    })
  });
  if (!res.ok) throw new Error("proxy " + res.status);
  const data = await res.json();
  return (data.text || "").trim();
}

async function submitAiQuestion(question) {
  if (!question) return;
  addAiMessage("user", question);
  tlChatHistory.push({ role: "user", text: question });

  addTypingBubble();
  try {
    let answer = await callGeminiProxy(question);
    if (!answer) answer = aiReply(question); // respaldo local si no hay proxy
    removeTypingBubble();
    addAiMessage("assistant", answer);
    tlChatHistory.push({ role: "model", text: answer });
  } catch (e) {
    removeTypingBubble();
    const fallback = aiReply(question);
    addAiMessage("assistant", fallback + "\n\n(IA en la nube no disponible ahora; respuesta local).");
    tlChatHistory.push({ role: "model", text: fallback });
  }
}

function updateCountdown() {
  const target = new Date(TRIP.match.datetimeISO).getTime();
  const now = Date.now();
  const distance = Math.max(0, target - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  const values = [
    ["dias", days],
    ["hrs", hours],
    ["min", minutes],
    ["seg", seconds]
  ];

  $("#countdown").innerHTML = values.map(([label, value]) => `
    <span class="cd-unit">
      <span class="cd-num">${String(value).padStart(2, "0")}</span>
      <span class="cd-lbl">${label}</span>
    </span>
  `).join('<span class="cd-sep">:</span>');
}

function tripMatchDateShort() {
  try {
    return new Date(TRIP.match.datetimeISO).toLocaleDateString("es-MX", { day: "numeric", month: "short" }).replace(".", "");
  } catch (e) { return TRIP.match.date; }
}

/* Vuelca la fuente de la verdad TRIP a TODO el contenido visible.
   Cambia TRIP y, al recargar, dashboard + partidos + itinerario + headers
   se actualizan juntos. */
function applyTripToContent() {
  const m = TRIP.match;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  // 1) Dashboard: tarjeta del partido
  set("mhGroup", m.group);
  set("mhCity", m.city);
  set("mhHomeFlag", m.homeCode);
  set("mhHomeName", m.home);
  set("mhAwayFlag", m.awayCode);
  set("mhAwayName", m.away);
  set("mhVenue", m.venue);
  set("mhTime", m.time);
  set("mhTickets", `${m.tickets} boletos`);

  // 2) Encabezado del viaje + portada
  set("tripDates", TRIP.dates);
  set("tripCities", `${TRIP.homeCity} y ${TRIP.hostCity}`);
  set("tripDesc", `Ruta ${TRIP.homeCity}–${TRIP.hostCity} con vuelo, hotel, el partido y ventanas de descanso.`);
  set("landingDays", TRIP.days);

  // 3) El partido guardado de la lista = el del TRIP
  mock.matches[0] = { group: m.group, a: m.home, b: m.away, date: tripMatchDateShort(), city: m.city, saved: true };

  // 4) Itinerario: el evento "partido" se llena desde TRIP
  const matchStop = mock.itinerary.find(s => s.items.some(i => i.icon === "ticket"));
  if (matchStop) {
    const matchItem = matchStop.items.find(i => i.icon === "ticket");
    if (matchItem) {
      matchItem.title = `${m.home} vs ${m.away}`;
      matchItem.meta = `${m.venue} · ${m.time}`;
    }
  }
}

function boot() {
  bindNavigation();
  applyTripToContent();
  renderDashboard();
  renderTrip();
  renderSafety();
  renderWeather();
  renderMatches();
  renderExpenses();
  renderRecommendations();
  resetChat();
  bindInteractions();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const initial = window.location.hash.replace("#", "") || "landing";
  navigate(initial, false);
  renderIcons();

  // Idioma y moneda: prepara el sistema y trae el tipo de cambio real
  applyLanguage("es");
  updatePremiumPrice();
  loadExchangeRate();
}

document.addEventListener("DOMContentLoaded", boot);


/* ============================================================
   TRAVELIFE 2026 — Capa de mejoras (añadida sin tocar el HTML
   base). Conecta los botones que no tenian accion: navegacion
   a secciones, toasts, modales de "Agregar evento" y "Nuevo
   gasto", panel de notificaciones, interaccion del mapa, etc.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Toast / notificaciones ---- */
  function ensureToastHost() {
    let host = $("#tlToasts");
    if (!host) {
      host = document.createElement("div");
      host.id = "tlToasts";
      host.className = "tl-toasts";
      document.body.appendChild(host);
    }
    return host;
  }

  function notify(message, opts = {}) {
    const host = ensureToastHost();
    const el = document.createElement("div");
    el.className = `tl-toast ${opts.tone || ""}`.trim();
    el.innerHTML = `
      <span class="tl-toast-ic"><i data-lucide="${opts.icon || "check-circle-2"}"></i></span>
      <div class="tl-toast-body">
        ${opts.title ? `<strong>${opts.title}</strong>` : ""}
        <span>${message}</span>
      </div>
    `;
    host.appendChild(el);
    renderIcons();
    requestAnimationFrame(() => el.classList.add("show"));
    window.setTimeout(() => {
      el.classList.remove("show");
      window.setTimeout(() => el.remove(), 280);
    }, opts.duration || 2600);
  }

  /* ---- Modal generico ---- */
  let modalOpen = false;
  function openModal({ title, icon, fields = [], submitText = "Guardar", onSubmit }) {
    closeModal();
    modalOpen = true;
    const overlay = document.createElement("div");
    overlay.className = "tl-modal-overlay";
    overlay.id = "tlModal";
    overlay.innerHTML = `
      <div class="tl-modal" role="dialog" aria-modal="true">
        <div class="tl-modal-head">
          <h3><i data-lucide="${icon || "sparkles"}"></i>${title}</h3>
          <button class="tl-modal-x" type="button" aria-label="Cerrar"><i data-lucide="x"></i></button>
        </div>
        <form class="tl-modal-body">
          ${fields.map(f => f.type === "select"
            ? `<label class="tl-field"><span>${f.label}</span>
                 <select name="${f.name}" class="form-input">
                   ${f.options.map(o => `<option>${o}</option>`).join("")}
                 </select></label>`
            : `<label class="tl-field"><span>${f.label}</span>
                 <input name="${f.name}" class="form-input" type="${f.type || "text"}"
                        placeholder="${f.placeholder || ""}" value="${f.value || ""}" ${f.required ? "required" : ""}></label>`
          ).join("")}
          <div class="tl-modal-actions">
            <button type="button" class="btn btn-ghost tl-modal-cancel">Cancelar</button>
            <button type="submit" class="btn btn-primary">${submitText}</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);
    renderIcons();
    requestAnimationFrame(() => overlay.classList.add("show"));

    const close = () => closeModal();
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    overlay.querySelector(".tl-modal-x").addEventListener("click", close);
    overlay.querySelector(".tl-modal-cancel").addEventListener("click", close);
    overlay.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      const data = {};
      fields.forEach(f => { data[f.name] = overlay.querySelector(`[name="${f.name}"]`).value.trim(); });
      if (onSubmit) onSubmit(data);
      close();
    });
    const firstInput = overlay.querySelector("input,select");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    const overlay = $("#tlModal");
    if (overlay) {
      overlay.classList.remove("show");
      window.setTimeout(() => overlay.remove(), 220);
    }
    modalOpen = false;
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (modalOpen) closeModal();
      const np = $("#tlNotif");
      if (np && np.classList.contains("show")) np.classList.remove("show");
    }
  });

  /* ---- Acciones concretas ---- */
  function addTripEvent(data) {
    const stop = mock.itinerary[0];
    stop.items.push({
      icon: "calendar-plus",
      title: data.title || "Nuevo evento",
      meta: `${data.day || "Dia 1"} · ${data.time || "Sin hora"}`
    });
    renderTrip();
    renderIcons();
    notify(`"${data.title}" agregado a tu itinerario.`, { title: "Evento agregado", icon: "calendar-check" });
  }

  function addExpense(data) {
    const amount = Math.abs(parseFloat(data.amount)) || 0;
    const cat = data.category || "Otros";
    const iconByCat = { Hotel: "hotel", Comida: "utensils", Transporte: "car", Tickets: "ticket", Otros: "circle-dollar-sign" };
    const colorByCat = { Hotel: "#1D4ED8", Vuelos: "#06B6D4", Transporte: "#06B6D4", Comida: "#22C55E", Tickets: "#F59E0B", Otros: "#94A3B8" };

    // 1) Registrar la transacción (en USD internamente)
    mock.transactions.unshift({
      icon: iconByCat[cat] || "circle-dollar-sign",
      name: data.name || "Gasto sin nombre",
      meta: `${cat} · hoy`,
      amount: -amount
    });

    // 2) Sumar a la categoría -> esto sube el "usado" y baja lo disponible
    let target = mock.expenses.find(c => c.name.toLowerCase() === cat.toLowerCase());
    if (!target) {
      target = { icon: iconByCat[cat] || "circle-dollar-sign", name: cat, amount: 0, color: colorByCat[cat] || "#94A3B8", pct: 50 };
      mock.expenses.push(target);
    }
    target.amount += amount;

    // 3) Recalcular barras de categoría (proporcional a la mayor)
    const maxCat = Math.max(...mock.expenses.map(c => c.amount), 1);
    mock.expenses.forEach(c => { c.pct = Math.max(8, Math.round((c.amount / maxCat) * 100)); });

    // 4) Re-render (gastos + presupuesto del dashboard) y avisar
    renderExpenses();
    applyLanguage(tlLang);
    const remaining = Math.max(0, TRIP.budget.total - budgetUsedUSD());
    notify(`${tr("Gasto")} ${formatMoney(amount)} · ${tr("Te quedan")} ${formatMoney(remaining)}.`, { title: tr("Gasto"), icon: "wallet-cards" });
  }

  /* ---- Panel de notificaciones (campana) ---- */
  function toggleNotifPanel(anchor) {
    let panel = $("#tlNotif");
    if (panel && panel.classList.contains("show")) { panel.classList.remove("show"); return; }
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "tlNotif";
      panel.className = "tl-notif";
      panel.innerHTML = `
        <div class="tl-notif-head"><strong>Alertas</strong><span class="badge badge-orange">2 nuevas</span></div>
        <button class="tl-notif-item" type="button" data-go="safety">
          <span class="tl-notif-ic orange"><i data-lucide="traffic-cone"></i></span>
          <div><strong>Alta afluencia</strong><span>Zona estadio desde 16:00. Sal 40 min antes.</span></div>
        </button>
        <button class="tl-notif-item" type="button" data-go="weather">
          <span class="tl-notif-ic blue"><i data-lucide="cloud-rain"></i></span>
          <div><strong>Riesgo de lluvia 42%</strong><span>Revisa el Weather Center antes de salir.</span></div>
        </button>
        <button class="tl-notif-item" type="button" data-go="safety">
          <span class="tl-notif-ic"><i data-lucide="badge-alert"></i></span>
          <div><strong>Documentos</strong><span>Guarda copia offline de pasaporte y seguro.</span></div>
        </button>
      `;
      document.body.appendChild(panel);
      panel.addEventListener("click", e => {
        const it = e.target.closest("[data-go]");
        if (it) { navigate(it.dataset.go); panel.classList.remove("show"); }
      });
    }
    const r = anchor.getBoundingClientRect();
    panel.style.top = `${r.bottom + 10}px`;
    panel.style.right = `${Math.max(16, window.innerWidth - r.right)}px`;
    renderIcons();
    requestAnimationFrame(() => panel.classList.add("show"));
  }

  document.addEventListener("click", e => {
    const panel = $("#tlNotif");
    if (panel && panel.classList.contains("show") && !e.target.closest("#tlNotif") && !e.target.closest(".topbar-notif")) {
      panel.classList.remove("show");
    }
  });

  /* ---- Wiring de los botones sin accion ---- */
  function byText(root, selector, text) {
    return $$(selector, root).find(el => el.textContent.trim().toLowerCase().includes(text.toLowerCase()));
  }

  function wire() {
    // Campana de alertas
    const notifBtn = $(".topbar-notif");
    if (notifBtn) notifBtn.addEventListener("click", () => toggleNotifPanel(notifBtn));

    // Cerrar sesion -> vuelve al landing
    const logout = $(".sidebar-logout");
    if (logout) logout.addEventListener("click", e => {
      e.preventDefault();
      navigate("landing");
      notify("Sesion cerrada.", { title: "Hasta pronto", icon: "log-out" });
    });

    // Mi Viaje -> Agregar evento (modal)
    const addEventBtn = byText($("#screen-my-trip"), ".btn", "Agregar evento");
    if (addEventBtn) addEventBtn.addEventListener("click", () => openModal({
      title: "Agregar evento", icon: "calendar-plus", submitText: "Agregar al itinerario",
      fields: [
        { name: "title", label: "Titulo del evento", placeholder: "Ej. Visita museo", required: true },
        { name: "day", label: "Dia", type: "select", options: ["Dia 1", "Dia 3", "Dia 6"] },
        { name: "time", label: "Hora", type: "time", value: "12:00" }
      ],
      onSubmit: addTripEvent
    }));

    // Gastos -> Nuevo gasto (modal)
    const addExpenseBtn = byText($("#screen-expenses"), ".btn", "Gasto");
    if (addExpenseBtn) addExpenseBtn.addEventListener("click", () => openModal({
      title: "Nuevo gasto", icon: "wallet-cards", submitText: "Registrar gasto",
      fields: [
        { name: "name", label: "Concepto", placeholder: "Ej. Cena restaurante", required: true },
        { name: "amount", label: "Monto (USD)", type: "number", placeholder: "0", required: true },
        { name: "category", label: "Categoria", type: "select", options: ["Hotel", "Comida", "Transporte", "Tickets", "Otros"] }
      ],
      onSubmit: addExpense
    }));

    // Safety -> Emergencia
    const sos = byText($("#screen-safety"), ".btn", "Emergencia");
    if (sos) sos.addEventListener("click", () => {
      navigate("safety");
      notify("Emergencias 911. Tus contactos rapidos estan abajo.", { title: "Modo emergencia", icon: "phone-call", tone: "danger", duration: 3600 });
    });

    // Safety -> Subir documentos
    const upload = byText($("#screen-safety"), ".btn", "Subir");
    if (upload) upload.addEventListener("click", () => openModal({
      title: "Subir documento", icon: "upload", submitText: "Guardar documento",
      fields: [
        { name: "name", label: "Nombre del documento", placeholder: "Ej. Visa, reserva hotel", required: true },
        { name: "type", label: "Tipo", type: "select", options: ["Identidad", "Seguro", "Reserva", "Otro"] }
      ],
      onSubmit: d => notify(`"${d.name}" guardado en tus documentos.`, { title: "Documento subido", icon: "file-check" })
    }));

    // Premium -> Activar Premium (hero y CTA)
    $$(".btn").filter(b => b.textContent.trim().toLowerCase().includes("activar premium")).forEach(btn => {
      btn.addEventListener("click", () => {
        navigate("premium");
        notify("Premium activado. Disfruta AI ilimitado y alertas proactivas.", { title: "TRAVELIFE Premium", icon: "crown", tone: "gold", duration: 3200 });
      });
    });

    // Perfil -> Editar (lleva a Configuracion)
    const edit = $(".profile-edit-btn");
    if (edit) edit.addEventListener("click", () => navigate("settings"));

    // Mapa real: cambio de ciudad sede -> redibuja mapa, marcadores y ruta real
    const mapCity = $("#mapCitySel");
    if (mapCity) mapCity.addEventListener("change", e => {
      renderMap(e.target.value);
      notify(`Mapa y ruta cargados para ${e.target.options[e.target.selectedIndex].text}.`, { title: "Ciudad", icon: "map", duration: 1600 });
    });

    // Reservas y documentos: feedback al tocar
    $$("#screen-my-trip .reservation-row").forEach(row => {
      row.style.cursor = "pointer";
      row.addEventListener("click", () => {
        const name = row.querySelector("span")?.textContent || "Reserva";
        notify(`Detalle de reserva: ${name}.`, { icon: "ticket", duration: 1800 });
      });
    });
    $$("#screen-safety .doc-card").forEach(card => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const name = card.querySelector("span")?.textContent || "Documento";
        notify(`Abriendo: ${name}.`, { icon: "file-text", duration: 1600 });
      });
    });

    // Configuracion: Idioma (traduce la interfaz)
    const langSel = $("#langSelect");
    if (langSel) langSel.addEventListener("change", e => {
      applyLanguage(e.target.value);
      notify(e.target.value === "en" ? "Language changed to English." : "Idioma cambiado a Español.", { icon: "languages", duration: 1800 });
    });

    // Configuracion: Moneda (convierte todos los montos con tipo de cambio real)
    const curSel = $("#currencySelect");
    if (curSel) curSel.addEventListener("change", e => {
      setCurrency(e.target.value);
      const msg = e.target.value === "MXN"
        ? `${tr("Moneda")}: MXN (1 USD ≈ ${tlRate.toFixed(2)} MXN).`
        : `${tr("Moneda")}: USD.`;
      notify(msg, { icon: "circle-dollar-sign", duration: 2200 });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // corre despues de boot() para que los elementos ya existan
    window.setTimeout(wire, 0);
  });

  // expuesto por si quieres usarlo desde consola
  window.TL = { notify, openModal };
})();
