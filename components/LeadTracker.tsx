'use client';

import { track } from '@vercel/analytics';
import { useEffect } from 'react';

/**
 * Lead tracking: records call and WhatsApp clicks anywhere on the site as Vercel Analytics custom
 * events (`call_click`, `whatsapp_click`), tagged with the page path. Form submissions are tracked
 * in QuoteForm (`form_submit`). View them in Vercel → Analytics → Events.
 */
export function LeadTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      const href = a?.getAttribute('href') ?? '';
      const page = window.location.pathname;
      if (href.startsWith('tel:')) track('call_click', { page });
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track('whatsapp_click', { page });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
