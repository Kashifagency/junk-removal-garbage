import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { AreasBlock, FeatureList, MapEmbed, ServiceCards, blocksOf } from '@/components/sections';
import { Breadcrumbs, CallButtons, Faq, JsonLd, PromiseStrip, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { areaName, areaPages, defaultFaq, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph, serviceLd } from '@/lib/seo';

export function AreaTemplate({ page, description }: { page: Page; description: string }) {
  const name = areaName(page);
  const hero = blocksOf(page, 'hero')[0];
  const areas = blocksOf(page, 'areas')[0];
  const map = blocksOf(page, 'map')[0];
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas/' },
    { name, path: page.path },
  ];
  let n = 1;
  const idx = () => String(n++).padStart(2, '0');

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), serviceLd({ name: `Junk removal in ${name}`, description, path: page.path, area: name }), faqLd(defaultFaq))} />

      <section className="relative overflow-hidden bg-paper">
        <div className="container-x pt-8 pb-14 sm:pt-10 lg:pb-20">
          <Breadcrumbs trail={trail} />
          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              {hero?.eyebrow && <p className="kicker">{hero.eyebrow}</p>}
              <h1 className="display-xl mt-5">
                Junk removal in <span className="mark">{name}</span>
              </h1>
              {hero?.title && <p className="mt-6 font-display text-xl font-bold text-ink-800 sm:text-2xl" style={{ fontStretch: '106%' }}>{hero.title}</p>}
              {hero?.text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">{hero.text}</p>}
              <CallButtons className="mt-8" />
            </div>
            {hero?.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image src={hero.image.src} alt="" fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[65%_center]" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink-900 shadow">
                  <Icon name="pin" className="h-4 w-4 text-brand-500" /> {name}, Dubai
                </span>
              </div>
            )}
          </div>
          <div className="mt-12 border-t border-line pt-7">
            <PromiseStrip />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index={idx()} kicker="Services" title={`What we clear in ${name}`} text="Every service is available in your community, for homes and businesses." />
          <div className="mt-12">
            <ServiceCards items={services} />
          </div>
        </div>
      </section>

      {areas && <AreasBlock block={areas} />}

      <section className="bg-ink-900 py-16 text-white sm:py-24">
        <div className="container-x">
          <SectionHead index={idx()} kicker="Why choose us" title="Your reliable junk removal partner" invert />
          <div className="mt-12">
            <FeatureList features={blocksOf(page, 'feature')} invert />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionHead index={idx()} kicker="Location" title={`Serving ${name} and nearby`} />
            <div className="mt-10">{map && <MapEmbed address={`${map.address.replace(/,?\s*Dubai$/i, '')}, Dubai`} title={`Map of ${name}, Dubai`} />}</div>
          </div>
          <div>
            <h2 className="kicker mt-2">Other areas we cover</h2>
            <ul className="mt-6 border-t border-ink-900">
              {areaPages
                .filter((p) => p.id !== page.id)
                .map((p) => (
                  <li key={p.id} className="border-b border-line">
                    <Link href={p.path} className="group flex items-center justify-between py-3.5">
                      <span className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-600" style={{ fontStretch: '106%' }}>
                        {areaName(p)}
                      </span>
                      <Icon name="arrowUpRight" className="h-5 w-5 text-ink-300 group-hover:text-brand-500" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-paper">
        <Faq items={defaultFaq} index={idx()} />
      </div>
      <QuoteSection title={`Contact us in ${name}`} defaultArea={name} />
    </>
  );
}
