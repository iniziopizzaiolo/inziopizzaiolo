// INIZIO — JS

// ---- NAV: scroll shadow ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- NAV: mobile toggle ----
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

// Close nav when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- FAQ: accordion ----
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq__question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });

    // Toggle this one
    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.classList.toggle('open', !isOpen);
  });
});

// ---- Animaciones de scroll — toda la web ----
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  /* Base */
  .rv       { opacity: 0; transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); will-change: transform, opacity; }
  .rv.show  { opacity: 1 !important; transform: none !important; }

  /* Desde abajo (default) */
  .rv-up    { transform: translateY(56px) scale(.96); }
  /* Desde la izquierda */
  .rv-left  { transform: translateX(-60px); }
  /* Desde la derecha */
  .rv-right { transform: translateX(60px); }
  /* Zoom in */
  .rv-zoom  { transform: scale(.88); }
  /* Flip leve */
  .rv-flip  { transform: translateY(40px) rotateX(8deg); transform-origin: bottom center; }

  @media (prefers-reduced-motion: reduce) {
    .rv, .rv-up, .rv-left, .rv-right, .rv-zoom, .rv-flip { opacity: 1; transform: none; transition: none; }
  }
`;
document.head.appendChild(revealStyle);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function addReveal(sel, variant, stagger) {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('rv', variant);
    if (stagger) el.style.transitionDelay = Math.min(i % 8 * 90, 600) + 'ms';
    revealObserver.observe(el);
  });
}

// Tarjetas y items en grid — suben con stagger
addReveal('.pilar', 'rv-up', true);
addReveal('.lp-card', 'rv-up', true);
addReveal('.lp-paso', 'rv-up', true);
addReveal('.lp-testi', 'rv-up', true);
addReveal('.lp-incluye-item', 'rv-up', true);
addReveal('.galeria-home__item', 'rv-zoom', true);
addReveal('.galeria-page__cell', 'rv-zoom', true);
addReveal('.logro', 'rv-up', true);
addReveal('.timeline__item', 'rv-up', true);
addReveal('.aparicion', 'rv-up', true);
addReveal('.fecha-card', 'rv-up', true);

// Stats y credenciales — desde la izquierda/derecha alternando
document.querySelectorAll('.lp-stat, .lp-cred').forEach((el, i) => {
  el.classList.add('rv', i % 2 === 0 ? 'rv-left' : 'rv-right');
  el.style.transitionDelay = Math.min(i * 100, 500) + 'ms';
  revealObserver.observe(el);
});

// Secciones grandes — flip
addReveal('.experiencia__inner, .privada__inner, .rodny__inner', 'rv-flip', false);

// FAQ
addReveal('.faq__item', 'rv-up', true);

// Pills — zoom
addReveal('.lp-pill', 'rv-zoom', true);
