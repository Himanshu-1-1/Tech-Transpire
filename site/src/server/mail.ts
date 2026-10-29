// Email notification for each inquiry (D-16), sent over SMTP (e.g. Zoho Mail).
import nodemailer from 'nodemailer';
import type { Inquiry } from './inquiry';

export type MailConfig = { host: string; port: number; secure: boolean; user: string; pass: string; from: string; to: string };

export function mailConfigFromEnv(env: Record<string, string | undefined>): MailConfig | undefined {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return undefined;
  const port = Number(env.SMTP_PORT || 465);
  return {
    host: env.SMTP_HOST,
    port,
    secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.MAIL_FROM || env.SMTP_USER,
    to: env.MAIL_TO || 'info@techtranspire.com',
  };
}

export function notification(i: Inquiry, leadId?: string, crmLinkBase?: string) {
  const referral = i.areaKey === 'referral' ? '[Referral] ' : '';
  return {
    subject: `${referral}New website inquiry — ${i.area} — ${i.company}`,
    text: [
      `Name: ${i.name}`,
      `Company: ${i.company}`,
      `Work email: ${i.email}`,
      `Phone: ${i.phone ?? '(not given)'}`,
      `Area of interest: ${i.area}`,
      `How they heard about us: ${i.source ?? '(not given)'}`,
      `Privacy consent: ${i.consentAt}`,
      '',
      i.message,
      '',
      leadId ? `Zoho CRM lead: ${crmLinkBase ? `${crmLinkBase}${leadId}` : leadId}` : 'NOT IN CRM: the Zoho lead could not be created. Please add it manually.',
    ].join('\n'),
  };
}

export function createMailer(cfg: MailConfig, crmLinkBase?: string) {
  const transport = nodemailer.createTransport({ host: cfg.host, port: cfg.port, secure: cfg.secure, auth: { user: cfg.user, pass: cfg.pass } });
  return async (i: Inquiry, leadId?: string) => {
    const { subject, text } = notification(i, leadId, crmLinkBase);
    await transport.sendMail({ from: cfg.from, to: cfg.to, replyTo: `${i.name} <${i.email}>`, subject, text });
  };
}
