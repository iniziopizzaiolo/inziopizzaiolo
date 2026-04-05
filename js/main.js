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

// ---- Smooth reveal on scroll ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.pilar, .experiencia__inner, .privada__inner, .rodny__inner, .faq__item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Add reveal CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// ---- GALERIA: filtros ----
const galeriaGrid = document.getElementById('galeriaGrid');
if (galeriaGrid) {
  const filtros = document.querySelectorAll('.galeria__btn');

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      const cat = btn.dataset.filtro;
      const items = galeriaGrid.querySelectorAll('.galeria__item');
      items.forEach(item => {
        item.classList.remove('galeria__item--wide');
        item.hidden = cat !== 'todo' && item.dataset.cat !== cat;
      });
      const first = [...items].find(i => !i.hidden);
      if (first) first.classList.add('galeria__item--wide');
    });
  });

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  let lbItems = [], lbIdx = 0;

  galeriaGrid.addEventListener('click', e => {
    const item = e.target.closest('.galeria__item');
    if (!item) return;
    const visibles = [...galeriaGrid.querySelectorAll('.galeria__item:not([hidden])')];
    lbItems = visibles.map(i => ({ src: i.querySelector('img').src, alt: i.querySelector('img').alt }));
    lbIdx   = visibles.indexOf(item);
    showLb(lbIdx);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lb__close')) closeLb();
    if (e.target.classList.contains('lb__prev')) { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; showLb(lbIdx); }
    if (e.target.classList.contains('lb__next')) { lbIdx = (lbIdx + 1) % lbItems.length; showLb(lbIdx); }
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; showLb(lbIdx); }
    if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbItems.length; showLb(lbIdx); }
  });

  function showLb(i) {
    lbImg.src = lbItems[i].src;
    lbImg.alt = lbItems[i].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}
