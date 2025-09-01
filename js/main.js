// Narrativa con progreso lateral, reveals y utilidades (vanilla, sin dependencias)
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     Header sticky: opacidad
     ========================= */
  const header = document.querySelector('[data-header]');
  const getHeaderH = () => header ? header.offsetHeight : 0;
  const onScrollHeader = () => {
    if (!header) return;
    header.style.background = window.scrollY > 8 ? 'rgba(39,15,83,.98)' : 'rgba(39,15,83,.96)';
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* =========================
     Scrollspy: rail lateral
     ========================= */
  const dots = $$('#railNav a');
  const sectionIds = dots.map(d => d.dataset.section).filter(Boolean);
  const sections = sectionIds.map(id => $('#'+id)).filter(Boolean);

  const railObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      dots.forEach(d => {
        const active = d.dataset.section === e.target.id;
        d.classList.toggle('is-active', active);
        d.toggleAttribute('aria-current', active);
      });
      // sincr. URL (historial limpio)
      if (history.replaceState) history.replaceState(null, '', `#${e.target.id}`);
    });
  }, { rootMargin: '0px 0px -60% 0px', threshold: 0.35 });

  sections.forEach(s => railObs.observe(s));

  // Accesibilidad: navegar con teclado por dots
  $('#railNav')?.addEventListener('keydown', (ev) => {
    const list = dots;
    const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    if (ev.key === 'ArrowDown' || ev.key === 'PageDown') {
      ev.preventDefault(); (list[i+1] || list.at(-1)).focus();
    }
    if (ev.key === 'ArrowUp' || ev.key === 'PageUp') {
      ev.preventDefault(); (list[i-1] || list[0]).focus();
    }
    if (ev.key === 'Home') { ev.preventDefault(); list[0].focus(); }
    if (ev.key === 'End') { ev.preventDefault(); list.at(-1).focus(); }
  });

  /* =========================
     Scrollspy: menú superior
     ========================= */
  const topLinks = $$('header .nav__menu a[href^="#"]');
  const topObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      topLinks.forEach(a=>{
        const active = a.getAttribute('href') === '#'+e.target.id;
        a.toggleAttribute('aria-current', active);
        a.style.borderBottomColor = active ? 'rgba(255,255,255,.65)' : 'transparent';
      });
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: .25 });
  sections.forEach(s => topObs.observe(s));

  /* =========================
     Reveal al entrar viewport
     ========================= */
  const reveals = $$('.reveal');
  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });
    reveals.forEach(el => io.observe(el));
  }

  /* =========================
     Contadores (stats)
     ========================= */
  const counters = $$('[data-count]');
  const animateNumber = (el) => {
    const target = +el.dataset.count;
    const dur = 1100; const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(target * p).toLocaleString('es-PE');
      if (p < 1 && !prefersReduced) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-PE');
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateNumber(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => io2.observe(c));
  }

  /* =========================
     Cuenta regresiva (hero)
     Estructura esperada:
     .counter[data-countdown="YYYY-MM-DDTHH:mm:ssZ"]
       [data-unit="days|hours|minutes|seconds"]
     ========================= */
  const countdownBlocks = $$('.counter[data-countdown]');
  countdownBlocks.forEach(block => {
    const t = new Date(block.dataset.countdown).getTime();
    const el = {
      d: block.querySelector('[data-unit="days"]'),
      h: block.querySelector('[data-unit="hours"]'),
      m: block.querySelector('[data-unit="minutes"]'),
      s: block.querySelector('[data-unit="seconds"]')
    };
    const tick = () => {
      const now = Date.now();
      let diff = Math.max(0, Math.floor((t - now) / 1000));
      const d = Math.floor(diff / 86400); diff -= d*86400;
      const h = Math.floor(diff / 3600);  diff -= h*3600;
      const m = Math.floor(diff / 60);    diff -= m*60;
      const s = diff;
      if (el.d) el.d.textContent = String(d).padStart(2,'0');
      if (el.h) el.h.textContent = String(h).padStart(2,'0');
      if (el.m) el.m.textContent = String(m).padStart(2,'0');
      if (el.s) el.s.textContent = String(s).padStart(2,'0');
    };
    tick();
    const id = setInterval(() => {
      tick();
      if (Date.now() >= t) clearInterval(id);
    }, 1000);
  });

  /* =========================
     CTA flotante: visible tras scroll
     y oculta cerca del footer
     ========================= */
  const floating = $('.floating-cta');
  if (floating) {
    const showAfter = 400;
    const footer = $('footer');
    const toggle = () => {
      const scrolled = window.scrollY > showAfter;
      floating.style.opacity = scrolled ? '1' : '0';
      floating.style.pointerEvents = scrolled ? 'auto' : 'none';
    };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });

    // ocultar cuando el footer entra
    if (footer) {
      const fObs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting) floating.style.opacity = '0';
        });
      }, { threshold: .05 });
      fObs.observe(footer);
    }
  }

  /* =========================
     Año footer (fallback)
     ========================= */
  const y = $('#y'); if (y) y.textContent = new Date().getFullYear();

  /* =========================
     Suavizado de anclas
     (respeta prefers-reduced-motion)
     ========================= */
  const smoothTo = (el) => {
    const y = el.getBoundingClientRect().top + window.scrollY - (getHeaderH() + 8);
    window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
  };
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const t = $(id);
      if (t) {
        e.preventDefault();
        smoothTo(t);
      }
    });
  });

  // Si llega con hash inicial, compensa el sticky
  if (location.hash) {
    const target = $(location.hash);
    if (target) setTimeout(()=> smoothTo(target), 50);
  }

  /* =========================
     Lazy-load de imágenes
     (usa data-src -> src)
     ========================= */
  const lazyImgs = $$('img[data-src]');
  if (lazyImgs.length) {
    const lio = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(!e.isIntersecting) return;
        const img = e.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        lio.unobserve(img);
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(i=> lio.observe(i));
  }

  /* =========================
     Formularios (mock submit)
     ========================= */
  function handleForm(formId, successMsgDefault) {
    const f = $('#'+formId);
    if(!f) return;
    const successMsg = f.dataset.success || successMsgDefault || 'Gracias, pronto te contactaremos.';
    f.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"], .btn[type="submit"]');
      const hint = f.querySelector('[role="status"]') || f.querySelector('.hint');
      // validación mínima
      const email = f.querySelector('input[type="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.focus(); email.setAttribute('aria-invalid','true'); return;
      }
      btn && (btn.disabled = true);
      setTimeout(()=>{
        btn && (btn.disabled = false);
        if (hint) { hint.hidden = false; hint.textContent = successMsg; }
        f.reset();
      }, 900);
    });
  }
  handleForm('contactForm', 'Gracias. Te contactaremos pronto.');
  handleForm('newsletterForm', '¡Listo! Revisa tu correo para confirmar.');

  /* =========================
     Hook “Mapa de Valor”
     ========================= */
  window.addEventListener('DOMContentLoaded', () => {
    const vm = $('#valueMap');
    if (vm) {
      vm.setAttribute('data-ready', 'true');
      // Ejemplo: placeholder simple
      // (Reemplaza por tu render real)
      if (!vm.childElementCount) {
        const ph = document.createElement('div');
        ph.style.cssText = 'height:160px;border:1px dashed #B8DCE9;border-radius:10px;display:grid;place-items:center;color:#30667D;background:#F3FBFF';
        ph.textContent = 'Mapa de Valor — próximamente';
        vm.appendChild(ph);
      }
    }
  });

})();
