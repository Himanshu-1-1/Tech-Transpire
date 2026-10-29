// Site-wide interaction engine (v4). Initialised on every page load, including client-side
// navigations (Astro view transitions); listeners are removed before each swap.
// Everything is progressive enhancement: content and controls work without it.
// Pointer effects run only on precise pointers and never under reduced motion.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let page: AbortController | null = null;
const on = <K extends keyof WindowEventMap>(t: Window | Document | HTMLElement, type: K | string, fn: (e: any) => void, opts: AddEventListenerOptions = {}) =>
  t.addEventListener(type, fn, { ...opts, signal: page!.signal });
const observers: IntersectionObserver[] = [];

function raf<T extends unknown[]>(fn: (...args: T) => void) {
  let frame = 0;
  let last: T;
  return (...args: T) => {
    last = args;
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; fn(...last); });
  };
}

/* ---------- Header ---------- */
function header() {
  const el = document.querySelector<HTMLElement>('.site-header');
  if (!el) return;
  const update = () => el.classList.toggle('is-scrolled', window.scrollY > 12);
  update();
  on(window, 'scroll', raf(update), { passive: true });
}

/* ---------- Mobile menu ---------- */
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
  on(btn, 'click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  on(panel, 'click', (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a')) set(false); });
  on(document, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
}

/* ---------- Split headings into words for a masked rise ---------- */
function splitWords() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-split]:not([data-split-done])').forEach((el) => {
    el.dataset.splitDone = '';
    let n = 0;
    const walk = (node: Node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = (child.textContent ?? '').split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.append(document.createTextNode(p)); return; }
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.textContent = p;
            inner.style.setProperty('--wi', String(n++));
            outer.append(inner);
            frag.append(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && !(child as HTMLElement).classList.contains('flag')) walk(child);
      });
    };
    walk(el);
    el.classList.add('reveal', 'split');
  });
}

/* ---------- Scroll reveals (once) ---------- */
function reveals() {
  const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
  if (reduced() || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  els.forEach((el) => {
    const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : [];
    el.style.setProperty('--i', String(Math.max(0, sibs.indexOf(el))));
  });
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  els.forEach((el) => io.observe(el));
  observers.push(io);
}

/* ---------- Ambient animations pause off-screen ---------- */
function ambient() {
  const els = document.querySelectorAll<HTMLElement>('[data-ambient]');
  // SVG-native (SMIL) motion ignores CSS, so pause it explicitly off-screen and under reduced motion.
  const svgs = (el: Element) => el.querySelectorAll<SVGSVGElement>('svg');
  if (reduced() || !('IntersectionObserver' in window)) { els.forEach((el) => svgs(el).forEach((s) => s.pauseAnimations())); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      (en.target as HTMLElement).classList.toggle('is-live', en.isIntersecting);
      svgs(en.target).forEach((s) => (en.isIntersecting ? s.unpauseAnimations() : s.pauseAnimations()));
    }
  }, { rootMargin: '120px' });
  els.forEach((el) => io.observe(el));
  observers.push(io);
}

/* ---------- Home section rail ---------- */
function sectionRail() {
  const rail = document.querySelector<HTMLElement>('.rail');
  if (!rail) return;
  const links = [...rail.querySelectorAll<HTMLAnchorElement>('a')];
  const targets = links.map((a) => document.querySelector<HTMLElement>(a.hash)).filter(Boolean) as HTMLElement[];
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) {
      links.forEach((a) => a.classList.toggle('is-active', a.hash === `#${en.target.id}`));
      rail.classList.toggle('on-dark', en.target.classList.contains('section--navy') || en.target.classList.contains('cta-band'));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach((t) => io.observe(t));
  observers.push(io);
  const show = () => rail.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  show();
  on(window, 'scroll', raf(show), { passive: true });
}

/* ---------- Reading progress (articles) ---------- */
function readingProgress() {
  const bar = document.querySelector<HTMLElement>('.reading-progress');
  const article = document.querySelector<HTMLElement>('[data-reading]');
  if (!bar || !article) return;
  const update = () => {
    const r = article.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight * 0.6)));
    bar.style.transform = `scaleX(${p.toFixed(4)})`;
  };
  update();
  on(window, 'scroll', raf(update), { passive: true });
}

/* ---------- Scroll-linked motion: page progress, hero exit, image parallax, footer drift ----------
 * Values go into CSS variables; the styles that read them apply only under .fx-scroll,
 * so without JS or under reduced motion nothing moves. */
function scrollFx() {
  const root = document.documentElement;
  const motion = !reduced();
  root.classList.toggle('fx-scroll', motion);
  // Articles keep their own reading bar; every other page tracks the whole document.
  let bar: HTMLElement | null = null;
  if (!document.querySelector('.reading-progress')) {
    bar = document.createElement('div');
    bar.className = 'reading-progress scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.append(bar);
  }
  const hero = document.querySelector<HTMLElement>('.hero');
  const mark = document.querySelector<HTMLElement>('.foot-watermark');
  const footer = mark?.closest<HTMLElement>('.site-footer');
  const live = new Set<HTMLElement>();
  if (motion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) en.isIntersecting ? live.add(en.target as HTMLElement) : live.delete(en.target as HTMLElement);
    }, { rootMargin: '80px' });
    document.querySelectorAll<HTMLElement>('.photo-card .ph, [data-pv]').forEach((el) => io.observe(el));
    observers.push(io);
  }
  const update = () => {
    const vh = window.innerHeight;
    const y = window.scrollY;
    const max = root.scrollHeight - vh;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max).toFixed(4) : 0})`;
    if (!motion) return;
    if (hero) hero.style.setProperty('--hp', Math.min(1, y / Math.max(1, hero.offsetHeight)).toFixed(4));
    live.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--pv', Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh)).toFixed(4)); });
    if (mark && footer) mark.style.setProperty('--dx', `${Math.min(420, Math.max(0, footer.getBoundingClientRect().bottom - vh) * 0.5).toFixed(1)}px`);
  };
  update();
  on(window, 'scroll', raf(update), { passive: true });
  on(window, 'resize', raf(update), { passive: true });
}

/** Touch: no hover, so the card crossing the middle of the screen takes the hover look. */
function currentOnScroll() {
  const els = document.querySelectorAll<HTMLElement>('.challenge .card');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) en.target.classList.toggle('is-current', en.isIntersecting);
  }, { rootMargin: '-44% 0px -44% 0px' });
  els.forEach((el) => io.observe(el));
  observers.push(io);
}

/* ================= Pointer effects (fine pointers, motion allowed) ================= */

/** Magnetic: element follows the pointer a few px; its arrow a little further. */
function magnetic() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const max = Number(el.dataset.magnetic) || 6;
    const set = raf((x: number, y: number) => { el.style.setProperty('--mx', `${(x * max).toFixed(2)}px`); el.style.setProperty('--my', `${(y * max * 0.6).toFixed(2)}px`); });
    on(el, 'pointermove', (e: PointerEvent) => { const r = el.getBoundingClientRect(); set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5); });
    on(el, 'pointerleave', () => set(0, 0));
  });
}

/** Tilt + glare: cards lean toward the pointer (max ~5°) with a light that follows it. */
function tilt() {
  document.querySelectorAll<HTMLElement>('[data-tilt], [data-spotlight]').forEach((el) => {
    const doTilt = el.hasAttribute('data-tilt');
    const set = raf((x: number, y: number, px: number, py: number) => {
      el.style.setProperty('--sx', `${px}px`);
      el.style.setProperty('--sy', `${py}px`);
      if (doTilt) { el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`); el.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`); }
    });
    on(el, 'pointermove', (e: PointerEvent) => { const r = el.getBoundingClientRect(); const px = e.clientX - r.left; const py = e.clientY - r.top; set(px / r.width - 0.5, py / r.height - 0.5, px, py); });
    on(el, 'pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });
}

/** Glow: dark sections get a soft light that follows the pointer. */
function glow() {
  document.querySelectorAll<HTMLElement>('[data-glow]').forEach((el) => {
    const set = raf((x: number, y: number) => { el.style.setProperty('--gx', `${x}px`); el.style.setProperty('--gy', `${y}px`); });
    on(el, 'pointermove', (e: PointerEvent) => { const r = el.getBoundingClientRect(); set(e.clientX - r.left, e.clientY - r.top); });
  });
}

/** Hero depth: photo and floating chips move at different depths with the pointer. */
function heroDepth() {
  const hero = document.querySelector<HTMLElement>('[data-parallax]');
  if (!hero) return;
  const set = raf((x: number, y: number) => { hero.style.setProperty('--px', x.toFixed(3)); hero.style.setProperty('--py', y.toFixed(3)); });
  on(hero, 'pointermove', (e: PointerEvent) => { const r = hero.getBoundingClientRect(); set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5); });
  on(hero, 'pointerleave', () => set(0, 0));
}

/** Cursor: a single dot exactly at the pointer (no trailing ring, at the company's request,
 *  2026-10-30). It grows a little over links and buttons and shrinks on press. Over form
 *  fields it hides and the native text cursor returns. */
let dot: HTMLElement | null = null;
function ensureDot() {
  if (dot && document.body.contains(dot)) return dot;
  dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(dot);
  return dot;
}
function cursorFx() {
  const d = ensureDot();
  document.documentElement.classList.add('fx-cursor');
  on(document, 'pointermove', (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    d.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    const t = e.target as HTMLElement;
    const field = t.closest('input, textarea, select, [contenteditable]');
    const button = !field && t.closest('.btn, [data-magnetic], .chip, .method-node, .menu-btn, button');
    const link = !field && !button && t.closest('a, [data-spotlight], [data-tilt], [data-flip]');
    d.dataset.state = field ? 'field' : button ? 'button' : link ? 'link' : '';
  }, { passive: true });
  on(document, 'pointerdown', () => d.classList.add('is-down'));
  on(document, 'pointerup', () => d.classList.remove('is-down'));
  on(document.documentElement, 'pointerleave', () => { d.dataset.state = 'out'; });
}

/* ---------- Lifecycle ---------- */
function init() {
  page?.abort();
  observers.splice(0).forEach((o) => o.disconnect());
  page = new AbortController();
  const root = document.documentElement;
  root.classList.add('js');
  header();
  mobileMenu();
  splitWords();
  reveals();
  ambient();
  sectionRail();
  readingProgress();
  scrollFx();
  if (finePointer() && !reduced()) {
    root.classList.add('fx-pointer');
    magnetic();
    tilt();
    glow();
    heroDepth();
    cursorFx();
  } else {
    root.classList.remove('fx-pointer', 'fx-cursor');
    if (!reduced()) currentOnScroll();
  }
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => { page?.abort(); observers.splice(0).forEach((o) => o.disconnect()); });
