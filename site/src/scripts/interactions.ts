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

/* ---------- Site search ----------
 * The header's search icon (or "/" and Ctrl/⌘+K) opens a dialog listing every page and article in
 * this build (rendered by Header.astro). Typing filters it: every word must match. Enter opens
 * the first result; Escape, the Esc button or a click outside closes it. */
function siteSearch() {
  const btn = document.querySelector<HTMLButtonElement>('.search-btn');
  const dlg = document.getElementById('site-search') as HTMLDialogElement | null;
  const input = dlg?.querySelector<HTMLInputElement>('#search-q');
  const items = dlg ? [...dlg.querySelectorAll<HTMLLIElement>('#search-results li')] : [];
  const empty = dlg?.querySelector<HTMLElement>('.search-empty');
  if (!btn || !dlg || !input || !empty || typeof dlg.showModal !== 'function') return;
  const filter = () => {
    const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    items.forEach((li) => {
      const hit = words.length ? words.every((w) => li.dataset.k!.includes(w)) : li.hasAttribute('data-page');
      li.hidden = !hit;
      if (hit) shown++;
    });
    empty.textContent = shown ? '' : `No results for “${input.value.trim()}”.`;
  };
  const open = () => { if (!dlg.open) { dlg.showModal(); input.select(); filter(); } };
  on(btn, 'click', open);
  on(input, 'input', filter);
  on(input, 'keydown', (e: KeyboardEvent) => {
    // A search field's own Escape only clears the text; here it closes the dialog.
    if (e.key === 'Escape') { e.preventDefault(); dlg.close(); return; }
    if (e.key !== 'Enter') return;
    e.preventDefault();
    items.find((li) => !li.hidden)?.querySelector('a')?.click();
  });
  on(dlg, 'click', (e: MouseEvent) => { if (e.target === dlg || (e.target as Element).closest('.search-close')) dlg.close(); });
  on(dlg, 'close', () => btn.focus());
  on(document, 'keydown', (e: KeyboardEvent) => {
    const typing = e.target instanceof HTMLElement && e.target.matches('input, textarea, select, [contenteditable]');
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); open(); }
  });
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

/* ---------- Count-up: a result figure ("63%", "$89M", "7 yrs") counts from 0 every time it
   comes into view (company request 2026-11-01). The final text is in the HTML; it is only
   swapped while the count runs, and a new entry restarts a count already running. ---------- */
function countUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (reduced() || !('IntersectionObserver' in window)) return;
  const runs = new WeakMap<Element, number>();
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const el = en.target as HTMLElement;
      const final = el.dataset.count ?? '';
      if (!en.isIntersecting) { runs.set(el, (runs.get(el) ?? 0) + 1); el.textContent = final; continue; }
      const m = final.match(/^(\D*)(\d+)(.*)$/);
      if (!m) continue;
      const [, pre, num, post] = m;
      const to = Number(num);
      const run = (runs.get(el) ?? 0) + 1;
      runs.set(el, run);
      const t0 = performance.now() + 250;
      const step = (now: number) => {
        if (runs.get(el) !== run || page?.signal.aborted) return;
        const p = Math.min(1, Math.max(0, (now - t0) / 1400));
        el.textContent = `${pre}${Math.round(to * (1 - Math.pow(1 - p, 3)))}${post}`;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = final;
      };
      el.textContent = `${pre}0${post}`;
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
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

/** Hero method story: the three floating chips are linked by circuit-style traces drawn from
 *  their measured positions every frame while the hero is on screen, so the traces stay attached
 *  as the chips float (pointer depth, scroll, resize). On load the story plays once and rests:
 *  s1 chip 01 on → s2 trace to 04 draws → s3 chip 04 on → s4 trace to 05 draws → s5 chip 05
 *  completes with a check. Then a light travels the full route (01 → 04 → 05) on a loop.
 *  Hovering a chip highlights it and its traces. */
type Pt = [number, number];
const f1 = (n: number) => n.toFixed(1);
const trace = (pts: Pt[], r = 14) => pts.reduce((d, [x, y], i) => {
  if (i === 0) return `M${f1(x)} ${f1(y)}`;
  if (i === pts.length - 1) return `${d} L${f1(x)} ${f1(y)}`;
  const [px, py] = pts[i - 1];
  const [nx, ny] = pts[i + 1];
  const k = Math.min(r, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
  const ux = Math.sign(x - px), uy = Math.sign(y - py), vx = Math.sign(nx - x), vy = Math.sign(ny - y);
  return `${d} L${f1(x - ux * k)} ${f1(y - uy * k)} Q${f1(x)} ${f1(y)} ${f1(x + vx * k)} ${f1(y + vy * k)}`;
}, '');
// Arrowhead with its tip at (x, y), pointing along dir (+1 right, -1 left).
const arrow = (x: number, y: number, dir: number) => `M${f1(x)} ${f1(y)} L${f1(x - dir * 8)} ${f1(y - 4.5)} L${f1(x - dir * 8)} ${f1(y + 4.5)} Z`;
function heroFlow() {
  const wrap = document.querySelector<HTMLElement>('.hero-chips');
  const svg = wrap?.querySelector<SVGSVGElement>('.hero-flow');
  const chips = wrap ? [...wrap.querySelectorAll<HTMLElement>('.chip-float')] : [];
  if (!wrap || !svg || chips.length < 3 || getComputedStyle(wrap).display === 'none') return;
  const q = <T extends Element>(sel: string, leg: number) => svg.querySelector<T>(`${sel}[data-leg="${leg}"]`)!;
  let last = '';
  const draw = () => {
    const o = wrap.getBoundingClientRect();
    const [a, b, c] = chips.map((el) => { const r = el.getBoundingClientRect(); return { l: r.left - o.left, r: r.right - o.left, b: r.bottom - o.top, cy: r.top - o.top + r.height / 2 }; });
    // Leg 0: out of chip 01's right edge, across, down, into chip 04's left edge.
    const midX = b.l > a.r + 40 ? (a.r + b.l) / 2 : a.r + 24;
    const s0: Pt = [a.r + 6, a.cy];
    const leg0 = trace([s0, [midX, a.cy], [midX, b.cy], [b.l - 11, b.cy]]);
    // Leg 1: down from under chip 04, across into chip 05's right edge.
    const downX = Math.max(b.l + 26, c.r + 40);
    const s1: Pt = [downX, b.b + 6];
    const leg1 = trace([s1, [downX, c.cy], [c.r + 11, c.cy]]);
    const key = leg0 + leg1;
    if (key === last) return;
    last = key;
    svg.setAttribute('viewBox', `0 0 ${f1(o.width)} ${f1(o.height)}`);
    [leg0, leg1].forEach((d, i) => svg.querySelectorAll(`.flow-base[data-leg="${i}"], .flow-pulse[data-leg="${i}"]`).forEach((el) => el.setAttribute('d', d)));
    q<SVGPathElement>('.flow-arrow', 0).setAttribute('d', arrow(b.l - 3, b.cy, 1));
    q<SVGPathElement>('.flow-arrow', 1).setAttribute('d', arrow(c.r + 3, c.cy, -1));
    [s0, s1].forEach(([x, y], i) => { const dot = q<SVGCircleElement>('.flow-dot', i); dot.setAttribute('cx', f1(x)); dot.setAttribute('cy', f1(y)); });
  };
  draw();
  const steps = ['s1', 's2', 's3', 's4', 's5'];
  if (reduced()) { wrap.classList.add(...steps); return; }
  // The story: plays once per page view, then rests.
  const timers = [1700, 1950, 2900, 3150, 4100].map((ms, i) => setTimeout(() => wrap.classList.add(steps[i]), ms));
  // Hover: highlight a chip and the traces it touches (01 → leg 0, 04 → both, 05 → leg 1).
  const touches = [[0], [0, 1], [1]];
  chips.forEach((chip, i) => {
    on(chip, 'pointerenter', () => { wrap.dataset.hot = touches[i].join(' '); chip.classList.add('is-hot'); });
    on(chip, 'pointerleave', () => { delete wrap.dataset.hot; chip.classList.remove('is-hot'); });
  });
  let frame = 0;
  let live = true;
  const loop = () => { if (live) draw(); frame = requestAnimationFrame(loop); };
  frame = requestAnimationFrame(loop);
  const io = new IntersectionObserver(([en]) => { live = en.isIntersecting; }, { rootMargin: '80px' });
  io.observe(wrap);
  observers.push(io);
  page!.signal.addEventListener('abort', () => { cancelAnimationFrame(frame); timers.forEach(clearTimeout); });
}

/** Hero liquid glass (desktop): a WebGL2 canvas over the hero photo redraws it with the three
 *  floating chips as refracting glass (vendor/liquid-glass.js, loaded only here). The canvas sits
 *  in .hero-media, so it shares the photo's box, mask, parallax and entrance; it shows once the
 *  photo is uploaded, and the chips turn to glass after their entrance has played. Without WebGL2
 *  the engine returns null and the chips keep their frosted CSS look. */
function heroGlass() {
  const canvas = document.querySelector<HTMLCanvasElement>('.hero-glass');
  const img = canvas?.parentElement?.querySelector('img');
  const chips = [...document.querySelectorAll<HTMLElement>('.hero-chips .chip-float')];
  if (!canvas || !img || !chips.length || getComputedStyle(canvas).display === 'none') return;
  const signal = page!.signal;
  // UMD file: the build wraps it as a CommonJS default export; served raw it sets a global.
  import('../vendor/liquid-glass.js').then((mod: any) => {
    const LG = mod?.default?.create ? mod.default : (globalThis as any).LiquidGlass;
    if (signal.aborted || !LG?.isSupported()) return;
    // Same crop as the <img>: object-fit cover at its object-position.
    const pos = getComputedStyle(img).objectPosition.split(' ').map((v) => (parseFloat(v) || 50) / 100);
    const glass = LG.create(canvas, {
      background: img,
      position: [pos[0], pos[1] ?? 0.5],
      backgroundColor: '#fff',
      maxDpr: 1.5,
      params: {
        thickness: 10, refraction: 0.05, dispersion: 5, blur: 6, tint: [255, 255, 255, 0.42],
        // No engine shadow: it darkens a ridge inside the glass. The chips keep their CSS drop shadow.
        fresnelStrength: 28, glareStrength: 70, shadowStrength: 0,
      },
      onError: (e: unknown) => console.warn('[hero glass]', e),
    });
    if (!glass) return;
    glass.ready.then(() => canvas.classList.add('is-ready'), () => glass.destroy());
    Promise.all(chips.flatMap((el) => el.getAnimations().map((a) => a.finished))).then(() => {
      if (!signal.aborted) glass.setShapes(chips.map((element) => ({ element })));
    }, () => {});
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? glass.resume() : glass.pause()));
    io.observe(canvas);
    observers.push(io);
    signal.addEventListener('abort', () => glass.destroy());
  }, () => {});
}

/** Outcome dock (Home): a gradient highlight glides to the hovered or focused outcome. Once,
 *  after the hero has settled, it sweeps across all four and rests. Desktop pointers only. */
function dockFx() {
  const ul = document.querySelector<HTMLElement>('[data-dock] ul');
  const glider = ul?.querySelector<HTMLElement>('.ob-glider');
  const items = ul ? [...ul.querySelectorAll<HTMLElement>('.ob-item')] : [];
  if (!ul || !glider || !items.length) return;
  let hovering = false;
  let settle = 0;
  const go = (item: HTMLElement | null) => {
    items.forEach((el) => el.classList.toggle('is-active', el === item));
    ul.classList.toggle('is-on', !!item);
    if (!item) return;
    // Liquid: stretch while travelling to a new outcome, then settle.
    if (ul.classList.contains('is-on') && glider.style.getPropertyValue('--x') !== `${item.offsetLeft}px`) {
      glider.classList.add('is-moving');
      clearTimeout(settle);
      settle = window.setTimeout(() => glider.classList.remove('is-moving'), 240);
    }
    glider.style.setProperty('--x', `${item.offsetLeft}px`);
    glider.style.setProperty('--y', `${item.offsetTop}px`);
    glider.style.setProperty('--w', `${item.offsetWidth}px`);
    glider.style.setProperty('--h', `${item.offsetHeight}px`);
  };
  items.forEach((item) => {
    on(item, 'pointerenter', () => { hovering = true; go(item); });
    on(item, 'focusin', () => go(item));
    on(item, 'focusout', () => { if (!hovering) go(null); });
  });
  on(ul, 'pointerleave', () => { hovering = false; go(null); });
  // Welcome sweep: 01 → 04 once, then rest (skipped if the visitor is already pointing at it).
  const timers = items.map((item, i) => setTimeout(() => { if (!hovering) go(item); }, 2600 + i * 420));
  timers.push(setTimeout(() => { if (!hovering) go(null); }, 2600 + items.length * 420 + 300));
  page!.signal.addEventListener('abort', () => timers.forEach(clearTimeout));
}

// No custom cursor: the system cursor is used everywhere (company request, 2026-10-30).

/* ---------- Lifecycle ---------- */
function init() {
  page?.abort();
  observers.splice(0).forEach((o) => o.disconnect());
  page = new AbortController();
  const root = document.documentElement;
  root.classList.add('js');
  header();
  siteSearch();
  mobileMenu();
  splitWords();
  reveals();
  countUp();
  ambient();
  sectionRail();
  readingProgress();
  scrollFx();
  heroFlow();
  heroGlass();
  if (finePointer() && !reduced()) {
    root.classList.add('fx-pointer');
    magnetic();
    tilt();
    glow();
    heroDepth();
    dockFx();
  } else {
    root.classList.remove('fx-pointer');
    if (!reduced()) currentOnScroll();
  }
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => { page?.abort(); observers.splice(0).forEach((o) => o.disconnect()); });
