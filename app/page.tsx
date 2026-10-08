import Image from 'next/image';
import Link from 'next/link';
import { Icon, WhatsAppIcon } from '@/components/Icon';
import { FeatureList, PostCard, ServiceIndex, blocksOf } from '@/components/sections';
import { AreaMarquee, CallButtons, Faq, ItemsGrid, JsonLd, ProcessSteps, PromiseStrip, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { areaName, areaPages, defaultFaq, getPageByPath, pageSeoFor, posts, site, telHref, whatsappHref } from '@/lib/content';
import { buildMetadata, faqLd, graph } from '@/lib/seo';

const home = getPageByPath('/')!;
// The location pages carry the cleaner copy of the shared "Why choose us" cards (the home copy repeats one description).
const featureSource = areaPages[0] ?? home;

export function generateMetadata() {
  const seo = pageSeoFor('/', { title: home.title, description: '' });
  return buildMetadata({ ...seo, path: '/', image: blocksOf(home, 'hero')[0]?.image });
}

export default function HomePage() {
  const hero = blocksOf(home, 'hero')[0];
  const features = blocksOf(featureSource, 'feature');
  const lead = hero.text.replace(/^Call:\s*\+[\d\s]+\.\s*/, '');
  const [featured, ...rest] = posts.slice(0, 3);

  return (
    <>
      <JsonLd data={graph(faqLd(defaultFaq))} />

      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="container-x grid items-center gap-12 pt-10 pb-14 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-24">
          <div>
            <p className="kicker">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Junk removal · Dubai
            </p>
            <h1 className="display-xl mt-6">
              Junk removal &amp; waste management in <span className="mark">Dubai</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">{lead}</p>
            <CallButtons className="mt-9" />
            <div className="mt-10 border-t border-line pt-7">
              <PromiseStrip />
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.5rem] sm:aspect-[4/3]">
              {hero.image && (
                <Image
                  src={hero.image.src}
                  alt="Shanan junk removal truck loaded with waste on a Dubai highway"
                  fill
                  priority
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className="object-cover object-[65%_center]"
                />
              )}
            </div>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_18px_40px_-12px_rgba(24,21,15,0.35)] transition-transform hover:-translate-y-0.5 sm:left-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-whatsapp text-ink-950">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-ink-900">Send a photo, get a price</span>
                <span className="block text-xs text-ink-500">Fastest way to a quote</span>
              </span>
            </a>
            <div className="absolute top-4 right-4 hidden rounded-2xl bg-ink-900 px-5 py-4 text-white sm:block">
              <span className="block text-[0.68rem] font-medium tracking-[0.18em] text-ink-400 uppercase">Coverage</span>
              <span className="mt-1 block font-display text-lg font-bold" style={{ fontStretch: '110%' }}>
                All Dubai areas
              </span>
            </div>
          </div>
        </div>
      </section>

      <AreaMarquee />

      {/* ---------------------------------------------------------- services */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead
            index="01"
            kicker="Services"
            title="Complete junk removal & waste management"
            text="One team for homes, offices, construction sites and gardens — across every Dubai community."
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

      {/* ---------------------------------------------------------- what we take */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index="02" kicker="What we remove" title="If it needs to go, we take it" text="Almost everything except hazardous materials, chemicals and medical waste, which Dubai regulations exclude." />
          <div className="mt-12">
            <ItemsGrid />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- why us */}
      <section className="bg-ink-900 py-16 text-white sm:py-24">
        <div className="container-x">
          <SectionHead index="03" kicker="Why choose us" title="Your reliable junk removal partner in Dubai" invert />
          <div className="mt-12">
            <FeatureList features={features} invert />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- process */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead index="04" kicker="How it works" title="Junk gone in four simple steps" />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- statement band */}
      <section className="container-x">
        <div className="relative isolate grid gap-10 overflow-hidden rounded-[1.75rem] bg-brand-500 px-6 py-14 text-white sm:px-12 sm:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <Image src="/wp-content/uploads/2025/12/cargo-transports-e1766232854263.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25 mix-blend-multiply" />
          <a href={telHref} className="order-last hidden rounded-2xl bg-ink-900/90 p-7 backdrop-blur transition-transform hover:-translate-y-1 lg:block">
            <span className="block text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">Call now</span>
            <span className="mt-2 block font-display text-3xl font-extrabold text-white" style={{ fontStretch: '110%' }}>
              {site.phone}
            </span>
            <span className="mt-4 flex items-center gap-2 text-sm text-ink-300">
              <Icon name="clock" className="h-4 w-4 text-brand-400" /> Same-day or next-day pickup
            </span>
          </a>
          <div className="max-w-3xl">
            <p className="kicker !text-white/80">Same-day service available</p>
            <h2 className="display-lg mt-4 !text-white">From a single sofa to a full site clearance.</h2>
            <p className="mt-5 max-w-xl text-lg text-white/85">No matter the item’s size, weight or condition, our team removes it safely without damaging your property.</p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Link href="#quote" className="btn-dark">
                Get a free quote <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-light">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp a photo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- areas */}
      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index="05" kicker="Service areas" title="Across Dubai’s communities" text="From Dubai Marina towers to Arabian Ranches villas. Don’t see your area? We cover all of Dubai." />
          <ul className="grid border-t border-ink-900 sm:grid-cols-2 sm:gap-x-10">
            {areaPages.map((p, i) => (
              <li key={p.id} className="border-b border-line">
                <Link href={p.path} className="group flex items-center gap-4 py-4">
                  <span className="text-xs font-semibold text-ink-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-600" style={{ fontStretch: '108%' }}>
                    {areaName(p)}
                  </span>
                  <Icon name="arrowUpRight" className="h-5 w-5 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-paper">
        <Faq items={defaultFaq} index="06" />
      </div>

      {/* ---------------------------------------------------------- blog */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHead
            index="07"
            kicker="Journal"
            title="Junk removal tips & guides"
            action={
              <Link href="/blog/" className="link-arrow">
                Visit the blog <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-[1.4fr_1fr]">
            {featured && <PostCard post={featured} headingLevel="h3" size="lg" />}
            <div className="grid gap-y-12">
              {rest.map((p) => (
                <PostCard key={p.id} post={p} headingLevel="h3" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
