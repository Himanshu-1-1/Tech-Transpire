# 17 — Approved Corrections Log

**Exact record of every change made to existing wording.** 2026-10-29.

The source archive is never edited. Corrections are applied at build time by [`site/src/lib/corrections.ts`](../../site/src/lib/corrections.ts), which fails the build unless each "Before" string occurs **exactly once** in its block. This log and that file must always match.

Approval basis:
- **D-11** (2026-10-29): E-01 to E-05 approved. The company confirmed the intended word for E-02 is "busywork".
- **D-24** (2026-10-29): TT-INS-003 publishes without the unverified C-14 sentence (E-09).
- **F-01 to F-07** (2026-10-29): approved *provided they are strictly punctuation, spelling or grammatical corrections that do not change the original meaning*. F-05 and F-06 are **not** punctuation (they are new copy), so this approval does not cover them; see below.

## Applied corrections

| ID | Block | Kind | Before (exact) | After (exact) |
|---|---|---|---|---|
| E-01 | TT-INS-002-B06 | Spelling | `rexactlyan reverting` | `rather than reverting` |
| E-02 | TT-INS-004-B02 | Spelling | `buil9work` | `busywork` |
| E-03 | TT-PG-004-B04 | Capitalization | `Kranthi Architects enterprise-grade` | `Kranthi architects enterprise-grade` |
| E-04a | TT-PG-004-B04 | Spelling | `TechTranspire's financial backbone` | `Tech Transpire's financial backbone` |
| E-04b | TT-INS-010-B10 | Spelling | `CTA: Talk to TechTranspire >` | `CTA: Talk to Tech Transpire >` |
| E-05 | TT-INS-001-B10 / B11 | Formatting | Card title "Poor preparation and no pilot" exported as a section heading after a dangling `process` icon key | Rendered as the fourth card of B10 (icon `process`). No words changed |
| E-09 | TT-INS-003-B06 | Temporary omission | ` Twelve other programs subsequently replicated it.` | *(omitted)*. Restore when C-14 is verified |
| F-01 | TT-PG-001-B02 | Punctuation | `transformation points - moments` | `transformation points, moments` |
| F-02 | TT-PG-001-B03 | Punctuation | `different directions invisible` | `different directions, invisible` |
| F-03a | TT-PG-001-B05 | Punctuation | `understands it not dependent` | `understands it, not dependent` |
| F-03b | TT-PG-001-B05 | Punctuation | `actually delivered then we` | `actually delivered, then we` |
| F-04a | TT-PG-001-B07 | Punctuation | `bring clarity not simply` | `bring clarity, not simply` |
| F-04b | TT-PG-002-B06 | Punctuation | `bring clarity not simply` | `bring clarity, not simply` |
| F-07a | TT-INS-008-B01 | Punctuation | `Handoffs - Not the Steps` | `Handoffs — Not the Steps` |
| F-07b | TT-INS-008-B02 (heading) | Punctuation | `Handoffs - Not the Steps` | `Handoffs — Not the Steps` |
| F-07c | Insights Sheet, TT-INS-008 Title | Punctuation | `Handoffs - Not the Steps` | `Handoffs — Not the Steps` |

**Not changed:** the Microsoft Bookings URL contains `IntroCallwithTechTranspire`. It is a link target, not text, and stays exactly as it is.

### Why commas, not dashes (F-01 to F-04)

The design-review flags suggested dashes. The raw Google Doc export shows the pages' dashes were **deliberately removed** in the source documents: a double space remains where each dash was (for example `deep discovery &nbsp;understanding`, TT-PG-002). An earlier May 2026 draft has the dashes. Re-inserting them would reverse a choice someone made in the source. A comma is the smallest grammatical fix that keeps the meaning, so the page corrections use commas. Articles keep their own em-dash style, so F-07 uses an em dash.

## Not covered by the F approval (still open)

| ID | Item | Why it is not a correction | Status |
|---|---|---|---|
| F-05 | Hero eyebrow | New copy. The prototype's "Business advisory & transformation" is **replaced** by **"Clarity · Alignment · Execution"**, the company's own lockup line from its banner artwork (Drive: BANNERS / "Tech and Strategy in Motion.png"). Needs a yes | 🟦 confirm use |
| F-06 | "What we help you achieve" (Home outcome themes heading) | New copy, from the Concept 06 reference | 🟦 approve with N-02 |

## Found during the build, not applied (candidates for approval)

| ID | Location | Existing wording | Suggested | Kind |
|---|---|---|---|---|
| F-08 | TT-PG-001-B02 | "high-stake transformation points" | "high-stakes transformation points" | Grammar |
| F-09 | TT-PG-001-B01 | "Solving the wrong problem perfectly, is still a failure." | "Solving the wrong problem perfectly is still a failure." | Punctuation (stray comma) |
| F-10 | TT-PG-001-B08 | "Reduction in median implementation time 209 days to 78 in one engagement" | "…implementation time, 209 days to 78, in one engagement" | Punctuation (only shown once C-05 is verified) |
| F-11 | TT-PG-004-B03 / B05 | "We don't treat symptoms we find root causes"; "We don't validate ideas we validate reality"; "independent not dependent on us"; "complete openness especially when" | Commas after "symptoms", "ideas", "independent", "openness" | Punctuation (dash-removal artifacts, same pattern as F-02 to F-04) |
| F-12 | TT-PG-002-B03, B04, B05 | "deep discovery understanding your business model"; "real-world implementation not a slide deck"; "operating independently not when"; "Transformation Blueprint current to future state"; "only when tied to clear outcomes" | Commas at each removed dash | Punctuation (same pattern) |
| F-13 | TT-PG-005-B04 | "If aligned - Clear next steps"; "If not - Honest redirect" | "If aligned: clear next steps"; "If not: honest redirect" | Punctuation and capitalization |
