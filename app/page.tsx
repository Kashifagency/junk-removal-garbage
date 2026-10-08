import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { FeatureGrid, PostGrid, ServiceGrid, blocksOf } from '@/components/sections';
import { CallButtons, Faq, HowItWorks, JsonLd, QuoteSection, SectionHeading } from '@/components/ui';
import { areaName, areaPages, defaultFaq, getPageByPath, pageSeoFor, posts } from '@/lib/content';
import { buildMetadata, faqLd, graph } from '@/lib/seo';

const home = getPageByPath('/')!;
// The location pages carry the cleaner copy of the shared "Why choose us" cards (the home copy repeats one description).
const featureSource = areaPages[0] ?? home;

export function generateMetadata() {
  const seo = pageSeoFor('/', { title: home.title, description: '' });
  return buildMetadata({ ...seo, path: '/', image: blocksOf(home, 'hero')[0]?.image });
}

const TRUST = ['Same-day service available', 'Upfront, transparent quotes', 'Eco-friendly disposal', 'Homes & businesses'];

export default function HomePage() {
  const hero = blocksOf(home, 'hero')[0];
  const headings = blocksOf(home, 'heading');
  const servicesHeading = headings.find((h) => h.eyebrow === 'Our Services');
  const whyHeading = headings.find((h) => h.eyebrow === 'Why Choose Us');
  const cards = blocksOf(home, 'card');
  const features = blocksOf(featureSource, 'feature');
  const lead = hero.text.replace(/^Call:\s*\+[\d\s]+\.\s*/, '');
  const tagline = hero.eyebrow.replace(/ with professional junk removal service in Dubai\.?$/, '').split('|').map((s) => s.trim());

  return (
    <>
      <JsonLd data={graph(faqLd(defaultFaq))} />

      <section className="relative isolate overflow-hidden bg-ink-950">
        {hero.image && <Image src={hero.image.src} alt="Shanan junk removal truck loaded with waste on a Dubai highway" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_center]" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
        <div className="container-x py-20 sm:py-28 lg:py-36">
          <ul className="flex flex-wrap gap-2">
            {tagline.map((t) => (
              <li key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl">
            Professional junk removal &amp; waste management in <span className="text-brand-400">Dubai</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">{lead}</p>
          <CallButtons className="mt-9" />
          <a href="#quote" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-brand-400 underline-offset-4 hover:text-brand-300">
            Or request a free quote online <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>
        <div className="border-t border-white/10 bg-ink-950/70 backdrop-blur">
          <ul className="container-x grid grid-cols-2 gap-4 py-5 text-sm text-ink-200 lg:grid-cols-4">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Icon name="checkCircle" className="h-5 w-5 shrink-0 text-brand-400" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={servicesHeading?.eyebrow} title={servicesHeading?.title ?? 'Our services'} />
            <Link href="/services/" className="btn-outline shrink-0">
              All services <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <ServiceGrid cards={cards} />
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-20 sm:py-24">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="eyebrow !text-brand-300">{whyHeading?.eyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">{whyHeading?.title}</h2>
          </div>
          <div className="mt-12">
            <FeatureGrid features={features} dark />
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Service areas" title="Junk removal across Dubai’s communities" text="From Dubai Marina towers to Arabian Ranches villas, our team covers every part of Dubai." />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {areaPages.map((p) => (
              <li key={p.id}>
                <Link href={p.path} className="group flex items-center justify-between gap-2 rounded-2xl bg-white px-5 py-4 font-semibold text-ink-800 ring-1 ring-ink-100 hover:text-brand-600 hover:ring-brand-400">
                  <span className="flex items-center gap-2">
                    <Icon name="pin" className="h-4 w-4 text-brand-500" /> {areaName(p)}
                  </span>
                  <Icon name="arrowRight" className="h-4 w-4 text-ink-300 group-hover:text-brand-500" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/service-areas/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all service areas <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Faq items={defaultFaq} />

      <section className="py-20">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="From the blog" title="Junk removal tips & guides" />
            <Link href="/blog/" className="btn-outline shrink-0">
              Visit the blog <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <PostGrid posts={posts.slice(0, 3)} headingLevel="h3" />
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
