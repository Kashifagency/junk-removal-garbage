import Link from 'next/link';
import { areaPages, areaName, navigation, servicePages, site, telHref, whatsappHref } from '@/lib/content';
import { Icon, WhatsAppIcon } from './Icon';
import { Logo } from './Header';

export function Footer() {
  const company = [...navigation.footer, { label: 'Our Services', href: '/services/', children: [] }, { label: 'FAQ', href: '/faq/', children: [] }];
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo invert />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
            Junk removal, construction waste cleanup, furniture disposal and garden waste removal for homes and businesses across Dubai.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telHref} className="btn-primary !px-5 !py-2.5">
              <Icon name="phone" className="h-4 w-4" /> Call now
            </a>
            <a href={whatsappHref()} className="btn-whatsapp !px-5 !py-2.5" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <nav aria-label="Company">
          <h2 className="font-sans text-sm font-semibold tracking-wider text-white uppercase">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
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
          <h2 className="font-sans text-sm font-semibold tracking-wider text-white uppercase">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {servicePages.map((p) => (
              <li key={p.id}>
                <Link href={p.path} className="hover:text-white">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wider text-white uppercase">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={telHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>Al Quoz 4, Dubai, United Arab Emirates</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-8">
          <h2 className="font-sans text-xs font-semibold tracking-wider text-ink-400 uppercase">Areas we serve</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {areaPages.map((p) => (
              <li key={p.id}>
                <Link href={p.path} className="hover:text-white">
                  {areaName(p)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 pb-24 text-xs text-ink-500 sm:flex-row sm:justify-between md:pb-6">
          <p>
            © {new Date().getFullYear()} {site.legalName} Dubai. All rights reserved.
          </p>
          <p>
            <Link href="/sitemap.xml" className="hover:text-white" prefetch={false}>
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
