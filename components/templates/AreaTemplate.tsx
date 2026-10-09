import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { AreasBlock, MapEmbed, PostGrid, blocksOf } from '@/components/sections';
import { Breadcrumbs, CallButtons, Faq, JsonLd, PromiseStrip, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { areaName, areaPages, defaultFaq, guidesFor, localContentFor, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph, serviceLd } from '@/lib/seo';

export function AreaTemplate({ page, description }: { page: Page; description: string }) {
  const name = areaName(page);
  const hero = blocksOf(page, 'hero')[0];
  const areas = blocksOf(page, 'areas')[0];
  const map = blocksOf(page, 'map')[0];
  const local = localContentFor(page.path);
  // Unique per-area FAQ (falls back to the general FAQ only if no local content exists).
  const faq = local?.faq?.length ? local.faq : defaultFaq;
  const features = blocksOf(page, 'feature');
  const guides = guidesFor({ area: page.path });
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas/' },
    { name, path: page.path },
  ];
  let n = 1;
  const idx = () => String(n++).padStart(2, '0');

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), serviceLd({ name: `Junk removal in ${name}`, description, path: page.path, area: name }), faqLd(faq))} />

      <section className="relative overflow-hidden bg-paper">
        <div className="container-x pt-8 pb-14 sm:pt-10 lg:pb-20">
          <Breadcrumbs trail={trail} />
          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              {hero?.eyebrow && <p className="kicker">{hero.eyebrow}</p>}
              <h1 className="display-xl mt-5">
                Junk removal in <span className="mark">{name}</span>
              </h1>
              {hero?.title && (
                <p className="mt-6 font-display text-xl font-bold text-ink-800 sm:text-2xl" style={{ fontStretch: '106%' }}>
                  {hero.title}
                </p>
              )}
              {hero?.text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">{hero.text}</p>}
              <CallButtons className="mt-8" />
            </div>
            {hero?.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image src={hero.image.src} alt={`Junk removal truck serving ${name}, Dubai`} fill loading="eager" fetchPriority="high" sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[65%_center]" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink-900 shadow">
                  <Icon name="pin" className="h-4 w-4 text-brand-600" /> {name}, Dubai
                </span>
              </div>
            )}
          </div>
          <div className="mt-12 border-t border-line pt-7">
            <PromiseStrip />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- unique local content */}
      {local && (
        <section className="py-16 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionHead index={idx()} kicker={`Local guide · ${name}`} title={local.heading} />
              <div className="prose-content mt-6">
                {local.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <h3 className="mt-10 text-xl font-bold">Before collection day in {name}</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {local.tips.map((t) => (
                  <li key={t} className="flex gap-4 py-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[1.02rem] text-ink-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="panel p-7">
                <h3 className="text-lg font-bold">Typical jobs in {name}</h3>
                <ul className="mt-4 space-y-3">
                  {local.jobs.map((j) => (
                    <li key={j} className="flex items-start gap-3 text-ink-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-500" /> {j}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-(--radius-card) bg-ink-900 p-7 text-white">
                <h3 className="text-lg font-bold !text-white">Also serving nearby</h3>
                <p className="mt-2 text-sm text-ink-300">{local.nearby.join(' · ')}</p>
                <a href="#contact-form" className="btn-primary mt-5 w-full">
                  Contact us about {name} <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- services (compact) */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index={idx()} kicker="Services" title={`Services available in ${name}`} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => (
              <li key={s.path}>
                <Link href={s.path} className="group panel flex h-full flex-col p-5 transition hover:border-ink-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-4 font-display text-[1.05rem] leading-snug font-bold text-ink-900" style={{ fontStretch: '106%' }}>
                    {s.title}
                  </span>
                  <Icon name="arrowRight" className="mt-auto h-5 w-5 pt-1 text-ink-500 transition-all group-hover:translate-x-1 group-hover:text-brand-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {areas && <AreasBlock block={areas} />}

      {/* ---------------------------------------------------------- why us (compact) */}
      {features.length > 0 && (
        <section className="bg-ink-900 py-14 text-white sm:py-20">
          <div className="container-x">
            <p className="kicker !text-ink-400">Why choose us</p>
            <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <li key={f.title} className="flex items-center gap-4 border-t border-ink-700 pt-5">
                  <span className="font-display text-2xl font-extrabold text-brand-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-lg font-bold" style={{ fontStretch: '106%' }}>
                    {f.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
                      <span className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-700" style={{ fontStretch: '106%' }}>
                        {areaName(p)}
                      </span>
                      <Icon name="arrowUpRight" className="h-5 w-5 text-ink-500 group-hover:text-brand-600" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-x">
            <SectionHead
              kicker="Guides"
              title={`Helpful guides for ${name}`}
              action={
                <Link href="/blog/" className="link-arrow">
                  All articles <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              }
            />
            <div className="mt-10">
              <PostGrid posts={guides} headingLevel="h3" />
            </div>
          </div>
        </section>
      )}

      <div className="bg-paper">
        <Faq items={faq} index={idx()} title={`Junk removal in ${name}: your questions`} />
      </div>
      <QuoteSection title={`Contact us in ${name}`} defaultArea={name} />
    </>
  );
}
