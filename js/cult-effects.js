/* ===========================
   CULT-EFFECTS — inspirado en cult-ui (nolly-studio/cult-ui)
   Reimplementación vanilla JS (sin React/framer-motion) de:
   - .btn--glow    → halo que sigue al cursor (glow-button.tsx)
   - .logo-carousel → columnas de logos con ciclado (logo-carousel.tsx)
   Ver css/cult-effects.css para los estilos asociados.
=========================== */
(function () {
  "use strict";

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- BTN--GLOW: sigue al cursor en el eje X ---- */
  function initGlowButtons() {
    var buttons = document.querySelectorAll(".btn--glow, .navlink--glow");
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        x = Math.max(0, Math.min(100, x));
        btn.style.setProperty("--glow-x", x + "%");
      });

      // Fallback accesible (foco por teclado): centra el halo.
      btn.addEventListener("focus", function () {
        btn.style.setProperty("--glow-x", "50%");
      });
    });
  }

  /* ---- LOGO-CAROUSEL: ciclado por columnas con delay escalonado ---- */
  function initLogoCarousel(root) {
    var columns = root.querySelectorAll(".logo-carousel__col");
    if (!columns.length) return;

    var CYCLE_MS = 2200;
    var COLUMN_DELAY_MS = 220;
    var LEAVE_MS = 300;

    columns.forEach(function (col, colIndex) {
      var items = col.querySelectorAll(".logo-carousel__item");
      if (items.length < 2) return;

      // Asegura que solo el primer item empiece activo.
      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === 0);
      });

      if (prefersReducedMotion) return; // deja el primer logo fijo, sin ciclar

      var current = 0;

      function advance() {
        var prev = items[current];
        prev.classList.remove("is-active");
        prev.classList.add("is-leaving");

        current = (current + 1) % items.length;
        items[current].classList.add("is-active");

        setTimeout(function () {
          prev.classList.remove("is-leaving");
        }, LEAVE_MS);
      }

      setTimeout(function () {
        setInterval(advance, CYCLE_MS);
      }, colIndex * COLUMN_DELAY_MS);
    });
  }

  function init() {
    initGlowButtons();
    document.querySelectorAll(".logo-carousel").forEach(initLogoCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
