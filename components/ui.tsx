import Image from 'next/image';
import Link from 'next/link';
import { ITEMS, PROMISES, STEPS } from '@/lib/catalog';
import type { FaqItem, ImageRef } from '@/lib/content';
import { areaName, areaPages, site, telHref, whatsappHref } from '@/lib/content';
import { Icon, WhatsAppIcon } from './Icon';
import { QuoteForm } from './QuoteForm';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Breadcrumbs({ trail, invert = false }: { trail: { name: string; path: string }[]; invert?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] ${invert ? 'text-ink-400' : 'text-ink-500'}`}>
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < trail.length - 1 ? (
              <Link href={t.path} className={invert ? 'hover:text-white' : 'hover:text-ink-900'}>
                {t.name}
              </Link>
            ) : (
              <span aria-current="page" className={`line-clamp-1 ${invert ? 'text-ink-200' : 'text-ink-800'}`}>
                {t.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CallButtons({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap ${className}`}>
      <a href={telHref} className={dark ? 'btn-light' : 'btn-dark'}>
        <Icon name="phone" className="h-4 w-4" /> {site.phone}
      </a>
      <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
        <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
      </a>
    </div>
  );
}

/** Section heading with numbered kicker. */
export function SectionHead({
  index,
  kicker,
  title,
  text,
  action,
  invert = false,
  center = false,
  as: As = 'h2',
}: {
  index?: string;
  kicker?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  action?: React.ReactNode;
  invert?: boolean;
  center?: boolean;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`flex flex-col gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-3xl' : 'max-w-3xl'}>
        {kicker && (
          <p className={`kicker ${invert ? '!text-ink-400' : ''}`}>
            {index && <span className="text-brand-500">{index}</span>}
            {index && <span aria-hidden="true" className={`h-px w-8 ${invert ? 'bg-ink-600' : 'bg-ink-300'}`} />}
            {kicker}
          </p>
        )}
        <As className={`display-lg mt-4 ${invert ? '!text-white' : ''}`}>{title}</As>
        {text && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${invert ? 'text-ink-300' : 'text-ink-500'}`}>{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Inner-page header: breadcrumb, big title, intro, optional image and side content. */
export function PageHeader({
  title,
  kicker,
  intro,
  trail,
  image,
  aside,
  children,
}: {
  title: React.ReactNode;
  kicker?: string;
  intro?: string;
  trail: { name: string; path: string }[];
  image?: ImageRef | null;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="container-x pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
        <Breadcrumbs trail={trail} />
        <div className={`mt-8 grid gap-10 sm:mt-12 ${image || aside ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-end' : ''}`}>
          <div>
            {kicker && <p className="kicker">{kicker}</p>}
            <h1 className="display-xl mt-4">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">{intro}</p>}
            {children}
          </div>
          {aside}
          {!aside && image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-card) lg:aspect-[5/4]">
              <Image src={image.src} alt={image.alt || ''} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PromiseStrip({ dark = false }: { dark?: boolean }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:grid-cols-4 ${dark ? 'text-ink-200' : 'text-ink-700'}`}>
      {PROMISES.map((p) => (
        <li key={p} className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
            <Icon name="check" className="h-3 w-3" strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Infinite marquee of service areas. */
export function AreaMarquee() {
  const row = [...areaPages, ...areaPages];
  return (
    <div className="relative overflow-hidden border-y border-ink-800 bg-ink-900 py-4 text-white" aria-label="Areas we serve">
      <ul className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {row.map((p, i) => (
          <li key={i} aria-hidden={i >= areaPages.length} className="flex items-center gap-10 whitespace-nowrap">
            <Link href={p.path} tabIndex={i >= areaPages.length ? -1 : undefined} className="font-display text-lg font-bold tracking-tight hover:text-brand-400" style={{ fontStretch: '110%' }}>
              {areaName(p)}
            </Link>
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-brand-500" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ItemsGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((it) => (
        <li key={it.title} className="group flex gap-4 bg-white p-6 transition-colors hover:bg-paper sm:p-7">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper text-ink-900 transition-colors group-hover:bg-brand-500 group-hover:text-white">
            <Icon name={it.icon} className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span>
            <span className="block font-display text-lg font-bold text-ink-900" style={{ fontStretch: '108%' }}>
              {it.title}
            </span>
            <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink-500">{it.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ProcessSteps({ invert = false }: { invert?: boolean }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {STEPS.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-center gap-4">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 ${invert ? 'border-brand-500 text-brand-400' : 'border-ink-900 text-ink-900'}`}>
              <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.75} />
            </span>
            {i < STEPS.length - 1 && <span aria-hidden="true" className={`hidden h-px flex-1 border-t-2 border-dashed lg:block ${invert ? 'border-ink-700' : 'border-ink-200'}`} />}
          </div>
          <p className={`mt-5 text-xs font-semibold tracking-[0.2em] uppercase ${invert ? 'text-brand-400' : 'text-brand-600'}`}>Step {i + 1}</p>
          <h3 className={`mt-2 text-xl font-bold ${invert ? '!text-white' : ''}`}>{s.title}</h3>
          <p className={`mt-2 leading-relaxed ${invert ? 'text-ink-400' : 'text-ink-500'}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items, title = 'Questions about junk removal in Dubai', index }: { items: FaqItem[]; title?: string; index?: string }) {
  if (!items.length) return null;
  return (
    <section className="py-16 sm:py-24" aria-labelledby="faq-heading">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">
            {index && <span className="text-brand-500">{index}</span>}
            {index && <span aria-hidden="true" className="h-px w-8 bg-ink-300" />}
            FAQ
          </p>
          <h2 id="faq-heading" className="display-lg mt-4">
            {title}
          </h2>
          <p className="mt-5 text-lg text-ink-500">Can’t find your answer? Message us — we usually reply within minutes.</p>
          <CallButtons className="mt-7" />
        </div>
        <div className="border-t border-ink-900">
          {items.map((f, i) => (
            <details key={i} className="group border-b border-line" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer list-none items-start gap-5 py-6 text-left [&::-webkit-details-marker]:hidden">
                <span className="mt-1 text-sm font-semibold text-ink-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-display text-lg leading-snug font-bold text-ink-900 sm:text-xl" style={{ fontStretch: '106%' }}>
                  {f.q}
                </span>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-all group-open:rotate-45 group-open:border-brand-500 group-open:bg-brand-500 group-open:text-white">
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </summary>
              <p className="-mt-1 pr-12 pb-7 pl-10 text-[1.02rem] leading-relaxed text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing contact band — every page ends with this and the contact form (#contact-form). */
export function QuoteSection({ title = 'Get in touch with our team', text, defaultService, defaultArea }: { title?: string; text?: string; defaultService?: string; defaultArea?: string }) {
  return (
    <section id="contact-form" className="scroll-mt-20 bg-ink-900 text-white" aria-labelledby="contact-heading">
      <div className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="min-w-0">
          <p className="kicker !text-ink-400">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> Contact us
          </p>
          <h2 id="contact-heading" className="display-lg mt-4 !text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-300">
            {text ?? 'Fill in the form with what needs removing and our team will contact you. Prefer to talk? Call or WhatsApp us.'}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={telHref} className="group rounded-(--radius-card) border border-ink-700 p-5 transition-colors hover:border-brand-500">
              <Icon name="phone" className="h-5 w-5 text-brand-400" />
              <span className="mt-4 block text-xs tracking-wider text-ink-400 uppercase">Call us</span>
              <span className="mt-1 block font-display text-xl font-bold text-white" style={{ fontStretch: '108%' }}>
                {site.phone}
              </span>
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group rounded-(--radius-card) border border-ink-700 p-5 transition-colors hover:border-whatsapp">
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
              <span className="mt-4 block text-xs tracking-wider text-ink-400 uppercase">WhatsApp</span>
              <span className="mt-1 block font-display text-xl font-bold text-white" style={{ fontStretch: '108%' }}>
                Message us
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="rounded-(--radius-card) border border-ink-700 p-5 transition-colors hover:border-brand-500 sm:col-span-2">
              <span className="flex items-center gap-3">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-brand-400" />
                <span className="min-w-0 text-[0.8rem] font-semibold break-all text-white min-[400px]:text-sm sm:text-base">{site.email}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="min-w-0 rounded-[1.5rem] bg-white p-5 text-ink-800 sm:p-8">
          <QuoteForm whatsapp={site.whatsapp} phone={site.phone} defaultService={defaultService} defaultArea={defaultArea} />
        </div>
      </div>
    </section>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const [head, ...rest] = item.split(/:\s+/);
        return (
          <li key={item} className="flex gap-4 py-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
              <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className="text-[1.02rem] text-ink-700">
              {rest.length ? (
                <>
                  <strong className="font-semibold text-ink-900">{head}</strong> — {rest.join(': ')}
                </>
              ) : (
                <strong className="font-semibold text-ink-900">{item}</strong>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
