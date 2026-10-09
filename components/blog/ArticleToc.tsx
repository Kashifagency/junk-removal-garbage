'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Table of contents with the current section highlighted while reading. */
export function ArticleToc({ items, variant = 'sidebar' }: { items: TocItem[]; variant?: 'sidebar' | 'inline' }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  let n = 0;
  return (
    <ol className={variant === 'sidebar' ? 'space-y-1 border-l border-line text-[0.86rem]' : 'space-y-2 text-[0.95rem]'}>
      {items.map((t) => {
        const isH2 = t.level === 2;
        if (isH2) n++;
        const isActive = active === t.id;
        return (
          <li key={t.id} className={!isH2 ? (variant === 'sidebar' ? 'pl-4' : 'pl-8') : ''}>
            <a
              href={`#${t.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={
                variant === 'sidebar'
                  ? `-ml-px flex gap-2 border-l-2 py-1.5 pl-4 leading-snug transition-colors ${isActive ? 'border-brand-500 font-semibold text-ink-900' : 'border-transparent text-ink-500 hover:text-ink-900'} ${!isH2 ? 'text-[0.82rem]' : ''}`
                  : `flex gap-3 leading-snug ${isActive ? 'text-ink-900' : 'text-ink-600'} hover:text-brand-700`
              }
            >
              {isH2 && <span className="w-5 shrink-0 text-ink-400 tabular-nums">{String(n).padStart(2, '0')}</span>}
              <span>{t.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
