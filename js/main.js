// Narrativa con progreso lateral y reveals (sin dependencias)
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Header: opacidad discreta al hacer scroll
  const header = document.querySelector('[data-header]');
  const onScroll = () => {
    if (!header) return;
    header.style.background = window.scrollY > 8 ? 'rgba(39,15,83,.98)' : 'rgba(39,15,83,.96)';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Dots laterales activos por sección
  const dots = $$('#railNav a');
  const sections = ['cap-0','cap-1','cap-2','cap-3','cap-4','cap-5','cap-6','cap-7'].map(id => $('#'+id));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        dots.forEach(d => d.classList.toggle('is-active', d.dataset.section === e.target.id));
      }
    });
  }, { threshold: 0.55 });
  sections.forEach(s => s && obs.observe(s));

  // Reveal al entrar en viewport
  const reveals = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  reveals.forEach(el => io.observe(el));

  // Contadores
  const counters = $$('[data-count]');
  const animate = el => {
    const target = +el.dataset.count;
    const dur = 1100; const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(target * p).toLocaleString('es-PE');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => io2.observe(c));
  }

  // Año footer
  const y = $('#y'); if (y) y.textContent = new Date().getFullYear();

  // Suavizado de anclas
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const t = $(id);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });
})();
