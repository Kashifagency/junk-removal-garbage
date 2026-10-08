import Link from 'next/link';
import { Icon, WhatsAppIcon, iconFromFa } from '@/components/Icon';
import { FeatureGrid, MapEmbed, ServiceGrid, SplitIntro, blocksOf, sectionHas } from '@/components/sections';
import { CallButtons, Faq, HowItWorks, JsonLd, PageHero, QuoteSection, SectionHeading } from '@/components/ui';
import { areaName, areaPages, defaultFaq, getPageByPath, site, telHref, whatsappHref, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph } from '@/lib/seo';

const crumbs = (page: Page, name = page.title) => [
  { name: 'Home', path: '/' },
  { name, path: page.path },
];

export function AboutTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page, 'About Us');
  const intro = page.sections.find((s) => sectionHas(s, 'text'));
  const servicesHeading = blocksOf(page, 'heading').find((h) => h.eyebrow === 'Our Services');
  const features = blocksOf(areaPages[0], 'feature');
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHero title="About Shanan Junk Removal" eyebrow="About us" intro={description} trail={trail} image={blocksOf(page, 'banner')[0]?.image} />
      {intro && <SplitIntro section={intro} />}
      <section className="bg-ink-950 py-20">
        <div className="container-x">
          <p className="eyebrow !text-brand-300">Why choose us</p>
          <h2 className="mt-3 max-w-3xl text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">Your reliable junk removal partner in Dubai</h2>
          <div className="mt-12">
            <FeatureGrid features={features} dark />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow={servicesHeading?.eyebrow} title={servicesHeading?.title ?? 'Our services'} />
          <div className="mt-12">
            <ServiceGrid cards={blocksOf(getPageByPath('/services/')!, 'card')} />
          </div>
        </div>
      </section>
      <HowItWorks />
      <QuoteSection />
    </>
  );
}

export function CareersTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  const message = 'Hi, I am interested in working with Shanan Junk Removal.';
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHero title="Careers" eyebrow="Join our team" intro={description} trail={trail} />
      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose-content">
            <h2>Work with Shanan Junk Removal</h2>
            <p>
              We provide junk removal, construction waste cleanup and furniture disposal for homes and businesses across Dubai. There are no specific
              vacancies listed on the website at the moment.
            </p>
            <p>
              If you would like to be considered for future opportunities, send us your name, contact number and the type of role you are interested
              in. We will get in touch if a suitable position opens.
            </p>
          </div>
          <div className="card space-y-4 p-7">
            <p className="font-display text-xl font-bold text-ink-900">Get in touch</p>
            <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp
            </a>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent('Careers enquiry')}`} className="btn-outline w-full">
              <Icon name="mail" className="h-4 w-4" /> Email your details
            </a>
            <a href={telHref} className="btn-outline w-full">
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function FaqTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  const items = blocksOf(page, 'faq')[0]?.items ?? defaultFaq;
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(items))} />
      <PageHero title="Frequently Asked Questions" eyebrow="FAQ" intro={description} trail={trail} image={blocksOf(page, 'banner')[0]?.image} />
      <Faq items={items} title="Junk removal in Dubai: your questions answered" eyebrow="Questions & answers" />
      <QuoteSection />
    </>
  );
}

export function ContactTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page, 'Contact');
  const heading = blocksOf(page, 'heading').find((h) => h.eyebrow);
  const text = blocksOf(page, 'text')[0];
  const info = blocksOf(page, 'feature');
  const hrefFor = (fa: string, value: string) =>
    /phone/.test(fa) ? telHref : /envelope/.test(fa) ? `mailto:${value}` : `https://maps.google.com/?q=${encodeURIComponent('Al Quoz 4, Dubai')}`;
  const titleFor = (fa: string, t: string) => t || (/envelope/.test(fa) ? 'Email Us' : '');
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHero title={heading?.title ?? 'Contact us'} eyebrow={heading?.eyebrow} intro={heading?.text || description} trail={trail} image={blocksOf(page, 'banner')[0]?.image}>
        <CallButtons className="mt-8" />
      </PageHero>
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {text && <div className="prose-content" dangerouslySetInnerHTML={{ __html: text.html }} />}
            <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {info.map((f) => (
                <li key={f.text}>
                  <a href={hrefFor(f.icon, f.text)} target={/map/.test(f.icon) ? '_blank' : undefined} rel={/map/.test(f.icon) ? 'noopener noreferrer' : undefined} className="card flex h-full flex-col gap-3 p-6 hover:ring-2 hover:ring-brand-400">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon name={iconFromFa(f.icon)} className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-ink-400 uppercase">{titleFor(f.icon, f.title)}</span>
                    <span className="font-semibold break-all text-ink-900">{f.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-ink-100">
            <iframe
              title="Map of our office in Al Quoz 4, Dubai"
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Al Quoz 4, Dubai')}&z=13&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0"
            />
          </div>
        </div>
      </section>
      <QuoteSection title="Send us your enquiry" />
    </>
  );
}

export function ServiceAreasTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHero title="Junk removal service areas in Dubai" eyebrow="Service areas" intro={description} trail={trail} image={blocksOf(areaPages[1] ?? page, 'hero')[0]?.image} />
      <section className="py-20">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areaPages.map((p) => {
              const hero = blocksOf(p, 'hero')[0];
              return (
                <li key={p.id}>
                  <Link href={p.path} className="group card flex h-full flex-col p-7 transition-shadow hover:shadow-xl hover:shadow-ink-900/5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon name="pin" className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold">{areaName(p)}</h2>
                    {hero && <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{hero.text}</p>}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Junk removal in {areaName(p)} <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 text-ink-500">
            Don’t see your community? We serve all Dubai neighborhoods —{' '}
            <a href="#quote" className="font-semibold text-brand-600 underline underline-offset-2">
              contact us to confirm service in your area
            </a>
            .
          </p>
        </div>
      </section>
      <MapEmbed address="Dubai, United Arab Emirates" title="Covering all of Dubai" />
      <QuoteSection />
    </>
  );
}

export function GenericTemplate({ page, description }: { page: Page; description: string }) {
  const trail = crumbs(page);
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail))} />
      <PageHero title={page.title} intro={description} trail={trail} />
      {page.sections.map((s, i) => (sectionHas(s, 'text') ? <SplitIntro key={i} section={s} /> : null))}
      <QuoteSection />
    </>
  );
}
