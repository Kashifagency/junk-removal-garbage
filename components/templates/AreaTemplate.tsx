import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { AreasBlock, FeatureGrid, MapEmbed, ServiceGrid, blocksOf } from '@/components/sections';
import { Breadcrumbs, CallButtons, Faq, JsonLd, QuoteSection, SectionHeading } from '@/components/ui';
import { areaName, areaPages, defaultFaq, servicePages, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph, serviceLd } from '@/lib/seo';

export function AreaTemplate({ page, description }: { page: Page; description: string }) {
  const name = areaName(page);
  const hero = blocksOf(page, 'hero')[0];
  const headings = blocksOf(page, 'heading');
  const servicesHeading = headings.find((h) => h.eyebrow === 'Our Services');
  const whyHeading = headings.find((h) => h.eyebrow === 'Why Choose Us');
  const areas = blocksOf(page, 'areas')[0];
  const map = blocksOf(page, 'map')[0];
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas/' },
    { name, path: page.path },
  ];
  // The old slider's sub-title becomes the eyebrow and its title the tagline under the H1.
  const subline = hero?.eyebrow;
  const tagline = hero?.title;

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), serviceLd({ name: `Junk removal in ${name}`, description, path: page.path, area: name }), faqLd(defaultFaq))} />
      <section className="relative isolate overflow-hidden bg-ink-950">
        {hero?.image && <Image src={hero.image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_center] opacity-60" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="container-x py-12 sm:py-16 sm:py-24">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mt-8 !text-brand-300">{subline}</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl">
            Junk removal in <span className="text-brand-400">{name}</span>
          </h1>
          {tagline && <p className="mt-4 text-xl font-semibold text-ink-100">{tagline}</p>}
          {hero?.text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-200">{hero.text}</p>}
          <CallButtons className="mt-8" />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow={servicesHeading?.eyebrow} title={servicesHeading?.title ?? 'Our services'} />
          <div className="mt-8 sm:mt-12">
            <ServiceGrid cards={blocksOf(page, 'card').map((c) => ({ ...c, href: c.href ?? servicePages.find((p) => p.title === c.title)?.path }))} />
          </div>
        </div>
      </section>

      {areas && <AreasBlock block={areas} />}

      <section className="bg-ink-950 py-14 sm:py-20">
        <div className="container-x">
          <p className="eyebrow !text-brand-300">{whyHeading?.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">{whyHeading?.title}</h2>
          <div className="mt-8 sm:mt-12">
            <FeatureGrid features={blocksOf(page, 'feature')} dark />
          </div>
        </div>
      </section>

      {map && <MapEmbed address={map.address.replace(/,?\s*Dubai$/i, '') + ', Dubai'} title={`Serving ${name} and nearby communities`} />}

      <section className="pb-14 sm:pb-20">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Other areas we cover</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {areaPages
              .filter((p) => p.id !== page.id)
              .map((p) => (
                <li key={p.id}>
                  <Link href={p.path} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-200 hover:text-brand-600 hover:ring-brand-400">
                    <Icon name="pin" className="h-3.5 w-3.5 text-brand-500" /> {areaName(p)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <Faq items={defaultFaq} />
      <QuoteSection title={`Get a free quote in ${name}`} defaultArea={name} />
    </>
  );
}
