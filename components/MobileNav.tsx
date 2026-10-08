'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { NavItem } from '@/lib/content';
import { Icon } from './Icon';

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 text-ink-800 hover:bg-ink-50"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[4.25rem] bottom-0 z-50 overflow-y-auto border-t border-ink-100 bg-white px-4 pt-4 pb-28"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-ink-100">
            {items.map((item) => (
              <li key={item.href} className="py-1">
                <div className="flex items-center justify-between">
                  <Link href={item.href} className="block flex-1 py-3 text-base font-semibold text-ink-900">
                    {item.label}
                  </Link>
                  {item.children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                      aria-expanded={expanded === item.href}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-ink-50"
                    >
                      <span className="sr-only">Show {item.label} pages</span>
                      <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${expanded === item.href ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {item.children.length > 0 && expanded === item.href && (
                  <ul className="mb-3 grid gap-1 rounded-2xl bg-ink-50 p-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block rounded-xl px-3 py-2.5 text-sm text-ink-700 hover:bg-white">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
