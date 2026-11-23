/**
 * TP3 - Desarrollo de Sistemas Web Front End (IFTS 29)
 * Equipo 32 · Caso de Estudio: StudyMatch. (IFTS 16) · Bloque S13-A
 * script.js · Comportamiento interactivo accesible (Vanilla JS)
 * Soporte Multitema (Modo Claro / Modo Oscuro), Acordeones WAI-ARIA y Navegación Accesible
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initAccordions();
  initSmoothScroll();
  console.log('✅ StudyMatch. [Equipo 32 - IFTS 29] · Inicialización completa con alternador de tema Claro/Oscuro.');
});

/**
 * 1. Control del Selector de Tema (Modo Claro / Modo Oscuro)
 * Permite alternar entre la paleta clara (Marfil y Cobalto) y la oscura (Azul Carbón, Turquesa y Dorado)
 * con persistencia en localStorage y accesibilidad por teclado.
 */
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  const themeText = themeToggleBtn.querySelector('.theme-text');

  // Recuperar tema guardado o respetar preferencia del sistema operativo
  const savedTheme = localStorage.getItem('studymatch-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  // Manejo de alternancia al hacer clic o presionar Enter / Espacio
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('studymatch-theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    themeToggleBtn.setAttribute('aria-pressed', String(isDark));

    if (themeIcon) {
      themeIcon.textContent = isDark ? '🌙' : '☀️';
    }

    if (themeText) {
      themeText.textContent = isDark ? 'Modo Oscuro' : 'Modo Claro';
    }

    themeToggleBtn.setAttribute(
      'title',
      isDark
        ? 'Cambiar a Modo Claro (Fondo Blanco/Marfil Suave y Cobalto)'
        : 'Cambiar a Modo Oscuro (Azul Carbón, Turquesa y Dorado)'
    );
  }
}

/**
 * 2. Inicializa los acordeones técnicos accesibles (WAI-ARIA Accordion Pattern).
 * Permite apertura/cierre tanto por clic como por teclado (Enter, Espacio, Flechas).
 */
function initAccordions() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  if (!accordionTriggers.length) return;

  accordionTriggers.forEach((trigger, index) => {
    // Manejo de evento click
    trigger.addEventListener('click', () => {
      toggleAccordion(trigger);
    });

    // Navegación por teclado mejorada (WAI-ARIA APG Accordion)
    trigger.addEventListener('keydown', (event) => {
      const { key } = event;

      switch (key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextTrigger = accordionTriggers[(index + 1) % accordionTriggers.length];
          nextTrigger.focus();
          break;

        case 'ArrowUp':
          event.preventDefault();
          const prevTrigger = accordionTriggers[(index - 1 + accordionTriggers.length) % accordionTriggers.length];
          prevTrigger.focus();
          break;

        case 'Home':
          event.preventDefault();
          accordionTriggers[0].focus();
          break;

        case 'End':
          event.preventDefault();
          accordionTriggers[accordionTriggers.length - 1].focus();
          break;

        default:
          // Enter y Space activan 'click' de forma nativa en botones HTML.
          break;
      }
    });
  });
}

/**
 * Alterna el estado de apertura/cierre de un acordeón individual.
 * @param {HTMLButtonElement} trigger
 */
function toggleAccordion(trigger) {
  const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
  const panelId = trigger.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  const item = trigger.closest('.accordion-item');

  if (!panel) return;

  // Actualizar estado ARIA
  trigger.setAttribute('aria-expanded', String(!isExpanded));

  if (isExpanded) {
    // Cerrar panel
    panel.hidden = true;
    if (item) item.classList.remove('is-open');
  } else {
    // Abrir panel
    panel.hidden = false;
    if (item) item.classList.add('is-open');
  }
}

/**
 * 3. Desplazamiento suave con ajuste de foco para los enlaces internos.
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}
