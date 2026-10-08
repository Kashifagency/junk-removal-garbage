import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/catalog';
import { areaName, areaPages, navigation, site, telHref, whatsappHref } from '@/lib/content';
import { Icon } from './Icon';
import { MobileNav } from './MobileNav';

// Menu items follow the WordPress "Primary Menu", reordered for scanning.
const ORDER = ['/', '/services/', '/service-areas/', '/about-us/', '/blogs/', '/faq/', '/contact/'];
const LABELS: Record<string, string> = { '/': 'Home', '/services/': 'Services', '/service-areas/': 'Areas', '/about-us/': 'About', '/blogs/': 'Blog', '/faq/': 'FAQ', '/contact/': 'Contact' };
export const primaryNav = [...navigation.primary]
  .sort((a, b) => ORDER.indexOf(a.href) - ORDER.indexOf(b.href))
  .map((n) => ({ ...n, label: LABELS[n.href] ?? n.label }));

export function Logo({ invert = false, compact = false }: { invert?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5" aria-label={`${site.name} – home`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${invert ? 'bg-white' : 'bg-brand-50'}`}>
        <Image src="/brand/mark.png" alt="" width={32} height={32} className="h-6 w-6 sm:h-7 sm:w-7" priority />
      </span>
      <span className="min-w-0 leading-none">
        <span className={`block truncate font-display text-[0.9rem] font-extrabold tracking-tight min-[400px]:text-[1rem] sm:text-[1.1rem] ${invert ? 'text-white' : 'text-ink-900'}`} style={{ fontStretch: '110%' }}>
          JunkRemoval<span className="text-brand-500">Garbage</span>
        </span>
        {!compact && (
          <span className={`mt-1 block truncate text-[0.62rem] font-medium tracking-[0.2em] uppercase ${invert ? 'text-ink-400' : 'text-ink-500'}`}>
            by Shanan Junk Removal
          </span>
        )}
      </span>
    </Link>
  );
}

function MegaPanel({ children, width = 'w-[44rem]' }: { children: React.ReactNode; width?: string }) {
  return (
    <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className={`${width} rounded-2xl border border-line bg-white p-3 shadow-[0_24px_60px_-20px_rgba(24,21,15,0.25)]`}>{children}</div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {primaryNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link href={item.href} className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.93rem] font-medium text-ink-700 transition-colors hover:text-ink-900">
                  {item.label}
                  {item.children.length > 0 && <Icon name="chevronDown" className="h-3.5 w-3.5 text-ink-400 transition-transform duration-200 group-hover:rotate-180" />}
                </Link>

                {item.href === '/services/' && (
                  <MegaPanel>
                    <div className="grid grid-cols-[1.35fr_1fr] gap-3">
                      <ul className="grid gap-1">
                        {services.map((s) => (
                          <li key={s.path}>
                            <Link href={s.path} className="group/item flex gap-3.5 rounded-xl p-3 transition-colors hover:bg-paper">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover/item:bg-brand-500 group-hover/item:text-white">
                                <Icon name={s.icon} className="h-5 w-5" />
                              </span>
                              <span>
                                <span className="block text-[0.93rem] font-semibold text-ink-900">{s.title}</span>
                                <span className="mt-0.5 line-clamp-1 block text-[0.8rem] text-ink-500">{s.short}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col justify-between rounded-xl bg-ink-900 p-6 text-white">
                        <div>
                          <p className="kicker !text-brand-300">Free quote</p>
                          <p className="mt-3 font-display text-2xl leading-tight font-extrabold" style={{ fontStretch: '110%' }}>
                            Not sure which service you need?
                          </p>
                          <p className="mt-3 text-sm text-ink-300">Send us a photo on WhatsApp and we’ll tell you how we can help.</p>
                        </div>
                        <div className="mt-6 grid gap-2">
                          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !min-h-11">
                            WhatsApp a photo
                          </a>
                          <Link href="/services/" className="btn-line-light !min-h-11">
                            All services
                          </Link>
                        </div>
                      </div>
                    </div>
                  </MegaPanel>
                )}

                {item.href === '/service-areas/' && (
                  <MegaPanel width="w-[34rem]">
                    <p className="kicker px-3 pt-2 pb-3">Areas we cover</p>
                    <ul className="grid grid-cols-2 gap-1">
                      {areaPages.map((p) => (
                        <li key={p.id}>
                          <Link href={p.path} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[0.9rem] text-ink-700 transition-colors hover:bg-paper hover:text-ink-900">
                            <Icon name="pin" className="h-4 w-4 text-brand-500" />
                            {areaName(p)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/service-areas/" className="mt-2 flex items-center justify-between rounded-lg bg-paper px-4 py-3 text-sm font-semibold text-ink-900">
                      All of Dubai — see every area <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                  </MegaPanel>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={telHref} className="hidden items-center gap-2.5 pr-2 xl:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink-900">
              <Icon name="phone" className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.68rem] font-medium tracking-wider text-ink-500 uppercase">Call us</span>
              <span className="block text-sm font-semibold text-ink-900">{site.phone}</span>
            </span>
          </a>
          <Link href="/contact/#quote" className="btn-primary hidden !min-h-11 sm:inline-flex">
            Free quote
          </Link>
          <MobileNav items={primaryNav} phone={site.phone} telHref={telHref} whatsappHref={whatsappHref()} />
        </div>
      </div>
    </header>
  );
}
