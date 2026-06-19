const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const mock = {
  dashboardStats: [
    { icon: "route", tone: "blue", value: "12", label: "dias de viaje", trend: "+4 ciudades" },
    { icon: "ticket", tone: "cyan", value: "5", label: "partidos guardados", trend: "2 VIP" },
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

  $("#topbarTitle").textContent = screen.dataset.title || "TRAVELIFE";
  $("#sidebar").classList.remove("mobile-open");
  $("#sidebarOverlay").classList.remove("open");

  if (updateHash && window.location.hash !== `#${screenId}`) {
    history.pushState(null, "", `#${screenId}`);
  }
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

function renderWeather(cityId = "cdmx") {
  const item = mock.weather[cityId];
  $("#weatherMain").innerHTML = `
    <div class="weather-current">
      <div>
        <span class="badge badge-cyan">${item.city}</span>
        <h2>${item.temp}°</h2>
        <p>${item.condition}</p>
      </div>
      <div class="weather-icon"><i data-lucide="cloud-sun"></i></div>
    </div>
    <div class="weather-metrics">
      <div><i data-lucide="cloud-rain"></i><span>Lluvia</span><strong>${item.rain}</strong></div>
      <div><i data-lucide="wind"></i><span>Viento</span><strong>${item.wind}</strong></div>
      <div><i data-lucide="sun"></i><span>UV</span><strong>${item.uv}</strong></div>
    </div>
  `;
  $("#weatherAdvice").textContent = item.advice;
  $("#forecastList").innerHTML = item.forecast.map(day => `
    <div class="forecast-row">
      <strong>${day[0]}</strong>
      <span>${day[2]}</span>
      <b>${day[1]}</b>
      <em>${day[3]}</em>
    </div>
  `).join("");
  renderIcons();
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

function renderMap() {
  $("#poiList").innerHTML = mock.poi.map(point => `
    <article class="poi-card">
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
}

function renderExpenses() {
  $("#expenseCats").innerHTML = mock.expenses.map(cat => `
    <article class="exp-cat-card">
      <div class="exp-cat-icon"><i data-lucide="${cat.icon}"></i></div>
      <div class="exp-cat-name">${cat.name}</div>
      <div class="exp-cat-amt">$${cat.amount.toLocaleString()}</div>
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
      <div class="txn-amt ${txn.amount > 0 ? "income" : ""}">${txn.amount > 0 ? "+" : "-"}$${Math.abs(txn.amount)}</div>
    </div>
  `).join("");
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
  addAiMessage("assistant", "Hola, soy tu Travel AI Assistant. Tengo contexto de tu viaje demo: CDMX, partido a las 19:00, clima variable y presupuesto al 68%.");
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
    return "Ruta segura demo: hotel a metro Reforma, transbordo directo y caminata por corredor principal. Evita calles laterales despues del partido y usa el punto de reunion norte.";
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

function submitAiQuestion(question) {
  if (!question) return;
  addAiMessage("user", question);
  window.setTimeout(() => addAiMessage("assistant", aiReply(question)), 250);
}

function updateCountdown() {
  const target = new Date("2026-06-25T19:00:00-06:00").getTime();
  const now = Date.now();
  const distance = Math.max(0, target - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const values = [
    ["dias", days],
    ["hrs", hours],
    ["min", minutes]
  ];

  $("#countdown").innerHTML = values.map(([label, value]) => `
    <span class="cd-unit">
      <span class="cd-num">${String(value).padStart(2, "0")}</span>
      <span class="cd-lbl">${label}</span>
    </span>
  `).join('<span class="cd-sep">:</span>');
}

function boot() {
  bindNavigation();
  renderDashboard();
  renderTrip();
  renderSafety();
  renderWeather();
  renderMatches();
  renderMap();
  renderExpenses();
  renderRecommendations();
  resetChat();
  bindInteractions();
  updateCountdown();
  window.setInterval(updateCountdown, 60000);

  const initial = window.location.hash.replace("#", "") || "landing";
  navigate(initial, false);
  renderIcons();
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
    const iconByCat = { Hotel: "hotel", Comida: "utensils", Transporte: "car", Tickets: "ticket", Otros: "circle-dollar-sign" };
    mock.transactions.unshift({
      icon: iconByCat[data.category] || "circle-dollar-sign",
      name: data.name || "Gasto sin nombre",
      meta: `${data.category || "Otros"} · hoy`,
      amount: -amount
    });
    renderExpenses();
    renderIcons();
    notify(`Gasto de $${amount} registrado en ${data.category || "Otros"}.`, { title: "Gasto agregado", icon: "wallet-cards" });
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
      notify("Sesion cerrada (demo).", { title: "Hasta pronto", icon: "log-out" });
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
      notify("Llamando a Emergencias 911 (demo). Tus contactos rapidos estan abajo.", { title: "Modo emergencia", icon: "phone-call", tone: "danger", duration: 3600 });
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
        notify("Premium activado en modo demo. Disfruta AI ilimitado y alertas proactivas.", { title: "TRAVELIFE Premium", icon: "crown", tone: "gold", duration: 3200 });
      });
    });

    // Perfil -> Editar (lleva a Configuracion)
    const edit = $(".profile-edit-btn");
    if (edit) edit.addEventListener("click", () => navigate("settings"));

    // Mapa: pins activos + zoom + ciudad
    $$(".map-pin").forEach(pin => pin.addEventListener("click", () => {
      $$(".map-pin").forEach(p => p.classList.remove("is-active"));
      pin.classList.add("is-active");
      const label = pin.querySelector(".map-pin-label")?.textContent || "Punto";
      notify(`Centrando mapa en: ${label}.`, { title: "Mapa", icon: "map-pin", duration: 1800 });
    }));

    let zoom = 1;
    const placeholder = $("#screen-map .map-placeholder");
    const zoomBtns = $$("#screen-map .map-ctrl-btn");
    if (zoomBtns[0]) zoomBtns[0].addEventListener("click", () => { zoom = Math.min(2, zoom + 0.15); if (placeholder) placeholder.style.transform = `scale(${zoom})`; });
    if (zoomBtns[1]) zoomBtns[1].addEventListener("click", () => { zoom = Math.max(0.7, zoom - 0.15); if (placeholder) placeholder.style.transform = `scale(${zoom})`; });

    const mapCity = $(".map-city-sel");
    if (mapCity) mapCity.addEventListener("change", e => notify(`Mapa cambiado a ${e.target.value}.`, { title: "Ciudad", icon: "map", duration: 1600 }));

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

    // Configuracion: selects con feedback
    $$("#screen-settings .settings-select").forEach(sel => {
      sel.addEventListener("change", e => notify(`Preferencia actualizada: ${e.target.value}.`, { icon: "settings", duration: 1600 }));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // corre despues de boot() para que los elementos ya existan
    window.setTimeout(wire, 0);
  });

  // expuesto por si quieres usarlo desde consola
  window.TL = { notify, openModal };
})();
