import Image from 'next/image';
import Link from 'next/link';
import type { FaqItem, ImageRef } from '@/lib/content';
import { site, telHref, whatsappHref } from '@/lib/content';
import { Icon, WhatsAppIcon } from './Icon';
import { QuoteForm } from './QuoteForm';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-300">
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevronRight" className="h-3.5 w-3.5 text-ink-500" />}
            {i < trail.length - 1 ? (
              <Link href={t.path} className="hover:text-white">
                {t.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {t.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CallButtons({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={telHref} className="btn-primary">
        <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
      </a>
      <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={light ? 'btn-whatsapp' : 'btn-whatsapp'}>
        <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
      </a>
    </div>
  );
}

/** Dark page header used on inner pages. */
export function PageHero({
  title,
  eyebrow,
  intro,
  trail,
  image,
  children,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  trail: { name: string; path: string }[];
  image?: ImageRef | null;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      {image && (
        <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />
      <div className="container-x py-14 sm:py-20">
        <Breadcrumbs trail={trail} />
        {eyebrow && <p className="eyebrow mt-8 !text-brand-300">{eyebrow}</p>}
        <h1 className={`${eyebrow ? 'mt-3' : 'mt-8'} max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl`}>{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-200">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center = false, as: As = 'h2' }: { eyebrow?: string; title: string; text?: string; center?: boolean; as?: 'h2' | 'h3' }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <As className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">{title}</As>
      {text && <p className="mt-4 text-lg text-ink-500">{text}</p>}
    </div>
  );
}

export function Faq({ items, title = 'Frequently asked questions about junk removal in Dubai', eyebrow = 'FAQ' }: { items: FaqItem[]; title?: string; eyebrow?: string }) {
  if (!items.length) return null;
  return (
    <section className="bg-sand py-14 sm:py-20" aria-labelledby="faq-heading">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-heading" className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-ink-500">Can’t find your answer? Call or message us and we’ll help straight away.</p>
          <CallButtons className="mt-6" />
        </div>
        <div className="space-y-3">
          {items.map((f, i) => (
            <details key={i} className="group card overflow-hidden open:shadow-md" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left font-semibold text-ink-900 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500 transition-transform group-open:rotate-180 group-open:bg-brand-500 group-open:text-white">
                  <Icon name="chevronDown" className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-5 pb-6 leading-relaxed text-ink-600 sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: 'phone' as const, title: 'Call, WhatsApp or send the form', text: 'Tell us what needs to go and where you are in Dubai.' },
  { icon: 'tag' as const, title: 'Get a clear quote', text: 'We quote upfront based on volume, item type and access.' },
  { icon: 'truck' as const, title: 'We load and haul it away', text: 'Our crew does the lifting and leaves the space clean.' },
  { icon: 'leaf' as const, title: 'Responsible disposal', text: 'Items are recycled or donated where possible.' },
];

export function HowItWorks() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="Junk gone in four simple steps" center />
        <ol className="mt-8 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card relative p-6">
              <span className="absolute top-5 right-6 font-display text-5xl font-extrabold text-ink-50">{i + 1}</span>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Contact/quote section — every page ends with this (anchor #quote). */
export function QuoteSection({ title = 'Get a free junk removal quote', text, defaultService, defaultArea }: { title?: string; text?: string; defaultService?: string; defaultArea?: string }) {
  return (
    <section id="quote" className="scroll-mt-24 bg-ink-950 py-14 sm:py-20" aria-labelledby="quote-heading">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0 text-ink-200">
          <p className="eyebrow !text-brand-300">Contact us</p>
          <h2 id="quote-heading" className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-300">
            {text ?? 'Tell us what needs removing and we’ll get back to you with a clear, upfront quote. Prefer to talk? Call or WhatsApp us.'}
          </p>
          <ul className="mt-8 space-y-4">
            <li>
              <a href={telHref} className="group flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-brand-400 ring-1 ring-white/10 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs tracking-wider text-ink-400 uppercase">Call us directly</span>
                  <span className="block text-lg font-semibold text-white">{site.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-whatsapp ring-1 ring-white/10 group-hover:bg-whatsapp group-hover:text-white">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs tracking-wider text-ink-400 uppercase">WhatsApp</span>
                  <span className="block text-lg font-semibold text-white">Send photos for a faster quote</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-brand-400 ring-1 ring-white/10 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs tracking-wider text-ink-400 uppercase">Email</span>
                  <span className="block text-[0.8rem] font-semibold break-all text-white min-[400px]:text-sm sm:text-base">{site.email}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="min-w-0 rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
          <QuoteForm whatsapp={site.whatsapp} phone={site.phone} defaultService={defaultService} defaultArea={defaultArea} />
        </div>
      </div>
    </section>
  );
}

export function Checklist({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => {
        const [head, ...rest] = item.split(/:\s+/);
        return (
          <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink-100">
            <Icon name="checkCircle" className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
            <span className="text-ink-700">
              {rest.length ? (
                <>
                  <strong className="font-semibold text-ink-900">{head}:</strong> {rest.join(': ')}
                </>
              ) : (
                item
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
