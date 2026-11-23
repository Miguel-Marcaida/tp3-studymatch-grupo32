/**
 * TP3 - Desarrollo de Sistemas Web Front End (IFTS 29)
 * Equipo 32 · Caso de Estudio: StudyMatch. (IFTS 16) · Bloque S13-A
 * script.js · Comportamiento interactivo accesible (Vanilla JS)
 * Soporte Multitema (Modo Claro / Modo Oscuro), Acordeones WAI-ARIA,
 * Menú Móvil Accesible y Modal de Diagramas de Flujo Ampliados.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initAccordions();
  initSmoothScroll();
  initMobileMenu();
  initDiagramModal();
  console.log('✅ StudyMatch. [Equipo 32 - IFTS 29] · Inicialización completa: Menú responsive, Modal de Diagramas y Acordeones activos.');
});

/**
 * 1. Control del Selector de Tema (Modo Claro / Modo Oscuro)
 * Permite alternar entre la paleta clara (Marfil y Cobalto) y la oscura (Azul Carbón, Turquesa y Dorado)
 * con persistencia en localStorage y accesibilidad por teclado.
 */
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('.theme-icon') || themeToggleBtn.querySelector('.theme-toggle-icon');
  const themeText = themeToggleBtn.querySelector('.theme-text') || themeToggleBtn.querySelector('.theme-toggle-text');

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
      //themeText.textContent = isDark ? 'Modo Oscuro' : 'Modo Claro';
      themeText.textContent = isDark ? '' : '';
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
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * 4. Control del Menú Hamburguesa Accesible para Pantallas Chicas / Mobile
 * Alterna el menú mediante clic o teclado (Enter/Espacio en el botón),
 * cierra con tecla Escape, al hacer clic en un enlace de navegación,
 * o al hacer clic fuera del menú desplegado.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (!menuToggle || !mainNav) return;

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    mainNav.classList.add('is-open');
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    mainNav.classList.remove('is-open');
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar el menú al hacer clic en cualquiera de sus enlaces
  const navLinks = mainNav.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Cerrar al presionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Si se redimensiona a pantalla grande, asegurar que se cierre el estado móvil
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1040 && mainNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/**
 * 5. Ventana Modal Accesible para Diagramas Ampliados
 * Permite ampliar los diagramas SVG de R1 y R2 a resolución completa y nítida.
 * Accesible por teclado (Escape para cerrar, foco atrapado y restaurado),
 * cierre por botón, por botón descartar o por clic en el fondo oscuro.
 */
function initDiagramModal() {
  const modal = document.getElementById('diagram-modal');
  if (!modal) return;

  const modalBody = document.getElementById('modal-diagram-body');
  const modalTitle = document.getElementById('modal-diagram-title');
  const modalBadge = document.getElementById('modal-diagram-badge');
  const closeBtn = document.getElementById('modal-close-btn');
  const dismissBtn = modal.querySelector('.modal-close-action');

  let lastActiveElement = null;

  const diagramMetadata = {
    'diagram-r1': {
      badge: 'Modelado Agéntico R1 · Buscador Inteligente',
      title: 'Diagrama de Flujo R1 · Perfil Completo (p ∧ q ∧ r)'
    },
    'diagram-r2': {
      badge: 'Modelado Agéntico R2 · Asistente de Perfil',
      title: 'Diagrama de Flujo R2 · Perfil Incompleto (¬p ∨ ¬q ∨ ¬r)'
    },
    'r1': {
      badge: 'Modelado Agéntico R1 · Buscador Inteligente',
      title: 'Diagrama de Flujo R1 · Perfil Completo (p ∧ q ∧ r)'
    },
    'r2': {
      badge: 'Modelado Agéntico R2 · Asistente de Perfil',
      title: 'Diagrama de Flujo R2 · Perfil Incompleto (¬p ∨ ¬q ∨ ¬r)'
    }
  };

  function openModal(diagramKey, triggerElement) {
    lastActiveElement = triggerElement || document.activeElement;

    // Localizar el contenedor de diagrama
    let wrapper = document.querySelector(`.svg-diagram-wrapper[data-diagram="${diagramKey}"]`);
    if (!wrapper) {
      wrapper = document.querySelector(`[data-diagram-wrapper="${diagramKey}"]`);
    }
    if (!wrapper && (diagramKey === 'r1' || diagramKey === 'diagram-r1')) {
      wrapper = document.querySelector('.svg-diagram-wrapper[data-diagram*="r1"]');
    }
    if (!wrapper && (diagramKey === 'r2' || diagramKey === 'diagram-r2')) {
      wrapper = document.querySelector('.svg-diagram-wrapper[data-diagram*="r2"]');
    }
    if (!wrapper) return;

    const originalSvg = wrapper.querySelector('svg');
    if (!originalSvg) return;

    // Limpiar contenido previo del modal
    if (modalBody) {
      modalBody.innerHTML = '';
      const clonedSvg = originalSvg.cloneNode(true);
      clonedSvg.classList.add('modal-cloned-svg');
      modalBody.appendChild(clonedSvg);
    }

    // Actualizar encabezados
    const meta = diagramMetadata[diagramKey] || diagramMetadata['diagram-r1'];
    if (modalBadge) modalBadge.textContent = meta.badge;
    if (modalTitle) modalTitle.textContent = meta.title;

    // Mostrar modal
    modal.hidden = false;
    document.body.classList.add('modal-open');

    // Foco en el botón de cierre
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (modalBody) modalBody.innerHTML = '';

    // Restaurar foco al elemento que abrió el modal
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Asignar eventos a los botones de ampliar
  const expandButtons = document.querySelectorAll('.btn-expand-diagram');
  expandButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const diagramKey = btn.getAttribute('data-diagram') || 'diagram-r1';
      openModal(diagramKey, btn);
    });
  });

  // Asignar eventos al hacer clic o presionar Enter en los wrappers de los diagramas
  const diagramWrappers = document.querySelectorAll('.svg-diagram-wrapper');
  diagramWrappers.forEach((wrap) => {
    wrap.addEventListener('click', () => {
      const diagramKey = wrap.getAttribute('data-diagram') || wrap.getAttribute('data-diagram-wrapper') || 'diagram-r1';
      openModal(diagramKey, wrap);
    });

    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const diagramKey = wrap.getAttribute('data-diagram') || wrap.getAttribute('data-diagram-wrapper') || 'diagram-r1';
        openModal(diagramKey, wrap);
      }
    });
  });

  // Eventos de cierre
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic en el fondo del modal (fuera del diálogo)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}
