import Link from 'next/link';
import { services } from '@/lib/catalog';
import { areaName, areaPages, featuredAreaPages, navigation, site, telHref, whatsappHref } from '@/lib/content';
import { Logo } from './Header';
import { Icon, WhatsAppIcon } from './Icon';

export function Footer() {
  const company = [...navigation.footer, { label: 'Our Services', href: '/services/', children: [] }, { label: 'Service Areas', href: '/service-areas/', children: [] }, { label: 'FAQ', href: '/faq/', children: [] }];
  const col = 'font-sans text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase';
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-x pt-16 sm:pt-20">
        <div className="flex flex-col gap-8 border-b border-ink-800 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="display-lg max-w-2xl !text-white">
            Got junk? <span className="text-brand-500">We’ll clear it.</span>
          </p>
          <div className="flex flex-col gap-3 min-[420px]:flex-row">
            <a href={telHref} className="btn-primary">
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-line-light">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-400">
              Junk removal, construction waste cleanup, furniture disposal and garden waste removal for homes and businesses across Dubai.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span>Al Quoz 4, Dubai, United Arab Emirates</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Company">
            <h2 className={col}>Company</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={col}>Services</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.path}>
                  <Link href={s.path} className="hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas">
            <h2 className={col}>Areas</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.95rem] sm:grid-cols-1">
              {featuredAreaPages.map((p) => (
                <li key={p.id}>
                  <Link href={p.path} className="hover:text-white">
                    {areaName(p)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas/" className="font-semibold text-brand-400 hover:text-white">
                  All {areaPages.length} areas →
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-x flex flex-col gap-2 py-6 pb-24 text-xs text-ink-500 sm:flex-row sm:justify-between md:pb-6">
          <p>
            © {new Date().getFullYear()} {site.legalName} Dubai. All rights reserved.
          </p>
          <p className="flex gap-5">
            <Link href="/blog/" className="hover:text-white">
              Blog
            </Link>
            <Link href="/sitemap.xml" prefetch={false} className="hover:text-white">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
