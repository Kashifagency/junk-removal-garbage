import { site } from '@/lib/content';

export const runtime = 'nodejs';

// No domain is verified in Resend, so emails are sent from Resend's shared test sender
// (onboarding@resend.dev). In this mode Resend only delivers to the email address the
// Resend account is registered with. So we send to the business email, and if Resend
// replies that only the account owner's address is allowed, we resend to the address
// named in that error.
const QUOTE_TO = site.email;
const QUOTE_FROM = `${site.name} <onboarding@resend.dev>`;

const clean = (v: unknown, max = 2000) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Best-effort rate limit. On Vercel this is per function instance, so it only slows down bursts.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend success for bots.
  if (clean(body.company)) return Response.json({ message: 'Thanks!' });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const service = clean(body.service, 120);
  const area = clean(body.area, 120);
  const page = clean(body.page, 300);
  const message = String(body.message ?? '').trim().slice(0, 4000);

  if (!name || !/^[+\d][\d\s()-]{6,}$/.test(phone)) {
    return Response.json({ message: 'Please enter your name and a valid phone number.' }, { status: 422 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ message: 'Please enter a valid email address.' }, { status: 422 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return Response.json({ message: `Too many requests. Please call or WhatsApp us on ${site.phone}.` }, { status: 429 });
  }

  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) {
    console.error('[quote] RESEND_API_KEY not configured; enquiry not sent', { name, phone, service, area, page });
    return Response.json(
      { message: `Online enquiries are temporarily unavailable. Please call or WhatsApp us on ${site.phone}.` },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '-'],
    ['Service', service || '-'],
    ['Area', area || '-'],
    ['Page', page || '-'],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', 'Message:', message || '-'].join('\n');
  const waLink = `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '971')}`;
  const html = `<h2 style="margin:0 0 12px">New website enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse;font:14px/1.4 sans-serif">
${rows.map(([k, v]) => `<tr><td style="color:#555"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('\n')}
</table>
<p style="font:14px/1.5 sans-serif"><strong>Message:</strong><br>${escapeHtml(message || '-').replace(/\n/g, '<br>')}</p>
<p style="font:14px sans-serif"><a href="tel:${escapeHtml(phone.replace(/\s/g, ''))}">Call customer</a> · <a href="${waLink}">WhatsApp customer</a></p>`;

  // Resend REST API: https://resend.com/docs/api-reference/emails/send-email
  const send = (to: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: QUOTE_FROM,
        to: [to],
        reply_to: email || undefined,
        subject: `New website enquiry: ${service || 'Junk removal'} – ${name}`,
        text,
        html,
      }),
    }).catch((err) => {
      console.error('[quote] Resend request failed', err);
      return null;
    });

  let res = await send(QUOTE_TO);
  if (res && !res.ok) {
    const body = await res.text().catch(() => '');
    // Test mode: "You can only send testing emails to your own email address (owner@example.com)…"
    const owner = body.match(/own email address \(([^)\s]+@[^)\s]+)\)/i)?.[1];
    if (owner && owner.toLowerCase() !== QUOTE_TO.toLowerCase()) {
      res = await send(owner);
      if (res && !res.ok) console.error('[quote] Resend error (owner retry)', res.status, await res.text().catch(() => ''));
    } else {
      console.error('[quote] Resend error', res.status, body);
    }
  }

  if (!res || !res.ok) {
    return Response.json({ message: `We couldn't send your request. Please call or WhatsApp us on ${site.phone}.` }, { status: 502 });
  }

  return Response.json({ message: 'Our team will contact you shortly.' });
}
