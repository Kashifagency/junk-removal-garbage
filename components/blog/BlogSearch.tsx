'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';

export type SearchItem = { title: string; path: string; excerpt: string; topic: string };

/** Instant client-side search across all article titles and summaries. */
export function BlogSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState('');
  const id = useId();
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return [];
    return items
      .map((it) => {
        const title = it.title.toLowerCase();
        const body = `${it.excerpt} ${it.topic}`.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (title.includes(t)) score += 3;
          else if (body.includes(t)) score += 1;
          else return null;
        }
        return { it, score };
      })
      .filter((x): x is { it: SearchItem; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.it);
  }, [q, items]);

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search articles
      </label>
      <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-white px-5 shadow-sm focus-within:border-ink-900 focus-within:ring-4 focus-within:ring-brand-500/15">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink-400" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id={id}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles — e.g. sofa, construction, office"
          autoComplete="off"
          className="h-14 w-full bg-transparent text-base text-ink-900 placeholder:text-ink-400 focus:outline-none"
        />
      </div>
      {q.trim().length > 1 && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-20px_rgba(24,21,15,0.3)]">
          {results.length ? (
            <ul role="list" className="max-h-[26rem] divide-y divide-line overflow-y-auto">
              {results.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="block px-5 py-4 hover:bg-paper">
                    <span className="block text-xs font-semibold tracking-wider text-brand-600 uppercase">{r.topic}</span>
                    <span className="mt-1 block font-semibold text-ink-900">{r.title}</span>
                    <span className="mt-1 line-clamp-1 block text-sm text-ink-500">{r.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-5 text-sm text-ink-500" role="status">
              No articles match “{q}”. Try another word, or call us — we’re happy to help.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
