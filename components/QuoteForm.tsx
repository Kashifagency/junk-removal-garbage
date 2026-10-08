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

export function QuoteForm({ whatsapp, phone, defaultService, defaultArea }: { whatsapp: string; phone: string; defaultService?: string; defaultArea?: string }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/quote/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, page: window.location.pathname }) });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(json.message || 'Something went wrong.');
      setStatus({ kind: 'sent', message: json.message });
      form.reset();
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
      <div role="status" className="rounded-2xl bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold">Thank you — we’ve received your request</h3>
        <p className="mt-2 text-ink-500">{status.message || 'Our team will contact you shortly.'} For urgent jobs, call {phone}.</p>
      </div>
    );
  }

  const field = 'mt-1.5 block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.95rem] text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none';
  const label = 'block text-sm font-medium text-ink-700';

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
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
        <input id="q-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+971" className={field} />
      </div>
      <div>
        <label htmlFor="q-email" className={label}>
          Email
        </label>
        <input id="q-email" name="email" type="email" autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="q-area" className={label}>
          Area in Dubai
        </label>
        <input id="q-area" name="area" defaultValue={defaultArea} placeholder="e.g. Dubai Marina" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-service" className={label}>
          Service needed
        </label>
        <select id="q-service" name="service" defaultValue={defaultService ?? ''} className={field}>
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-message" className={label}>
          What needs removing?
        </label>
        <textarea id="q-message" name="message" rows={4} placeholder="Items, approximate volume, floor/lift access, preferred date…" className={field} />
      </div>
      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this empty <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status.kind === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
          {status.message}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" disabled={status.kind === 'sending'} className="btn-primary flex-1 !py-3.5 disabled:opacity-60">
          {status.kind === 'sending' ? 'Sending…' : 'Get my free quote'}
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
        <button type="button" onClick={(e) => sendOnWhatsApp(e.currentTarget.form)} className="btn-whatsapp flex-1 !py-3.5">
          <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
        </button>
      </div>
      <p className="text-xs text-ink-400 sm:col-span-2">We only use your details to respond to your enquiry.</p>
    </form>
  );
}
