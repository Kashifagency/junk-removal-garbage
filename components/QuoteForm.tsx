'use client';

import { useState } from 'react';
import { Icon, WhatsAppIcon } from './Icon';

const SERVICES = [
  'Household junk removal',
  'Construction waste removal',
  'Commercial waste management',
  'Furniture & appliance disposal',
  'Yard & garden waste cleanup',
  'Other',
];

type Status = { kind: 'idle' | 'sending' | 'sent' | 'error'; message?: string };

export function QuoteForm({
  whatsapp,
  phone,
  defaultService,
  defaultArea,
  compact = false,
}: {
  whatsapp: string;
  phone: string;
  defaultService?: string;
  defaultArea?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [service, setService] = useState(defaultService ?? '');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/quote/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(json.message || 'Something went wrong.');
      setStatus({ kind: 'sent', message: json.message });
      form.reset();
      setService('');
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    }
  }

  function sendOnWhatsApp(form: HTMLFormElement | null) {
    const d = form ? Object.fromEntries(new FormData(form).entries()) : {};
    const lines = [
      'Hi, I would like a junk removal quote.',
      d.name && `Name: ${d.name}`,
      d.service && `Service: ${d.service}`,
      d.area && `Area: ${d.area}`,
      d.message && `Details: ${d.message}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex min-h-[20rem] flex-col items-center justify-center p-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold">Request received</h3>
        <p className="mt-2 max-w-sm text-ink-500">
          {status.message || 'Our team will contact you shortly.'} For urgent jobs call {phone}.
        </p>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="link-arrow mt-6">
          Send another request
        </button>
      </div>
    );
  }

  const field =
    'mt-2 block w-full rounded-xl border border-ink-200 bg-white px-4 py-3.5 text-base text-ink-900 placeholder:text-ink-300 transition focus:border-ink-900 focus:ring-4 focus:ring-brand-500/15 focus:outline-none';
  const label = 'block text-sm font-semibold text-ink-800';

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {!compact && (
        <div>
          <p className="font-display text-2xl font-extrabold text-ink-900" style={{ fontStretch: '108%' }}>
            Request a quote
          </p>
          <p className="mt-1 text-sm text-ink-500">Takes under a minute. We reply fast.</p>
        </div>
      )}

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="service" value={s} checked={service === s} onChange={() => setService(s)} className="peer sr-only" />
              <span className="inline-flex min-h-10 items-center rounded-full border border-ink-200 px-4 text-sm font-medium text-ink-700 transition peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/30 hover:border-ink-900">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className={label}>
            Your name <span className="text-brand-600">*</span>
          </label>
          <input id="q-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="q-phone" className={label}>
            Phone / WhatsApp <span className="text-brand-600">*</span>
          </label>
          <input id="q-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="05X XXX XXXX" className={field} />
        </div>
        {!compact && (
          <div>
            <label htmlFor="q-email" className={label}>
              Email <span className="font-normal text-ink-400">(optional)</span>
            </label>
            <input id="q-email" name="email" type="email" autoComplete="email" className={field} />
          </div>
        )}
        <div className={compact ? 'sm:col-span-2' : ''}>
          <label htmlFor="q-area" className={label}>
            Area in Dubai
          </label>
          <input id="q-area" name="area" defaultValue={defaultArea} placeholder="e.g. Dubai Marina" className={field} />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="q-message" className={label}>
            What needs removing?
          </label>
          <textarea id="q-message" name="message" rows={4} placeholder="Items, rough volume, floor & lift access, preferred date…" className={field} />
        </div>
      )}

      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this empty <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <button type="submit" disabled={status.kind === 'sending'} className="btn-primary !min-h-14 text-base disabled:opacity-60">
          {status.kind === 'sending' ? 'Sending…' : 'Get my free quote'}
          <Icon name="arrowRight" className="h-5 w-5" />
        </button>
        <button type="button" onClick={(e) => sendOnWhatsApp(e.currentTarget.form)} className="btn-whatsapp !min-h-14">
          <WhatsAppIcon className="h-4 w-4" /> Via WhatsApp
        </button>
      </div>
      <p className="text-xs text-ink-400">We only use your details to respond to your enquiry.</p>
    </form>
  );
}
