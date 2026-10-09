'use client';

import { useState } from 'react';
import { Icon, WhatsAppIcon } from '@/components/Icon';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const btn = 'inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-700 transition hover:border-ink-900 hover:text-ink-900';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">Share</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" className={btn}>
        <WhatsAppIcon className="h-4 w-4 text-[#128c4b]" /> WhatsApp
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={btn}>
        Facebook
      </a>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        <Icon name={copied ? 'check' : 'arrowUpRight'} className="h-4 w-4" /> {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
}
