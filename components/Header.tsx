import Image from 'next/image';
import Link from 'next/link';
import { navigation, site, telHref, whatsappHref } from '@/lib/content';
import { Icon } from './Icon';
import { MobileNav } from './MobileNav';

// Menu order follows the WordPress "Primary Menu", with Services/Areas moved forward for scanning.
const ORDER = ['/', '/services/', '/service-areas/', '/about-us/', '/blogs/', '/faq/', '/contact/'];
export const primaryNav = [...navigation.primary].sort((a, b) => ORDER.indexOf(a.href) - ORDER.indexOf(b.href));

export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5" aria-label={`${site.name} – home`}>
      <Image src="/brand/mark.png" alt="" width={44} height={44} className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" priority />
      <span className="min-w-0 leading-none">
        <span className={`block truncate font-display text-[0.95rem] font-extrabold tracking-tight min-[380px]:text-[1.05rem] sm:text-lg ${invert ? 'text-white' : 'text-ink-900'}`}>
          JunkRemoval<span className="text-brand-500">Garbage</span>
        </span>
        <span className={`mt-1 block truncate text-[0.6rem] font-semibold tracking-[0.18em] uppercase sm:text-[0.65rem] sm:tracking-[0.22em] ${invert ? 'text-ink-300' : 'text-ink-400'}`}>
          Shanan Junk Removal
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="hidden bg-ink-900 text-ink-200 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p>Same-day junk removal across Dubai · Free quotes</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Icon name="mail" className="h-3.5 w-3.5" /> {site.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="pin" className="h-3.5 w-3.5" /> Al Quoz 4, Dubai
            </span>
          </div>
        </div>
      </div>
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-3 sm:gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                >
                  {item.label === 'Our Services' ? 'Services' : item.label}
                  {item.children.length > 0 && <Icon name="chevronDown" className="h-3.5 w-3.5 text-ink-400 transition-transform group-hover:rotate-180" />}
                </Link>
                {item.children.length > 0 && (
                  <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="card w-72 p-2 shadow-xl shadow-ink-900/10">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-xl px-3.5 py-2.5 text-sm text-ink-700 hover:bg-brand-50 hover:text-brand-700">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={telHref} className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            <Icon name="phone" className="h-4 w-4" />
            {site.phone}
          </a>
          <MobileNav items={primaryNav} phone={site.phone} telHref={telHref} whatsappHref={whatsappHref()} />
        </div>
      </div>
    </header>
  );
}
