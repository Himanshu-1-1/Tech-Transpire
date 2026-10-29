# 03 — Interaction and Motion System

**2026-10-29.** What was implemented for the premium design brief, where it lives, and how it was tested. Principle: *from complexity to clarity*. Motion starts subtly, reveals relationships, and settles into a clean state. All of it is progressive enhancement: content and controls work without it.

## Tokens (`site/src/styles/global.css`, `:root`)

| Group | Tokens |
|---|---|
| Colour | `--ink` navy text · `--blue` primary · `--blue-bright` / `--sky` accents · `--navy`, `--navy-2`, `--navy-3` dark bands · `--paper`, `--mist`, `--wash` surfaces · `--line`, `--line-strong` dividers |
| Gradients | `--grad-primary`, `--grad-primary-hover` (buttons, reading progress) |
| Shape | `--radius-sm` 4 · `--radius` 6 · `--radius-lg` 12 |
| Depth | `--shadow-sm`, `--shadow`, `--shadow-lg`, `--shadow-btn` |
| Type | `--f-display` Newsreader · `--f-body` Libre Franklin (D-28) |
| Motion | `--t-instant` 120ms · `--t-hover` 200ms · `--t-button` 240ms · `--t-card` 320ms · `--t-reveal` 560ms · `--t-path` 1600ms · `--ease-out` · `--ease-emph` |
| Layout | `--container` 1240 · `--header-h` 80 · gutters with safe-area insets · breakpoints 380 / 520 / 640 / 760 / 900 / 940 / 1000 / 1024 / 1100 |

## Components and effects

| Effect | Where | Implementation | Safeguards |
|---|---|---|---|
| Hero entrance | Home | CSS only: eyebrow fade, headline lines rise through a mask (staggered 110ms), lead and CTAs fade up, photo reveals from a left clip, outcome row last. About 1.1s total | Usable immediately; none under reduced motion |
| Photo blending and parallax | Home hero | Horizontal mask fades the photo into the text area; the photo shifts up to 14px with the pointer; a soft light follows it | Fine pointers only, rAF-throttled, off under reduced motion and on mobile |
| Sticky header | All | Transparent over the Home hero, solid with hairline and shadow after 12px of scroll, compacts 80→68px | No layout jump; passive listener |
| Navigation underline | Header | Draws left→right in `--t-button`; marks the active section (`aria-current`) | Colour change and underline, not colour alone |
| Mobile menu | Header < 940px | Animated clip reveal, staggered items, burger→cross; Escape closes and returns focus; closes on navigation and on widening the window | Real button with `aria-expanded`/`aria-controls`; tested |
| Magnetic CTAs | Hero, header Contact, dark CTA bands, article CTA | Follows the pointer by up to 6px (x) / 3.6px (y); arrow moves a little further; press compresses to 98% | Click target never leaves the pointer; tested clickable |
| Cursor halo | Desktop | Small ring over links; larger soft ring over buttons, chips and method nodes | Native cursor always kept; never over inputs/labels/selects; `pointer-events: none`; off on touch and reduced motion |
| Card spotlight | Problem, component, value, insight, theme and team cards | Radial highlight follows the pointer inside the card; card lifts 4–5px, border turns blue, icon tile flips to blue | Clipped to the card; CSS variables only (no re-render) |
| Image hover | Insight and theme cards, founder and team portraits | 4–5% scale inside the frame; overlay lightens; title turns blue; arrow advances | No excessive zoom |
| Scroll reveals | Sections site-wide | Fade + 16px rise once, siblings staggered 70ms | Content visible without JS and under reduced motion; never replays |
| **Signature method graphic** | Home (navy band) | `MethodPath.astro`: six tangled lines ("Confusion") draw and settle; the main path draws segment by segment through five node buttons; a soft pulse runs along it; the brand chevron appears at "Clarity". Hover/focus/tap on a node or step highlights that step and the path up to it | Steps are real HTML; nodes are focusable buttons; mobile shows a vertical path; final state under reduced motion |
| Concept graphics | Expertise, Healthcare (aligned nodes); Transformation Recovery (stalled path rejoins) | `SystemNodes.astro`, `RecoveryPath.astro`, drawn once on reveal | Decorative (`aria-hidden`); illustrate the method, not client results |
| Ambient line field | Inner page headers (light), dark CTA bands (dark) | `LineField.astro`: dashed lines drift toward the logo chevron, 12s cycle | Slow, masked, off under reduced motion |
| Statement rules, engagement path | Home statements, Expertise path | Rules and the path bar draw left→right on reveal | Static fallback |
| Reading progress | Articles | 3px gradient bar at the top, tracks the article body | Lightweight, passive |
| Form states | Contact | Focus ring, inline errors cleared as the visitor fixes each field, error summary focus, honest failure state | See 04 |

Not used, on purpose: animation libraries, React or other islands, WebGL or canvas, autoplay video, scroll hijacking, count-up numbers (no figure is verified yet). Measured weight per page (public build): **4.0–6.0 KB inline JavaScript (1.5–2.3 KB gzipped)**, one stylesheet of **47.5 KB (10.5 KB gzipped)**, and two Latin font subsets loaded via `unicode-range`.

## Testing performed (2026-10-29)

`npm run qa` against the production server build (`scripts/qa-interactions.mjs`, headless Chrome): **42/42 checks passed**.
- No JavaScript errors and no horizontal overflow on 12 routes at **320px** and **1440px**.
- Mobile menu: opens, Escape closes and returns focus, links navigate.
- Magnetic CTA moves 2.4px with the pointer and stays clickable; the halo appears over buttons and never over form fields (native text cursor kept).
- Method node keyboard focus highlights the step and three path segments.
- Reduced motion: zero hidden elements, pointer effects off.
- Reading progress tracks scroll.
- Contact form: preselection from `?interest=`, inline errors, honest failure (HTTP 503 → failure message, no success).
- API 422 on invalid data; legacy redirects 301.

Two real bugs were found and fixed by these tests:
1. Astro's form-origin check rejected genuine same-site form posts (403). The form now posts JSON, which is also CSRF-safe.
2. Removing an error message on blur shifted the Send button mid-click, so the first click after correcting a field was lost. Errors now clear while typing.

Screenshots at 1440 / 768 / 390: [screenshots/](screenshots/README.md).

## Not yet measured

Lighthouse / Core Web Vitals have not been run (no Lighthouse in this environment). The hero photograph, the expected LCP element, is not yet in the repository. It is preloaded with `fetchpriority="high"` and served responsively (900 / 1400 / 2000w) once added. Run Lighthouse on staging before launch (checklist 04).
