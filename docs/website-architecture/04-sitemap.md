# 04 — Proposed Sitemap

Legend
- **[E]** existing page and URL, kept
- **[E→]** existing content, new URL (content previously had no URL, or the URL changes)
- **[N]** new page, with new content that needs approval
- **[C]** conditional — built only if the linked decision is approved
- **P0 / P1 / P2** launch priority (see [13-implementation-roadmap.md](13-implementation-roadmap.md))

Nav labels follow Concept 06: **Home · Expertise · Industries · Insights · About · Contact**.

```
www.techtranspire.com
│
├── /                                   Home                                 [E]  P0   (from /home; /home → 301)
│
├── /services                           Expertise  (nav label)               [E]  P0
│   ├── /services/transformation-recovery   Transformation Recovery          [N][C] P1  D-02
│   └── /services/{future-capability}       reserved pattern; no page until  —    P2  D-02
│                                            content exists
│
├── /industries                         Industries                           [N][C] P1* D-06
│   └── /industries/healthcare              Healthcare                       [N][C] P1* D-06
│                                         (*P0 if D-06 option (a) is approved before launch)
│
├── /insights                           Insights (all)                       [E]  P0
│   ├── /insights/case-studies              Case studies (listing)           [N]  P1  D-17 — lists existing content only
│   ├── /insights/mastering-kaizen-events                                    [E→] P0  TT-INS-001
│   ├── /insights/two-quarters-of-migration-work-cleared-in-a-single-day     [E→] P0  TT-INS-002
│   ├── /insights/seven-year-migration-closed-in-19-hours                    [E→] P0  TT-INS-003
│   ├── /insights/weekend-scrum-to-kanban-migration-across-nine-teams        [E→] P0  TT-INS-004
│   ├── /insights/value-stream-mapping-9-5-hours-of-work-in-208-days         [E→] P0  TT-INS-005
│   ├── /insights/executing-the-wrong-plan                                   [E→] P0  TT-INS-006
│   ├── /insights/the-19-hour-project-rapid-execution                        [E→] P0  TT-INS-007
│   ├── /insights/look-at-the-handoffs-not-the-steps                         [E→] P0  TT-INS-008
│   ├── /insights/decentralized-purchasing-destroys-margins                  [E→] P0  TT-INS-009
│   └── /insights/why-transformation-programs-fail-after-a-strong-start      [E→] P0  TT-INS-010
│
├── /about-us                           About                                [E]  P0
│     (sections: Story · Values · Team · Our Message · Business relationships [N] D-08)
│
├── /contact-us                         Contact                              [E]  P0
│
└── Utility (footer only, not in primary navigation)
    ├── /privacy-policy                 Privacy Policy                       [N]  P0  D-13
    ├── /accessibility                  Accessibility Statement              [N]  P1  D-13
    ├── /terms                          Terms of Use                         [N][C] P1 D-13
    ├── /sitemap.xml                    XML sitemap (machine-readable)       [N]  P0
    ├── /robots.txt                                                          [N]  P0
    └── 404                             Not found                            [N]  P0
```

## Page count at launch

| Scenario | Pages |
|---|---|
| P0 minimum | Home, Expertise, Insights, 10 articles, About, Contact, Privacy, 404 = **17** |
| P0 + P1 (recommended full launch) | + Transformation Recovery, Industries, Healthcare, Case studies listing, Accessibility, Terms = **23** |

Today's site has five pages with URLs. The growth comes almost entirely from giving the ten existing articles their own addresses, plus a few pages where evidence already exists.

## Deliberately not in the sitemap

See [12-gaps-and-decisions.md](12-gaps-and-decisions.md) §6. In summary: no pages for the five brief capability groups, AI & Digital Enablement, the four outcome themes, individual people, FAQs, partners, or non-healthcare industries; no HTML sitemap page (the site is small enough that the footer serves that purpose).

## Reserved URL patterns (for growth without restructuring)

| Pattern | Use when |
|---|---|
| `/services/{slug}` | A capability has its own approved description, at least one supporting insight, and a distinct audience question |
| `/industries/{slug}` | A sector has at least two pieces of approved evidence and an approved description |
| `/insights/{slug}` | Every new article, case study, guide or whitepaper — one flat pattern for all content types |
| `/insights/topics/{slug}` | Only if a topic grows past about eight items (P2) |
| `/about-us/team/{slug}` | Only if profiles expand or author pages are needed (P2) |
