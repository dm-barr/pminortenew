   // Funcionalidad para el menú hamburguesa
    document.addEventListener('DOMContentLoaded', function () {
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav__menu');

      if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', !isExpanded);
          navMenu.classList.toggle('active');

          // Prevenir scroll cuando el menú está abierto
          document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav__menu a');
        navLinks.forEach(link => {
          link.addEventListener('click', function () {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
          });
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function (event) {
          const isClickInsideMenu = navMenu.contains(event.target);
          const isClickOnToggle = navToggle.contains(event.target);

          if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }
    });