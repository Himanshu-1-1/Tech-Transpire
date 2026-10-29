// Contact backend tests. Run: npm test  (node --test with type stripping; no network, no secrets)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleInquiry, validate, createRateLimiter, type Deps, type Inquiry } from '../src/server/inquiry.ts';
import { createLead, leadRecord, resetZohoToken, type ZohoConfig } from '../src/server/zoho.ts';
import { notification } from '../src/server/mail.ts';

const NOW = Date.UTC(2026, 9, 29, 12, 0, 0);
const good = {
  name: 'Jordan Lee Smith',
  company: 'Example Health',
  email: 'jordan@example.com',
  phone: '+1 (555) 010-2000',
  areaOfInterest: 'recovery',
  message: 'Our ERP rollout has stalled for two quarters and we need a reset.',
  source: 'Referral',
  consent: 'on',
  website: '',
  startedAt: String(NOW - 60_000),
};
const deps = (over: Partial<Deps> = {}): Deps & { calls: string[] } => {
  const calls: string[] = [];
  return {
    calls,
    allow: () => true,
    now: () => NOW,
    log: (e) => calls.push(`log:${e}`),
    createLead: async () => { calls.push('crm'); return 'LEAD123'; },
    sendMail: async (_i, id) => { calls.push(`mail:${id ?? 'none'}`); },
    ...over,
  };
};

test('valid inquiry goes to CRM and email; email carries the lead id', async () => {
  const d = deps();
  const r = await handleInquiry(good, '1.1.1.1', d);
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
  assert.deepEqual(d.calls.filter((c) => !c.startsWith('log')), ['crm', 'mail:LEAD123']);
});

test('validation errors use the N-09 messages and never reach CRM or email', async () => {
  const d = deps();
  const r = await handleInquiry({ ...good, email: 'jordan@', message: 'short', consent: '' }, 'ip', d);
  assert.equal(r.status, 422);
  assert.equal(r.body.errors?.email, "That email address doesn't look complete. Please check it.");
  assert.equal(r.body.errors?.message, 'Please tell us a little more, a sentence or two is enough.');
  assert.equal(r.body.errors?.consent, 'Please confirm you agree to the Privacy Policy so we can respond.');
  assert.ok(!d.calls.includes('crm'));
});

test('unknown area of interest or source is rejected', () => {
  const v = validate({ ...good, areaOfInterest: 'pricing', source: 'TV' }, NOW);
  assert.ok(v.errors?.areaOfInterest && v.errors?.source);
});

test('honeypot submissions are discarded silently', async () => {
  const d = deps();
  const r = await handleInquiry({ ...good, website: 'http://spam.example' }, 'ip', d);
  assert.equal(r.status, 200);
  assert.ok(!d.calls.includes('crm'));
});

test('submissions faster than 3 seconds are discarded silently', async () => {
  const d = deps();
  const r = await handleInquiry({ ...good, startedAt: String(NOW - 1500) }, 'ip', d);
  assert.equal(r.status, 200);
  assert.ok(!d.calls.includes('crm'));
});

test('no integration configured → 503, so the visitor sees the failure state', async () => {
  const r = await handleInquiry(good, 'ip', deps({ createLead: undefined, sendMail: undefined }));
  assert.equal(r.status, 503);
  assert.equal(r.body.ok, false);
});

test('CRM down but email sent → success, email flagged as not in CRM', async () => {
  const d = deps({ createLead: async () => { throw new Error('zoho-lead:500'); } });
  const r = await handleInquiry(good, 'ip', d);
  assert.equal(r.status, 200);
  assert.ok(d.calls.includes('mail:none'));
});

test('CRM and email both fail → 502, never a false success', async () => {
  const r = await handleInquiry(good, 'ip', deps({
    createLead: async () => { throw new Error('x'); },
    sendMail: async () => { throw new Error('y'); },
  }));
  assert.equal(r.status, 502);
  assert.equal(r.body.ok, false);
});

test('rate limiter allows 5 per window per IP', () => {
  let t = 0;
  const allow = createRateLimiter(5, 1000, () => t);
  for (let i = 0; i < 5; i++) assert.equal(allow('a'), true);
  assert.equal(allow('a'), false);
  assert.equal(allow('b'), true);
  t = 1001;
  assert.equal(allow('a'), true);
});

test('names split on the last space; a single word becomes Last_Name', () => {
  assert.equal(validate(good, NOW).data?.lastName, 'Smith');
  assert.equal(validate(good, NOW).data?.firstName, 'Jordan Lee');
  const one = validate({ ...good, name: 'Madonna' }, NOW).data!;
  assert.equal(one.lastName, 'Madonna');
  assert.equal(one.firstName, '');
});

const cfg: ZohoConfig = { clientId: 'id', clientSecret: 'secret', refreshToken: 'rt', accountsUrl: 'https://accounts.zoho.test', apiUrl: 'https://api.zoho.test', apiVersion: 'v8', leadSource: 'Website', areaField: 'Area_of_Interest', consentField: 'Privacy_Consent' };
const inquiry = validate(good, NOW).data as Inquiry;

test('lead record maps the approved fields', () => {
  const rec = leadRecord(cfg, inquiry);
  assert.equal(rec.Last_Name, 'Smith');
  assert.equal(rec.Company, 'Example Health');
  assert.equal(rec.Lead_Source, 'Website');
  assert.equal(rec.Area_of_Interest, 'Recovering a stalled or underperforming initiative');
  assert.equal(rec.Privacy_Consent, true);
  assert.match(String(rec.Description), /Privacy consent given: 2026-10-29T12:00:00.000Z/);
});

test('createLead refreshes the token, posts to Leads and returns the id', async () => {
  resetZohoToken();
  const seen: string[] = [];
  const fake = (async (url: string, init: RequestInit) => {
    seen.push(String(url));
    if (String(url).endsWith('/oauth/v2/token')) return new Response(JSON.stringify({ access_token: 'AT', expires_in: 3600 }));
    assert.equal((init.headers as Record<string, string>).Authorization, 'Zoho-oauthtoken AT');
    return new Response(JSON.stringify({ data: [{ status: 'success', details: { id: '987' } }] }), { status: 201 });
  }) as typeof fetch;
  assert.equal(await createLead(cfg, inquiry, fake), '987');
  assert.deepEqual(seen, ['https://accounts.zoho.test/oauth/v2/token', 'https://api.zoho.test/crm/v8/Leads']);
});

test('createLead throws on a Zoho error so the handler can fall back to email', async () => {
  resetZohoToken();
  const fake = (async (url: string) => String(url).endsWith('/token')
    ? new Response(JSON.stringify({ access_token: 'AT' }))
    : new Response(JSON.stringify({ data: [{ status: 'error', code: 'INVALID_DATA' }] }), { status: 400 })) as typeof fetch;
  await assert.rejects(createLead(cfg, inquiry, fake), /INVALID_DATA/);
});

test('email notification flags referrals and missing CRM records', () => {
  const ref = notification({ ...inquiry, areaKey: 'referral', area: 'Referral or partnership' });
  assert.match(ref.subject, /^\[Referral\] New website inquiry — Referral or partnership — Example Health$/);
  assert.match(ref.text, /NOT IN CRM/);
  assert.match(notification(inquiry, '987', 'https://crm.zoho.com/leads/').text, /https:\/\/crm\.zoho\.com\/leads\/987/);
});
