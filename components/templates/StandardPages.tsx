import Image from 'next/image';
import Link from 'next/link';
import { Icon, WhatsAppIcon, iconFromFa } from '@/components/Icon';
import { QuoteForm } from '@/components/QuoteForm';
import { FeatureList, MapEmbed, ServiceIndex, SplitIntro, blocksOf, sectionHas } from '@/components/sections';
import { CallButtons, Faq, ItemsGrid, JsonLd, PageHeader, ProcessSteps, PromiseStrip, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { areaName, areaPages, defaultFaq, site, telHref, whatsappHref, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph } from '@/lib/seo';

const crumbs = (page: Page, name = page.title) => [
  { name: 'Home', path: '/' },
  { name, path: page.path },
];

/* ------------------------------------------------------------------ About */
export function AboutTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page, 'About Us');
  const intro = page.sections.find((s) => sectionHas(s, 'text'));
  const features = blocksOf(areaPages[0], 'feature');
  const photo = blocksOf(page, 'image')[0]?.image;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHeader title="Clearing Dubai’s clutter, responsibly." kicker="About Shanan Junk Removal" intro={description} trail={trail} image={photo} />
      {intro && <SplitIntro section={intro} index="01" />}
      <section className="bg-ink-900 py-16 text-white sm:py-24">
        <div className="container-x">
          <SectionHead index="02" kicker="What we stand for" title="What you can expect from us" invert />
          <div className="mt-12">
            <FeatureList features={features} invert />
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead
            index="03"
            kicker="Services"
            title="What we do"
            action={
              <Link href="/services/" className="link-arrow">
                All services <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-12">
            <ServiceIndex items={services} />
          </div>
        </div>
      </section>
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index="04" kicker="How it works" title="Four simple steps" />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}

/* ------------------------------------------------------------------ Careers */
export function CareersTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  const message = 'Hi, I am interested in working with Shanan Junk Removal.';
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHeader title="Work with us" kicker="Careers" intro={description} trail={trail} />
      <section className="py-16 sm:py-24">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="min-w-0">
            <SectionHead kicker="Opportunities" title="No open vacancies listed right now" />
            <div className="prose-content mt-6">
              <p>
                We provide junk removal, construction waste cleanup and furniture disposal for homes and businesses across Dubai. There are no specific
                vacancies listed on the website at the moment.
              </p>
              <p>
                If you would like to be considered for future opportunities, send us your name, contact number and the type of role you are interested
                in. We will get in touch if a suitable position opens.
              </p>
            </div>
          </div>
          <div className="panel self-start p-7">
            <p className="font-display text-2xl font-extrabold text-ink-900" style={{ fontStretch: '108%' }}>
              Get in touch
            </p>
            <div className="mt-6 grid gap-3">
              <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp
              </a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent('Careers enquiry')}`} className="btn-line">
                <Icon name="mail" className="h-4 w-4" /> Email your details
              </a>
              <a href={telHref} className="btn-line">
                <Icon name="phone" className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ FAQ */
export function FaqTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  const items = blocksOf(page, 'faq')[0]?.items ?? defaultFaq;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(items))} />
      <PageHeader title="Frequently asked questions" kicker="FAQ" intro={description} trail={trail} />
      <Faq items={items} title="Junk removal in Dubai, answered" />
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHead kicker="What we remove" title="If it needs to go, we take it" />
          <div className="mt-12">
            <ItemsGrid />
          </div>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}

/* ------------------------------------------------------------------ Contact */
export function ContactTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page, 'Contact');
  const heading = blocksOf(page, 'heading').find((h) => h.eyebrow);
  const text = blocksOf(page, 'text')[0];
  const info = blocksOf(page, 'feature');
  const hrefFor = (fa: string, value: string) =>
    /phone/.test(fa) ? telHref : /envelope/.test(fa) ? `mailto:${value}` : `https://maps.google.com/?q=${encodeURIComponent('Al Quoz 4, Dubai')}`;
  const titleFor = (fa: string, t: string) => t || (/envelope/.test(fa) ? 'Email us' : '');
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <section className="bg-paper">
        <div className="container-x pt-8 pb-16 sm:pt-10 sm:pb-24">
          <PageHeaderLite trail={trail} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="min-w-0">
              <p className="kicker">{heading?.eyebrow ?? 'Contact us'}</p>
              <h1 className="display-xl mt-5">Let’s clear it out.</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{heading?.text || description}</p>
              {text && <div className="prose-content mt-5 max-w-xl text-base" dangerouslySetInnerHTML={{ __html: text.html }} />}
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {info.map((f) => (
                  <li key={f.text}>
                    <a
                      href={hrefFor(f.icon, f.text)}
                      target={/map/.test(f.icon) ? '_blank' : undefined}
                      rel={/map/.test(f.icon) ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 py-5"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-line transition-colors group-hover:bg-brand-500 group-hover:text-white">
                        <Icon name={iconFromFa(f.icon)} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">{titleFor(f.icon, f.title)}</span>
                        <span className="mt-1 block text-[0.85rem] font-semibold break-all text-ink-900 min-[400px]:text-base">{f.text}</span>
                      </span>
                      <Icon name="arrowUpRight" className="h-5 w-5 shrink-0 text-ink-300 group-hover:text-brand-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div id="quote" className="min-w-0 scroll-mt-24 rounded-[1.5rem] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(24,21,15,0.35)] ring-1 ring-line sm:p-8 lg:self-start">
              <QuoteForm whatsapp={site.whatsapp} phone={site.phone} />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead kicker="Find us" title="Based in Al Quoz, serving all of Dubai" />
          <div className="mt-10">
            <MapEmbed address="Al Quoz 4, Dubai" title="Map of our office in Al Quoz 4, Dubai" />
          </div>
        </div>
      </section>
    </>
  );
}

function PageHeaderLite({ trail }: { trail: { name: string; path: string }[] }) {
  // Breadcrumb only (used where the hero is custom).
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 text-[0.82rem] text-ink-500">
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < trail.length - 1 ? (
              <Link href={t.path} className="hover:text-ink-900">
                {t.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-800">
                {t.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ Service areas */
export function ServiceAreasTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHeader title="Junk removal across Dubai" kicker="Service areas" intro={description} trail={trail}>
        <div className="mt-8 border-t border-line pt-7">
          <PromiseStrip />
        </div>
      </PageHeader>
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areaPages.map((p, i) => {
              const hero = blocksOf(p, 'hero')[0];
              return (
                <li key={p.id}>
                  <Link href={p.path} className="group panel flex h-full flex-col overflow-hidden transition hover:border-ink-900">
                    <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                      {hero?.image && (
                        <Image src={hero.image.src} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                      )}
                      <span className="absolute top-4 left-4 font-display text-sm font-bold text-white/80 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <h2 className="absolute bottom-4 left-4 right-4 font-display text-2xl leading-tight font-extrabold !text-white" style={{ fontStretch: '110%' }}>
                        {areaName(p)}
                      </h2>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {hero && <p className="line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-ink-500">{hero.text}</p>}
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-600">
                        Junk removal in {areaName(p)} <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-(--radius-card) bg-paper p-7 sm:flex-row sm:items-center sm:p-9">
            <p className="max-w-xl font-display text-xl font-bold text-ink-900" style={{ fontStretch: '106%' }}>
              Don’t see your community? We serve all Dubai neighborhoods — contact us to confirm.
            </p>
            <CallButtons />
          </div>
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <MapEmbed address="Dubai, United Arab Emirates" title="Map of Dubai" />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}

/* ------------------------------------------------------------------ Fallback */
export function GenericTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHeader title={page.title} intro={description} trail={trail} />
      {page.sections.map((s, i) => (sectionHas(s, 'text') ? <SplitIntro key={i} section={s} /> : null))}
      <QuoteSection />
    </>
  );
}
