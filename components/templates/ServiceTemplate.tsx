import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ListSection, SplitIntro, blocksOf, sectionHas } from '@/components/sections';
import { Faq, JsonLd, PageHeader, ProcessSteps, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { defaultFaq, site, telHref, type Page } from '@/lib/content';
import { breadcrumbLd, faqLd, graph, serviceLd } from '@/lib/seo';

export function ServiceTemplate({ page, description }: { page: Page; description: string }) {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: page.title, path: page.path },
  ];
  const intro = page.sections.find((s) => sectionHas(s, 'image') && sectionHas(s, 'text'));
  const listSections = page.sections.filter((s) => sectionHas(s, 'list'));
  const svc = services.find((s) => s.path === page.path);
  const others = services.filter((s) => s.path !== page.path);
  let n = 1;
  const idx = () => String(n++).padStart(2, '0');

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), serviceLd({ name: page.title, description, path: page.path }), faqLd(defaultFaq))} />
      <PageHeader title={page.title} kicker="Service" intro={description} trail={trail} image={svc?.image ?? blocksOf(page, 'image')[0]?.image}>
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
          <a href="#quote" className="btn-primary">
            Get a free quote <Icon name="arrowRight" className="h-4 w-4" />
          </a>
          <a href={telHref} className="btn-line">
            <Icon name="phone" className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </PageHeader>

      {intro && <SplitIntro section={intro} index={idx()} />}
      {listSections.map((s, i) => (
        <ListSection key={i} section={s} index={idx()} tone={i % 2 === 0 ? 'paper' : 'white'} />
      ))}

      <section className="bg-ink-900 py-16 text-white sm:py-24">
        <div className="container-x">
          <SectionHead index={idx()} kicker="How it works" title="Simple from first call to clean space" invert />
          <div className="mt-14">
            <ProcessSteps invert />
          </div>
        </div>
      </section>

      <Faq items={defaultFaq} index={idx()} />

      <section className="border-t border-line bg-paper py-16 sm:py-20">
        <div className="container-x">
          <SectionHead kicker="More services" title="Other ways we can help" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.path}>
                <Link href={s.path} className="group panel flex h-full flex-col p-6 transition hover:border-ink-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-5 font-display text-lg leading-snug font-bold text-ink-900" style={{ fontStretch: '106%' }}>
                    {s.title}
                  </span>
                  <span className="mt-2 line-clamp-2 flex-1 text-sm text-ink-500">{s.short}</span>
                  <Icon name="arrowRight" className="mt-5 h-5 w-5 text-ink-400 transition-all group-hover:translate-x-1 group-hover:text-brand-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
