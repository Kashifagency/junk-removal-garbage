import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/catalog';
import type { Block, Page, Post, Section } from '@/lib/content';
import { formatDate } from '@/lib/content';
import { Icon } from './Icon';
import { Checklist, SectionHead } from './ui';

type Feature = Extract<Block, { type: 'feature' }>;

/* ------------------------------------------------------------------ helpers */
export const sectionHas = (s: Section, type: Block['type']) => s.blocks.some((b) => b.type === type);
export const blocksOf = <T extends Block['type']>(s: Section | Page, type: T) =>
  ('sections' in s ? s.sections.flatMap((x) => x.blocks) : s.blocks).filter((b) => b.type === type) as Extract<Block, { type: T }>[];

/* ------------------------------------------------------------------ services */

/** Editorial numbered index of services; image preview on hover (desktop), thumbnail on mobile. */
export function ServiceIndex({ items, invert = false }: { items: Service[]; invert?: boolean }) {
  return (
    <ul className={`border-t ${invert ? 'border-ink-700' : 'border-ink-900'}`}>
      {items.map((s, i) => (
        <li key={s.path} className={`border-b ${invert ? 'border-ink-700' : 'border-line'}`}>
          <Link href={s.path} className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 sm:gap-8 sm:py-8 lg:grid-cols-[4rem_1.1fr_1fr_auto]">
            <span className={`font-display text-sm font-bold tabular-nums sm:text-base ${invert ? 'text-ink-500' : 'text-ink-400'}`}>{String(i + 1).padStart(2, '0')}</span>
            <span className="flex min-w-0 items-center gap-4">
              {s.image && (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-20 lg:hidden">
                  <Image src={s.image.src} alt="" fill sizes="80px" className="object-cover" />
                </span>
              )}
              <span
                className={`font-display text-xl leading-tight font-extrabold tracking-tight transition-colors sm:text-3xl ${invert ? 'text-white group-hover:text-brand-400' : 'text-ink-900 group-hover:text-brand-600'}`}
                style={{ fontStretch: '110%' }}
              >
                {s.title}
              </span>
            </span>
            <span className={`hidden text-[0.95rem] leading-relaxed lg:block ${invert ? 'text-ink-400' : 'text-ink-500'}`}>{s.short}</span>
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-[-45deg] sm:h-12 sm:w-12 ${invert ? 'border-ink-600 text-white group-hover:border-brand-500 group-hover:bg-brand-500' : 'border-ink-200 text-ink-900 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white'}`}
            >
              <Icon name="arrowRight" className="h-5 w-5" />
            </span>
            {s.image && (
              <span className="pointer-events-none absolute top-1/2 right-24 z-10 hidden aspect-[4/3] w-60 -translate-y-1/2 scale-90 rotate-3 overflow-hidden rounded-xl opacity-0 shadow-2xl transition-all duration-300 ease-(--ease-out-quint) group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 xl:block">
                <Image src={s.image.src} alt="" fill sizes="240px" className="object-cover" />
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Image cards for services (used where a visual grid suits better). */
export function ServiceCards({ items }: { items: Service[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((s, i) => (
        <li key={s.path} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
          <Link href={s.path} className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-(--radius-card) bg-ink-900 p-6 text-white sm:p-7">
            {s.image && (
              <Image
                src={s.image.src}
                alt={s.image.alt || s.title}
                fill
                sizes="(min-width:1024px) 50vw, (min-width:640px) 50vw, 100vw"
                className="object-cover opacity-80 transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
            <span className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="mt-5 block font-display text-2xl leading-tight font-extrabold" style={{ fontStretch: '110%' }}>
                {s.title}
              </span>
              <span className="mt-2 line-clamp-2 block text-[0.95rem] text-ink-200">{s.short}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
                Explore service <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ why us */
export function FeatureList({ features, invert = false }: { features: Feature[]; invert?: boolean }) {
  return (
    <ol className={`grid gap-x-12 sm:grid-cols-2 ${invert ? '' : ''}`}>
      {features.map((f, i) => (
        <li key={f.title + i} className={`flex gap-5 border-t py-7 ${invert ? 'border-ink-700' : 'border-line'}`}>
          <span className="font-display text-3xl leading-none font-extrabold text-brand-500 tabular-nums" style={{ fontStretch: '112%' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className={`text-xl font-bold ${invert ? '!text-white' : ''}`}>{f.title}</h3>
            <p className={`mt-2 leading-relaxed ${invert ? 'text-ink-400' : 'text-ink-500'}`}>{f.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ areas & map */
export function AreasBlock({ block }: { block: Extract<Block, { type: 'areas' }> }) {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="container-x">
        <SectionHead kicker="Local coverage" title={block.title} text={block.subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {block.columns.map((col) => (
            <div key={col.title} className="panel p-7">
              <h3 className="text-lg font-bold">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink-600">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MapEmbed({ address, title }: { address: string; title: string }) {
  const q = encodeURIComponent(address);
  return (
    <div className="overflow-hidden rounded-(--radius-card) border border-line bg-paper">
      <iframe title={title} src={`https://maps.google.com/maps?q=${q}&z=13&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[340px] w-full border-0 grayscale-[0.4] sm:h-[420px]" />
    </div>
  );
}

/* ------------------------------------------------------------------ content sections from WordPress */

/** Intro: heading + rich text beside a layered image pair. */
export function SplitIntro({ section, index }: { section: Section; index?: string }) {
  const images = section.blocks.filter((b): b is Extract<Block, { type: 'image' }> => b.type === 'image' && !!b.image);
  const heading = section.blocks.find((b) => b.type === 'heading') as Extract<Block, { type: 'heading' }> | undefined;
  const texts = section.blocks.filter((b): b is Extract<Block, { type: 'text' }> => b.type === 'text');
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          {images[0]?.image && (
            <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-(--radius-card)">
              <Image src={images[0].image.src} alt={images[0].image.alt} fill sizes="(min-width:1024px) 40vw, 80vw" className="object-cover" />
            </div>
          )}
          {images[1]?.image && (
            <div className="absolute right-0 bottom-[-8%] aspect-square w-[48%] overflow-hidden rounded-(--radius-card) border-[6px] border-white shadow-xl">
              <Image src={images[1].image.src} alt={images[1].image.alt} fill sizes="25vw" className="object-cover" />
            </div>
          )}
        </div>
        <div className="order-1 lg:order-2">
          {heading && <SectionHead index={index} kicker={heading.eyebrow && heading.eyebrow !== 'About Us' ? heading.eyebrow : 'Overview'} title={heading.title} />}
          {texts.map((t, i) => (
            <div key={i} className="prose-content mt-6" dangerouslySetInnerHTML={{ __html: t.html }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Heading + text on one side, checklist on the other. */
export function ListSection({ section, index, tone = 'white' }: { section: Section; index?: string; tone?: 'white' | 'paper' }) {
  const heading = section.blocks.find((b) => b.type === 'heading') as Extract<Block, { type: 'heading' }> | undefined;
  const text = section.blocks.find((b) => b.type === 'text') as Extract<Block, { type: 'text' }> | undefined;
  const list = section.blocks.find((b) => b.type === 'list') as Extract<Block, { type: 'list' }> | undefined;
  return (
    <section className={`py-16 sm:py-24 ${tone === 'paper' ? 'bg-paper' : ''}`}>
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {heading && <SectionHead index={index} kicker="Details" title={heading.title.replace(/:$/, '')} />}
          {text && <div className="prose-content mt-5" dangerouslySetInnerHTML={{ __html: text.html }} />}
        </div>
        {list && <Checklist items={list.items} />}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ blog */
export function PostCard({ post, headingLevel = 'h2', size = 'md', row = false }: { post: Post; headingLevel?: 'h2' | 'h3'; size?: 'md' | 'lg'; row?: boolean }) {
  const H = headingLevel;
  return (
    <article className={`group relative flex h-full flex-col ${row ? "lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-12" : ""}`}>
      <div className={`relative overflow-hidden rounded-(--radius-card) bg-paper ${size === 'lg' ? 'aspect-[16/10]' : 'aspect-[3/2]'}`}>
        {post.featuredImage && (
          <Image
            src={post.featuredImage.src}
            alt=""
            fill
            sizes={size === 'lg' ? '(min-width:1024px) 60vw, 100vw' : '(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw'}
            className="object-cover transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col pt-5 ${row ? "lg:pt-0" : ""}`}>
        <p className="flex items-center gap-2 text-xs font-medium text-ink-500">
          {post.categories[0] && <span className="font-semibold text-brand-600">{post.categories[0].name}</span>}
          {post.categories[0] && <span aria-hidden="true">·</span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <H className={`mt-2.5 leading-snug font-bold ${size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg'}`} style={{ fontStretch: '104%' }}>
          <Link href={post.path} className="after:absolute after:inset-0 group-hover:text-brand-700">
            {post.title}
          </Link>
        </H>
        <p className={`mt-3 text-ink-500 ${size === 'lg' ? 'line-clamp-3 text-base' : 'line-clamp-2 text-sm leading-relaxed'}`}>{post.excerpt}</p>
      </div>
    </article>
  );
}

export function PostGrid({ posts, headingLevel }: { posts: Post[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.id}>
          <PostCard post={p} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}

export function Pagination({ base, page, totalPages }: { base: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}page/${n}/`);
  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="btn-line !px-4">
          <Icon name="chevronLeft" className="h-4 w-4" /> <span className="sr-only sm:not-sr-only">Newer</span>
        </Link>
      ) : (
        <span />
      )}
      <ul className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${n === page ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-paper'}`}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>
      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" className="btn-line !px-4">
          <span className="sr-only sm:not-sr-only">Older</span> <Icon name="chevronRight" className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
