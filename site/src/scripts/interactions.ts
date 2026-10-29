// Site-wide interaction layer. One module, initialised once per page load.
// Every effect is progressive enhancement: content and controls work without it.
// Pointer effects run only on precise pointers and never under reduced motion.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function rafThrottle<T extends unknown[]>(fn: (...args: T) => void) {
  let frame = 0;
  let last: T;
  return (...args: T) => {
    last = args;
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; fn(...last); });
  };
}

/** Sticky header: transparent over the hero, solid once the page scrolls. */
function header() {
  const el = document.querySelector<HTMLElement>('.site-header');
  if (!el) return;
  const update = () => el.classList.toggle('is-scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
}

/** Mobile menu: disclosure button with animated panel, Escape and link-click to close. */
function mobileMenu() {
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
  const panel = document.getElementById('mobile-nav');
  if (!btn || !panel) return;
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    if (open) { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('is-open')); }
    else {
      panel.classList.remove('is-open');
      const done = () => { if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true; };
      reduced() ? done() : setTimeout(done, 260);
    }
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 940px)').addEventListener('change', (m) => { if (m.matches) set(false); });
}

/** Scroll reveals: run once per element; siblings stagger through --i. */
function reveals() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (reduced() || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  els.forEach((el) => {
    const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : [];
    el.style.setProperty('--i', String(Math.max(0, siblings.indexOf(el))));
  });
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}

/** Magnetic CTAs: the button follows the pointer by a few pixels, its arrow a little further. */
function magnetic() {
  const MAX = 6;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const move = rafThrottle((x: number, y: number) => {
      el.style.setProperty('--mx', `${(x * MAX).toFixed(2)}px`);
      el.style.setProperty('--my', `${(y * MAX * 0.6).toFixed(2)}px`);
    });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      move((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px'); });
  });
}

/** Card spotlight: a soft radial highlight that follows the pointer inside the card. */
function spotlight() {
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    const move = rafThrottle((x: number, y: number) => {
      el.style.setProperty('--sx', `${x}px`);
      el.style.setProperty('--sy', `${y}px`);
    });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      move(e.clientX - r.left, e.clientY - r.top);
    });
  });
}

/** Cursor halo: a small ring that appears over interactive elements only. Never over form fields. */
function cursor() {
  const halo = document.createElement('div');
  halo.className = 'cursor-halo';
  halo.setAttribute('aria-hidden', 'true');
  document.body.append(halo);
  const place = rafThrottle((x: number, y: number) => { halo.style.transform = `translate3d(${x}px, ${y}px, 0)`; });
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    place(e.clientX, e.clientY);
    const t = e.target as HTMLElement;
    const field = t.closest('input, textarea, select, label');
    const button = !field && t.closest('.btn, [data-magnetic], .chip, .method-node');
    const link = !field && !button && t.closest('a, button, [data-spotlight]');
    halo.dataset.state = field ? '' : button ? 'button' : link ? 'link' : '';
  }, { passive: true });
  document.addEventListener('pointerleave', () => { halo.dataset.state = ''; });
}

/** Hero: photograph and light gradient shift a few pixels with the pointer. */
function heroParallax() {
  const hero = document.querySelector<HTMLElement>('[data-parallax]');
  if (!hero) return;
  const move = rafThrottle((x: number, y: number) => {
    hero.style.setProperty('--px', x.toFixed(3));
    hero.style.setProperty('--py', y.toFixed(3));
  });
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    move((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  });
  hero.addEventListener('pointerleave', () => move(0, 0));
}

/** Reading progress for articles. */
function readingProgress() {
  const bar = document.querySelector<HTMLElement>('.reading-progress');
  const article = document.querySelector<HTMLElement>('[data-reading]');
  if (!bar || !article) return;
  const update = () => {
    const r = article.getBoundingClientRect();
    const total = r.height - window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    bar.style.transform = `scaleX(${p.toFixed(4)})`;
  };
  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
  window.addEventListener('resize', rafThrottle(update), { passive: true });
}

let started = false;
function init() {
  if (started) return;
  started = true;
  header();
  mobileMenu();
  reveals();
  readingProgress();
  if (finePointer() && !reduced()) {
    document.documentElement.classList.add('fx-pointer');
    magnetic();
    spotlight();
    cursor();
    heroParallax();
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
