/**
 * Ellos Design — main.js
 *
 * Módulos:
 *  1. Navbar com efeito frosted-glass no scroll
 *  2. Menu hambúrguer (mobile)
 *  3. Scroll Reveal (IntersectionObserver)
 *  4. Animação de contadores numéricos
 *  5. Link ativo na navbar conforme seção visível
 */

/* ─────────────────────────────────────────────────
   1. NAVBAR — frosted glass ao rolar a página
───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─────────────────────────────────────────────────
   2. MENU HAMBÚRGUER (mobile)
   - Abre/fecha o drawer de navegação
   - Bloqueia o scroll do body quando aberto
   - Fecha ao clicar em qualquer link interno
───────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.m-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─────────────────────────────────────────────────
   3. SCROLL REVEAL
   Observa elementos .reveal e .reveal-stagger,
   adicionando a classe .visible quando entram
   na viewport. Após revelar, deixa de observar
   (one-shot) para economizar recursos.
───────────────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObs.observe(el);
});

/* ─────────────────────────────────────────────────
   4. CONTADOR NUMÉRICO ANIMADO
   Elementos com `data-target` (número alvo) e
   `data-suffix` (ex.: "+", "%") recebem animação
   easeOutQuart com duração de 1400ms.
───────────────────────────────────────────────── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el       = entry.target;
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1400;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  counterObs.observe(el);
});

/* ─────────────────────────────────────────────────
   5. LINK ATIVO NA NAVBAR
   Destaca o link correspondente à seção visível
   enquanto o usuário rola a página.
───────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObs.observe(s));
