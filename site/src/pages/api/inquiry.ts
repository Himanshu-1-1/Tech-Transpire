// POST /api/inquiry — server-rendered (needs the server adapter); everything else is static.
import type { APIRoute } from 'astro';
import { handleInquiry, createRateLimiter } from '../../server/inquiry';
import { zohoConfigFromEnv, createLead } from '../../server/zoho';
import { mailConfigFromEnv, createMailer } from '../../server/mail';

export const prerender = false;

const env = process.env;
const zoho = zohoConfigFromEnv(env);
const mail = mailConfigFromEnv(env);
const sendMail = mail ? createMailer(mail, env.ZOHO_CRM_LEAD_URL) : undefined;
const allow = createRateLimiter();

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let fields: Record<string, string> = {};
  try {
    const type = request.headers.get('content-type') ?? '';
    if (type.includes('application/json')) fields = (await request.json()) as Record<string, string>;
    else fields = Object.fromEntries([...(await request.formData()).entries()].map(([k, v]) => [k, String(v)]));
  } catch {
    return Response.json({ ok: false, reason: 'bad-request' }, { status: 400 });
  }

  const result = await handleInquiry(fields, clientAddress ?? 'unknown', {
    createLead: zoho ? (i) => createLead(zoho, i) : undefined,
    sendMail,
    allow,
    now: () => Date.now(),
    // Log outcomes only; never names, emails or messages.
    log: (event, detail) => console.log(`[inquiry] ${event}${detail ? ` ${detail}` : ''}`),
  });
  return Response.json(result.body, { status: result.status, headers: { 'Cache-Control': 'no-store' } });
};

export const ALL: APIRoute = () => Response.json({ ok: false, reason: 'method-not-allowed' }, { status: 405, headers: { Allow: 'POST' } });
