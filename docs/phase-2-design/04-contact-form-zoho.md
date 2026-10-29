# 04 — Contact Form and Zoho CRM Integration

**Status 2026-10-29: implemented and tested with mocks. Not yet connected to the real Zoho account or a mailbox.** The public site is **not launch-ready** until a real submission has been received in Zoho CRM *and* by email (checklist 05, item F-1).

## What exists

| Part | File | State |
|---|---|---|
| Form (D-12 field set, N-09 messages, honeypot, start time, `?interest=` preselect) | `site/src/pages/contact-us.astro` | ✅ Built and browser-tested |
| Server endpoint `POST /api/inquiry` | `site/src/server/inquiry-route.ts` (injected by `astro.config.mjs` in server builds) | ✅ Server-rendered via `@astrojs/node`; everything else stays static. Not present in the static GitHub Pages preview |
| Validation, spam checks, delivery logic | `site/src/server/inquiry.ts` | ✅ Unit-tested |
| Zoho CRM lead creation (OAuth refresh token → access token → `POST /crm/v8/Leads`) | `site/src/server/zoho.ts` | ✅ Unit-tested against a mocked Zoho API |
| Email notification (SMTP, e.g. Zoho Mail) | `site/src/server/mail.ts` | ✅ Message format unit-tested; not yet sent through a real server |
| Secrets | Server environment only; template `site/.env.example` | ✅ Not in the repository or the browser bundle (`.env*` git-ignored) |

## Behaviour (what the visitor sees)

| Situation | Server response | Visitor sees |
|---|---|---|
| Fields invalid | 422 with per-field messages | Inline errors, focus on the first |
| Honeypot filled, or submitted in under 3 s | 200 (silently discarded) | Success (spam bots cannot tell) |
| More than 5 submissions per IP per 10 min | 429 | Failure message |
| **No Zoho or SMTP configured (today)** | **503** | **"Your message didn't go through…" with email and phone. Input kept** |
| Zoho succeeds | 200; email includes the lead link | "Thank you — we have received your message…" |
| Zoho fails, email succeeds | 200; email flagged **NOT IN CRM** | Success (the inquiry was received) |
| Both fail | 502 | Failure message |

Success is shown **only** when the server confirms receipt. The form posts JSON, so cross-site posts are blocked by the browser's CORS preflight (CSRF protection), and Astro's form-origin check does not apply.

## Tests

- `npm test`: **14/14** pass (validation messages, honeypot, timing, rate limit, not-configured 503, CRM-down email fallback, both-fail 502, name split, Zoho token and lead request, Zoho error handling, email subject and referral flag).
- `npm run qa`: in a real browser, a valid submission reaches the server (not blocked) and, with no integration configured, shows the failure message.

## To make it live (owner actions)

1. **Zoho CRM API access.** In the Zoho API Console (data centre of the account, e.g. `api-console.zoho.com`), create a **Self Client** and generate a code with scope `ZohoCRM.modules.leads.CREATE`. Exchange it for a **refresh token**.
2. **Optional fields.** Create custom Lead fields for *Area of interest* (picklist or text) and *Privacy consent* (boolean). Note their API names. Note a valid **Lead Source** picklist value (e.g. "Website").
3. **Mailbox.** An SMTP account allowed to send as the site (e.g. a Zoho Mail app password for `info@techtranspire.com`).
4. **Hosting.** Choose the host (D-16). With Netlify or Vercel, swap the adapter in `astro.config.mjs`. With any Node host, run `node dist-public/server/entry.mjs`.
5. **Set environment variables** on the host from `site/.env.example`: `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_ACCOUNTS_URL`/`ZOHO_API_URL` (match the data centre), optional `ZOHO_LEAD_SOURCE`, `ZOHO_FIELD_AREA`, `ZOHO_FIELD_CONSENT`, `ZOHO_CRM_LEAD_URL`; `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`.
6. **End-to-end test on staging:** submit one inquiry for each area of interest, including *Referral*. Confirm the lead in Zoho (fields, source, consent), the email (subject, reply-to, lead link), and the visitor's success message. Then revoke Zoho temporarily and confirm the "NOT IN CRM" email arrives. Record the results in checklist 05.
7. **Rate limiting.** The in-memory limiter is per server instance. On serverless hosting, add the host's rate limiting or a privacy-respecting challenge (e.g. Cloudflare Turnstile) if spam appears.
