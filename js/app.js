// js/app.js
function updatemenu() {}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const chk = document.getElementById('responsive-menu');
    if (chk && chk.checked) chk.checked = false;
  });
});

const btnTop = document.getElementById('btnScrollTop');
if (btnTop) {
  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const tips = [
  "Empieza con una baseline simple antes de complicar el modelo.",
  "Si un LLM falla en hechos, usa RAG y fuentes claras.",
  "Evalúa con casos reales: ruido, ambigüedad y datos incompletos.",
  "Caché + prompts cortos = menos coste y menos latencia.",
  "Versiona prompts y datasets igual que versionas el código."
];
const btnTip = document.getElementById('btnRandomTip');
const tipBox = document.getElementById('tipBox');
const tipText = document.getElementById('tipText');

if (btnTip && tipBox && tipText) {
  btnTip.addEventListener('click', () => {
    const t = tips[Math.floor(Math.random() * tips.length)];
    tipText.textContent = t;
    tipBox.style.display = 'block';
    tipBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

const search = document.getElementById('searchCards');
const allCards = Array.from(document.querySelectorAll('.card'));
if (search) {
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    allCards.forEach(card => {
      const hay = (card.getAttribute('data-title') || "").toLowerCase();
      const ok = hay.includes(q) || q === "";
      card.style.display = ok ? "" : "none";
    });
  });
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalList = document.getElementById('modalList');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const modalGo = document.getElementById('modalGo');
const modalCopy = document.getElementById('modalCopy');

const cardDetails = {
  "Machine Learning": {
    desc: "Aprende patrones en datos para predecir o clasificar. Base de IA práctica.",
    bullets: ["Supervisado: etiquetas claras", "No supervisado: estructura oculta", "Refuerzo: decisiones secuenciales"],
    go: "#fundamentos"
  },
  "Deep Learning": {
    desc: "Redes neuronales profundas para texto, visión y audio con control de validación.",
    bullets: ["Embeddings para significado", "Backprop y optimización", "Overfitting si no se valida"],
    go: "#fundamentos"
  },
  "IA Generativa": {
    desc: "Genera contenido (texto, imagen, audio). Se controla con prompts y evaluación.",
    bullets: ["LLMs para texto/código", "Difusión para imagen", "Multimodal para combinar señales"],
    go: "#fundamentos"
  },
  "LLMs (Modelos de Lenguaje)": {
    desc: "Transformers que predicen tokens. Útiles para lenguaje, código y automatización.",
    bullets: ["Prompting guía la salida", "Contexto limitado", "Riesgo de alucinación sin fuentes"],
    go: "#modelos"
  },
  "RAG": {
    desc: "Añade recuperación de documentos para responder con contexto real y verificable.",
    bullets: ["Embeddings + vector DB", "Chunking de documentos", "Filtros por metadata"],
    go: "#modelos"
  },
  "Fine-tuning": {
    desc: "Ajuste con datos propios para formato, estilo o tareas específicas.",
    bullets: ["Mejora formato/estilo", "Coste y mantenimiento", "Depende de dataset de calidad"],
    go: "#modelos"
  },
  "Evaluación": {
    desc: "Métricas + test sets + regresión para controlar calidad y robustez.",
    bullets: ["Casos reales", "Regresión (no romper)", "Revisión humana por muestreo"],
    go: "#pipeline"
  },
  "Agentes": {
    desc: "Planifican tareas y llaman herramientas en cadena con control de pasos.",
    bullets: ["Tools", "Planificación", "Control de errores"],
    go: "#modelos"
  },
  "Multimodal": {
    desc: "Combina texto e imagen/audio para entender y generar contenido.",
    bullets: ["Vision + lenguaje", "Audio + transcripción", "Fusión de señales"],
    go: "#modelos"
  },
  "Cloud + IA": {
    desc: "Escalado, coste, latencia y observabilidad para producción.",
    bullets: ["Observabilidad", "Caché y batch", "Rate limit"],
    go: "#aplicaciones"
  },
  "Datos": {
    desc: "Limpieza, gobierno del dato y trazabilidad para entrenar sin sorpresas.",
    bullets: ["ETL", "Calidad", "Privacidad"],
    go: "#aplicaciones"
  },
  "Automatización": {
    desc: "Workflows con agentes y pipelines para ejecutar y validar resultados.",
    bullets: ["Workflows", "Validación", "Monitorización"],
    go: "#aplicaciones"
  }
};

function openModalFromCard(card){
  if (!modal) return;

  const title = (card.querySelector('h3')?.textContent || "Detalle").trim();
  const img = card.querySelector('img')?.getAttribute('src') || "";
  const desc = cardDetails[title]?.desc || "Detalle del bloque seleccionado.";
  const bullets = cardDetails[title]?.bullets || ["Punto clave 1", "Punto clave 2", "Punto clave 3"];
  const go = cardDetails[title]?.go || "#inicio";

  modalTitle.textContent = title;
  modalDesc.textContent = desc;

  modalImg.src = img;
  modalList.innerHTML = bullets.map(b => `<li>${b}</li>`).join("");

  modalGo.onclick = () => {
    const target = document.querySelector(go);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeModal();
  };

  modalCopy.onclick = async () => {
    const text = `${title}: ${desc} | ${bullets.join(" / ")}`;
    try {
      await navigator.clipboard.writeText(text);
      modalCopy.textContent = "Copiado ✓";
      setTimeout(() => (modalCopy.textContent = "Copiar resumen"), 1200);
    } catch (e) {
      modalCopy.textContent = "No se pudo copiar";
      setTimeout(() => (modalCopy.textContent = "Copiar resumen"), 1200);
    }
  };

  modal.classList.add('is-open');
}

function closeModal(){
  if (!modal) return;
  modal.classList.remove('is-open');
}

allCards.forEach(card => {
  card.addEventListener('click', () => openModalFromCard(card));
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
  });
}
