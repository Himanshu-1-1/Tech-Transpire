# Phase 2: UI/UX (Concept 06)

Phase 2 builds on the approved Phase 1 architecture in [../website-architecture/](../website-architecture/). The design adapts to the approved content; content is never rewritten to fit the design.

| Step | Status |
|---|---|
| A. Confirm technical status | ☑ Documentation only at the start of Phase 2 |
| B. Design system + homepage direction | ☑ v1 proposed; **v2 implemented in Astro** after feedback (light only, photography, results band, A/B typography) |
| C. Design approval | ◐ **Concept 06 direction approved conditionally**, pending review of the rendered [screenshots](screenshots/README.md). Typography A vs B to choose. Home not yet final |
| D. Apply design to every template | ◐ **All templates built** in `site/` (Home, Expertise, Transformation Recovery, Industries, Healthcare, Insights, Case studies, Article ×10, About, Contact, Privacy, 404). Final polish after C |
| E. Content migration, navigation, integrations, responsive, accessibility | ◐ Content renders from the Phase 1 data with approved corrections; navigation, breadcrumbs, responsive layouts in place. **Open:** Zoho/email server function, hosting adapter, redirects, analytics |
| F. Testing, SEO, content and launch readiness | ◐ Verbatim content check (545 lines), gating check and overflow check in place. **Open:** link check, redirect tests, accessibility audit, performance budget |

No production deployment happens without explicit authorization.

## Files

| File | Content |
|---|---|
| [01-design-system.md](01-design-system.md) | Design system: v2 changes, tokens, type, layout, components mapped to the block types, accessibility, performance, editorial flags |
| [02-technical-decision-record.md](02-technical-decision-record.md) | Astro architecture, review vs public builds, SEO, Zoho integration design, quality gates, how to run |
| [screenshots/](screenshots/README.md) | Full-page desktop and mobile captures, and the typography comparison with a recommendation |
| [assets/](assets/README.md) | Where company photography goes (two files requested) |
| [prototypes/home.html](prototypes/home.html) | v1 prototype (superseded) |
