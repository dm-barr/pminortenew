   // Funcionalidad para el menú hamburguesa
   document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav__menu');
  const body = document.body;

  // Solo inicializar si estamos en móvil (menos de 768px)
  if (window.innerWidth <= 768 && navToggle && navMenu) {
    
    // Asegurar que el menú esté oculto inicialmente en móviles
    navMenu.style.display = 'none';
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        // Abrir menú
        navMenu.style.display = 'flex';
        setTimeout(() => {
          navMenu.classList.add('active');
          body.classList.add('no-scroll');
        }, 10);
      } else {
        // Cerrar menú
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        // Esperar a que termine la animación para ocultar completamente
        setTimeout(() => {
          if (!navMenu.classList.contains('active')) {
            navMenu.style.display = 'none';
          }
        }, 400);
      }
    }

    // Event listener para el botón hamburguesa
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav__menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        
        // Ocultar después de la animación
        setTimeout(() => {
          navMenu.style.display = 'none';
        }, 400);
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function (event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        
        setTimeout(() => {
          navMenu.style.display = 'none';
        }, 400);
      }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        
        setTimeout(() => {
          navMenu.style.display = 'none';
        }, 400);
      }
    });
  } else {
    // En desktop, asegurar que el botón hamburguesa esté oculto
    if (navToggle) {
      navToggle.style.display = 'none';
    }
    // Asegurar que el menú normal esté visible
    if (navMenu) {
      navMenu.style.display = 'flex';
    }
  }

  // Cerrar menú al redimensionar si cambiamos a desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      // Modo desktop - ocultar hamburguesa, mostrar menú normal
      if (navToggle) navToggle.style.display = 'none';
      if (navMenu) {
        navMenu.style.display = 'flex';
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
      }
    } else {
      // Modo móvil - mostrar hamburguesa
      if (navToggle) navToggle.style.display = 'flex';
      if (navMenu && !navMenu.classList.contains('active')) {
        navMenu.style.display = 'none';
      }
    }
  });
});