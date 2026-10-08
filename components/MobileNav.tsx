'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { NavItem } from '@/lib/content';
import { Icon, WhatsAppIcon } from './Icon';

/**
 * Full-screen mobile menu. Rendered through a portal into <body> because the sticky header uses
 * backdrop-filter, which would otherwise trap a `position: fixed` panel inside the header box.
 */
export function MobileNav({ items, phone, telHref, whatsappHref }: { items: NavItem[]; phone: string; telHref: string; whatsappHref: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      openButton.current?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const panel = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!open}
      className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
    >
      <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-ink-100 px-4">
        <span className="font-display text-lg font-extrabold text-ink-900">
          JunkRemoval<span className="text-brand-500">Garbage</span>
        </span>
        <button
          ref={closeButton}
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 text-ink-800 hover:bg-ink-50"
        >
          <span className="sr-only">Close menu</span>
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-2">
        <ul className="divide-y divide-ink-100">
          {items.map((item) => (
            <li key={item.href}>
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`block flex-1 py-4 text-[1.05rem] font-semibold ${isActive(item.href) ? 'text-brand-600' : 'text-ink-900'}`}
                >
                  {item.label}
                </Link>
                {item.children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                    aria-expanded={expanded === item.href}
                    aria-controls={`sub-${item.href.replace(/\W/g, '')}`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600"
                  >
                    <span className="sr-only">
                      {expanded === item.href ? 'Hide' : 'Show'} {item.label} pages
                    </span>
                    <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${expanded === item.href ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {item.children.length > 0 && (
                <ul id={`sub-${item.href.replace(/\W/g, '')}`} hidden={expanded !== item.href} className="mb-4 grid gap-1 rounded-2xl bg-ink-50 p-2">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-xl px-3 py-3 text-[0.95rem] ${pathname === c.href ? 'bg-white font-semibold text-brand-600' : 'text-ink-700 hover:bg-white'}`}
                      >
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

      <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-ink-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <a href={telHref} className="btn-primary !px-3">
          <Icon name="phone" className="h-4 w-4" /> Call
        </a>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-3">
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </a>
        <p className="col-span-2 text-center text-sm text-ink-500">{phone}</p>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <a href={telHref} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white sm:hidden" aria-label={`Call ${phone}`}>
        <Icon name="phone" className="h-5 w-5" />
      </a>
      <button
        ref={openButton}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 text-ink-800 hover:bg-ink-50"
      >
        <span className="sr-only">Open menu</span>
        <Icon name="menu" className="h-5 w-5" />
      </button>
      {mounted && createPortal(panel, document.body)}
    </div>
  );
}
