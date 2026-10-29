// Zoho CRM Leads via the REST API with a self-client refresh token (11 §4a).
// Credentials come only from server environment variables; never from the repository.
import type { Inquiry } from './inquiry';

export type ZohoConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string; // e.g. https://accounts.zoho.com (.eu / .in / .com.au must match the account's data centre)
  apiUrl: string; // e.g. https://www.zohoapis.com
  apiVersion: string; // e.g. v8
  leadSource?: string; // a value that exists in the Lead_Source picklist, e.g. "Website"
  areaField?: string; // API name of a custom picklist/text field for Area of interest
  consentField?: string; // API name of a custom boolean field for privacy consent
};

export function zohoConfigFromEnv(env: Record<string, string | undefined>): ZohoConfig | undefined {
  if (!env.ZOHO_CLIENT_ID || !env.ZOHO_CLIENT_SECRET || !env.ZOHO_REFRESH_TOKEN) return undefined;
  return {
    clientId: env.ZOHO_CLIENT_ID,
    clientSecret: env.ZOHO_CLIENT_SECRET,
    refreshToken: env.ZOHO_REFRESH_TOKEN,
    accountsUrl: (env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com').replace(/\/$/, ''),
    apiUrl: (env.ZOHO_API_URL || 'https://www.zohoapis.com').replace(/\/$/, ''),
    apiVersion: env.ZOHO_API_VERSION || 'v8',
    leadSource: env.ZOHO_LEAD_SOURCE || undefined,
    areaField: env.ZOHO_FIELD_AREA || undefined,
    consentField: env.ZOHO_FIELD_CONSENT || undefined,
  };
}

let cached: { token: string; expires: number } | undefined;

async function accessToken(cfg: ZohoConfig, fetchFn: typeof fetch): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const res = await fetchFn(`${cfg.accountsUrl}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ refresh_token: cfg.refreshToken, client_id: cfg.clientId, client_secret: cfg.clientSecret, grant_type: 'refresh_token' }),
  });
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string };
  if (!res.ok || !json.access_token) throw new Error(`zoho-token:${res.status}:${json.error ?? 'no-token'}`);
  cached = { token: json.access_token, expires: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return cached.token;
}

export function leadRecord(cfg: ZohoConfig, i: Inquiry): Record<string, unknown> {
  const description = [
    i.message,
    '',
    `Area of interest: ${i.area}`,
    i.source ? `How they heard about us: ${i.source}` : '',
    `Privacy consent given: ${i.consentAt}`,
    'Submitted via techtranspire.com contact form',
  ].filter((l, n) => l || n === 1).join('\n');
  return {
    Last_Name: i.lastName,
    ...(i.firstName ? { First_Name: i.firstName } : {}),
    Company: i.company,
    Email: i.email,
    ...(i.phone ? { Phone: i.phone } : {}),
    Description: description,
    ...(cfg.leadSource ? { Lead_Source: cfg.leadSource } : {}),
    ...(cfg.areaField ? { [cfg.areaField]: i.area } : {}),
    ...(cfg.consentField ? { [cfg.consentField]: true } : {}),
  };
}

export async function createLead(cfg: ZohoConfig, i: Inquiry, fetchFn: typeof fetch = fetch): Promise<string> {
  const token = await accessToken(cfg, fetchFn);
  const res = await fetchFn(`${cfg.apiUrl}/crm/${cfg.apiVersion}/Leads`, {
    method: 'POST',
    headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [leadRecord(cfg, i)], trigger: ['workflow'] }),
  });
  const json = (await res.json().catch(() => ({}))) as { data?: { status?: string; code?: string; details?: { id?: string } }[] };
  const row = json.data?.[0];
  if (!res.ok || row?.status !== 'success' || !row.details?.id) throw new Error(`zoho-lead:${res.status}:${row?.code ?? 'unknown'}`);
  return row.details.id;
}

/** For tests: clear the cached access token. */
export const resetZohoToken = () => { cached = undefined; };
