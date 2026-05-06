// =====================================================
//  INIZIO — ARCHIVO DE CONFIGURACION
//  Edita solo este archivo para actualizar la web:
//  precios, fechas, redes sociales, numero de WhatsApp
// =====================================================

const INIZIO = {

  // --- CONTACTO ---
  whatsapp: '34614364778',

  // --- PRECIO por defecto ---
  precio: '45',

  // --- FORMULARIO DE RESERVA (Google Form) ---
  // No toques esto salvo que cambies el formulario
  formId: '1FAIpQLSdMosfVxPR9y6CqRbgl_c0_7HVPA_HkGcF9OS3nilgQnmFw4w',
  formEntryFecha: '2007491277',   // entry ID del campo "Fecha del taller"

  // --- PROXIMAS FECHAS ---
  // Organizado por mes: "YYYY-MM": [ lista de sesiones ]
  // Campos por sesión:
  //   dia    → número del día (1-31)
  //   hora   → "HH:MM"
  //   plazas → plazas disponibles (pon 0 para marcar COMPLETO)
  //   max    → aforo máximo de la sesión
  //   tipo   → "Taller" | "Cena Privada" | "Catering"
  //   precio → "50€" (si es distinto al precio por defecto)
  fechas: {
    "2026-04": [
      { dia: 10, hora: "20:00", plazas: 8, max: 8, tipo: "Taller" },
      { dia: 11, hora: "19:30", plazas: 8, max: 8, tipo: "Taller" },
      { dia: 25, hora: "20:00", plazas: 8, max: 8, tipo: "Taller" },
    ],
  },

  // --- REDES SOCIALES (pon tu usuario o deja '' para ocultar) ---
  redes: {
    instagram_inizio:   'iniziorp',
    instagram_personal: 'rodnypizzaiolo',
    tiktok:             '',       // ej: 'iniziorp'
    facebook:           '',       // ej: 'iniziomadrid'
    youtube:            '',       // ej: '@iniziorp'
    airbnb:             '',       // URL completa de tu experiencia en Airbnb
  },

  // --- ESTADISTICAS (actualiza cuando tengas datos reales) ---
  stats: {
    personas:     '50+',
    experiencias: '20+',
    valoracion:   '5.0',
  },

};

// =====================================================
//  NO TOQUES NADA A PARTIR DE AQUI
// =====================================================

const MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_ES  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

function buildFormUrl(year, month, day) {
  const base = `https://docs.google.com/forms/d/e/${INIZIO.formId}/viewform`;
  const e    = INIZIO.formEntryFecha;
  return `${base}?entry.${e}_year=${year}&entry.${e}_month=${month}&entry.${e}_day=${day}&usp=pp_url`;
}

function buildWaUrl(texto) {
  return `https://wa.me/${INIZIO.whatsapp}?text=${encodeURIComponent(texto)}`;
}

function renderFechas() {
  const container = document.getElementById('proximas-fechas');
  if (!container) return;

  const sesiones = [];

  Object.entries(INIZIO.fechas).forEach(([clave, lista]) => {
    const [year, monthRaw] = clave.split('-').map(Number);
    lista.forEach(f => {
      const fecha = new Date(year, monthRaw - 1, f.dia);
      sesiones.push({ ...f, year, month: monthRaw, fecha });
    });
  });

  // Ordenar cronológicamente y filtrar fechas pasadas
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const proximas = sesiones
    .filter(f => f.fecha >= hoy)
    .sort((a, b) => a.fecha - b.fecha);

  if (proximas.length === 0) {
    container.innerHTML = `<p class="fechas__sin-fechas">No hay sesiones programadas en este momento.<br>
      <a href="${buildWaUrl('Hola! Me interesa la Experiencia Inizio. ¿Cuándo es la próxima fecha disponible?')}" target="_blank" rel="noopener">Escríbenos</a> para saber cuándo es la próxima.</p>`;
    return;
  }

  container.innerHTML = proximas.map(f => {
    const diaNombre  = DIAS_ES[f.fecha.getDay()];
    const mesNombre  = MESES_ES[f.month - 1];
    const fechaLabel = `${f.dia} de ${mesNombre}`;
    const completo   = f.plazas === 0;
    const urgente    = !completo && f.plazas <= 2;
    const precio     = f.precio || (INIZIO.precio + '€');

    const claseCard = completo ? 'fecha-card--completo'
                    : urgente  ? 'fecha-card--urgente'
                    : '';

    const badgePlazas = completo
      ? `<span class="plazas--completo">COMPLETO</span>`
      : urgente
        ? `<span class="plazas--urgente">⚡ Últimas ${f.plazas} plaza${f.plazas === 1 ? '' : 's'}</span>`
        : `<span class="plazas--ok">${f.plazas} de ${f.max} plazas disponibles</span>`;

    const boton = completo
      ? `<a href="${buildWaUrl(`Hola! Me interesa la experiencia del ${diaNombre} ${fechaLabel} pero veo que está completo. ¿Puedo apuntarme a la lista de espera?`)}"
            class="btn btn--outline btn--sm" target="_blank" rel="noopener">Lista de espera</a>`
      : `<a href="${buildFormUrl(f.year, f.month, f.dia)}"
            class="btn btn--primary" target="_blank" rel="noopener">Reservar plaza</a>`;

    return `
      <div class="fecha-card ${claseCard}">
        <div class="fecha-card__tipo">${f.tipo}</div>
        <div class="fecha-card__dia">${diaNombre}</div>
        <div class="fecha-card__fecha">${fechaLabel}</div>
        <div class="fecha-card__hora">${f.hora}h · ${precio}</div>
        <div class="fecha-card__plazas">${badgePlazas}</div>
        ${boton}
      </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {

  // Actualizar links WhatsApp con numero de config
  document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
    link.href = link.href.replace(/wa\.me\/[^?]+/, `wa.me/${INIZIO.whatsapp}`);
  });

  // Renderizar proximas fechas
  renderFechas();

  // Renderizar redes sociales si existe el contenedor
  const redesContainer = document.getElementById('redes-sociales');
  if (redesContainer) {
    const redes = [];
    if (INIZIO.redes.instagram_inizio)   redes.push({ red: 'Instagram', usuario: '@' + INIZIO.redes.instagram_inizio,   url: 'https://instagram.com/' + INIZIO.redes.instagram_inizio,   color: '#E1306C', icono: 'ig' });
    if (INIZIO.redes.instagram_personal) redes.push({ red: 'Instagram', usuario: '@' + INIZIO.redes.instagram_personal, url: 'https://instagram.com/' + INIZIO.redes.instagram_personal, color: '#E1306C', icono: 'ig' });
    if (INIZIO.redes.tiktok)             redes.push({ red: 'TikTok',    usuario: '@' + INIZIO.redes.tiktok,             url: 'https://tiktok.com/@' + INIZIO.redes.tiktok,               color: '#000000', icono: 'tt' });
    if (INIZIO.redes.facebook)           redes.push({ red: 'Facebook',  usuario: INIZIO.redes.facebook,                url: 'https://facebook.com/' + INIZIO.redes.facebook,            color: '#1877F2', icono: 'fb' });
    if (INIZIO.redes.youtube)            redes.push({ red: 'YouTube',   usuario: INIZIO.redes.youtube,                 url: 'https://youtube.com/' + INIZIO.redes.youtube,              color: '#FF0000', icono: 'yt' });
    if (INIZIO.redes.airbnb)             redes.push({ red: 'Airbnb',    usuario: 'Reservar experiencia',               url: INIZIO.redes.airbnb,                                        color: '#FF5A5F', icono: 'ab' });

    redesContainer.innerHTML = redes.map(r => `
      <a href="${r.url}" target="_blank" rel="noopener" class="red-card">
        <div class="red-card__icono" style="background:${r.color}">${getSvgIcon(r.icono)}</div>
        <div class="red-card__info">
          <span class="red-card__red">${r.red}</span>
          <span class="red-card__usuario">${r.usuario}</span>
        </div>
        <svg class="red-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    `).join('');
  }

  // Estadisticas
  const statsContainer = document.getElementById('stats-contador');
  if (statsContainer) {
    statsContainer.querySelector('[data-stat="personas"]')     && (statsContainer.querySelector('[data-stat="personas"]').textContent     = INIZIO.stats.personas);
    statsContainer.querySelector('[data-stat="experiencias"]') && (statsContainer.querySelector('[data-stat="experiencias"]').textContent  = INIZIO.stats.experiencias);
    statsContainer.querySelector('[data-stat="valoracion"]')   && (statsContainer.querySelector('[data-stat="valoracion"]').textContent   = INIZIO.stats.valoracion);
  }
});

function getSvgIcon(icono) {
  const icons = {
    ig: `<svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    tt: `<svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`,
    fb: `<svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    yt: `<svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
    ab: `<svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M22.432 17.063c-.202-.608-.462-1.129-.772-1.543l-5.943-8.5c-.558-.8-1.35-1.238-2.21-1.238s-1.654.437-2.21 1.238l-5.942 8.5c-.31.414-.57.935-.773 1.543-.2.6-.3 1.2-.3 1.77 0 1.036.366 1.925 1.058 2.566.685.634 1.605.967 2.66.967a4.03 4.03 0 002.3-.695l2.008-1.361a.63.63 0 01.4-.127.628.628 0 01.4.127l2.007 1.36c.695.467 1.488.695 2.302.502 1.056 0 1.976-.333 2.66-.967.692-.641 1.059-1.53 1.059-2.565 0-.57-.1-1.17-.3-1.77zm-8.925 1.695l-2.007-1.36a1.85 1.85 0 00-1.042-.312c-.38 0-.742.107-1.042.313l-2.007 1.36c-.408.275-.898.425-1.41.425-.697 0-1.252-.217-1.619-.627-.373-.415-.554-.963-.554-1.623 0-.417.073-.856.216-1.3.14-.433.337-.82.565-1.12l5.943-8.498c.3-.43.71-.665 1.157-.665.446 0 .857.236 1.157.665l5.942 8.498c.228.3.425.687.566 1.12.143.444.216.883.216 1.3 0 .66-.18 1.208-.554 1.623-.367.41-.922.627-1.62.627-.51 0-1-.15-1.407-.426z"/></svg>`,
  };
  return icons[icono] || '';
}
