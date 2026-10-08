import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ListSection, SplitIntro, blocksOf, sectionHas } from '@/components/sections';
import { Faq, HowItWorks, JsonLd, PageHero, QuoteSection } from '@/components/ui';
import { defaultFaq, servicePages, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph, serviceLd } from '@/lib/seo';

export function ServiceTemplate({ page, description }: { page: Page; description: string }) {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: page.title, path: page.path },
  ];
  const banner = blocksOf(page, 'banner')[0];
  const intro = page.sections.find((s) => sectionHas(s, 'image') && sectionHas(s, 'text'));
  const listSections = page.sections.filter((s) => sectionHas(s, 'list'));

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), serviceLd({ name: page.title, description, path: page.path }), faqLd(defaultFaq))} />
      <PageHero title={page.title} eyebrow="Service" intro={description} trail={trail} image={blocksOf(page, 'image')[0]?.image ?? banner?.image}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#quote" className="btn-primary">
            Get a free quote <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      {intro && <SplitIntro section={intro} />}
      {listSections.map((s, i) => (
        <ListSection key={i} section={s} tone={i % 2 === 0 ? 'sand' : 'white'} />
      ))}

      <HowItWorks />

      <section className="pb-20">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {servicePages
              .filter((p) => p.id !== page.id)
              .map((p) => (
                <li key={p.id}>
                  <Link href={p.path} className="group flex h-full items-center justify-between gap-3 rounded-2xl px-5 py-4 font-semibold text-ink-800 ring-1 ring-ink-100 hover:text-brand-600 hover:ring-brand-400">
                    {p.title}
                    <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-ink-300 group-hover:text-brand-500" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <Faq items={defaultFaq} />
      <QuoteSection title={`Get a free ${page.title.toLowerCase()} quote`} defaultService={serviceOption(page.title)} />
    </>
  );
}

function serviceOption(title: string) {
  const t = title.toLowerCase();
  if (t.includes('household')) return 'Household junk removal';
  if (t.includes('construction')) return 'Construction waste removal';
  if (t.includes('commercial')) return 'Commercial waste management';
  if (t.includes('furniture')) return 'Furniture & appliance disposal';
  if (t.includes('garden')) return 'Yard & garden waste cleanup';
  return undefined;
}
