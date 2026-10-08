import { ServiceCards, ServiceIndex } from '@/components/sections';
import { Faq, ItemsGrid, JsonLd, PageHeader, ProcessSteps, PromiseStrip, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { defaultFaq, getPageByPath, pageSeoFor } from '@/lib/content';
import { breadcrumbLd, buildMetadata, faqLd, graph } from '@/lib/seo';

const page = getPageByPath('/services/')!;
const seo = pageSeoFor(page.path, { title: page.title, description: '' });

export function generateMetadata() {
  return buildMetadata({ ...seo, path: page.path });
}

export default function ServicesPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Our Services', path: page.path },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(defaultFaq))} />
      <PageHeader title="Junk removal & waste services" kicker="Our services" intro={seo.description} trail={trail}>
        <div className="mt-8 border-t border-line pt-7">
          <PromiseStrip />
        </div>
      </PageHeader>
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <ServiceCards items={services} />
        </div>
      </section>
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index="01" kicker="At a glance" title="Which service fits your job?" />
          <div className="mt-12">
            <ServiceIndex items={services} />
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index="02" kicker="What we remove" title="If it needs to go, we take it" />
          <div className="mt-12">
            <ItemsGrid />
          </div>
        </div>
      </section>
      <section className="bg-ink-900 py-16 text-white sm:py-24">
        <div className="container-x">
          <SectionHead index="03" kicker="How it works" title="Four simple steps" invert />
          <div className="mt-14">
            <ProcessSteps invert />
          </div>
        </div>
      </section>
      <Faq items={defaultFaq} index="04" />
      <QuoteSection />
    </>
  );
}
