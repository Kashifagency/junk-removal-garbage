import { ServiceGrid, blocksOf } from '@/components/sections';
import { Faq, HowItWorks, JsonLd, PageHero, QuoteSection, SectionHeading } from '@/components/ui';
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
  const heading = blocksOf(page, 'heading').find((h) => h.eyebrow === 'Our Services');
  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(defaultFaq))} />
      <PageHero title="Our Services" eyebrow="What we do" intro={seo.description} trail={trail} image={blocksOf(page, 'banner')[0]?.image} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionHeading title={heading?.title ?? 'Complete junk removal & waste management services in Dubai'} />
          <div className="mt-8 sm:mt-12">
            <ServiceGrid cards={blocksOf(page, 'card')} />
          </div>
        </div>
      </section>
      <HowItWorks />
      <Faq items={defaultFaq} />
      <QuoteSection />
    </>
  );
}
