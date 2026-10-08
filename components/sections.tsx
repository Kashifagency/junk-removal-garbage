import Image from 'next/image';
import Link from 'next/link';
import type { Block, Page, Post, Section } from '@/lib/content';
import { formatDate } from '@/lib/content';
import { Icon, iconFromFa, type IconName } from './Icon';
import { Checklist, SectionHeading } from './ui';

type Card = Extract<Block, { type: 'card' }>;
type Feature = Extract<Block, { type: 'feature' }>;

export function ServiceGrid({ cards }: { cards: Card[] }) {
  return (
    // Five cards: two wide on the first row, three below (no empty cell).
    <ul className={`grid gap-6 sm:grid-cols-2 ${cards.length === 5 ? 'lg:grid-cols-6' : 'lg:grid-cols-3'}`}>
      {cards.map((c, i) => {
        const inner = (
          <>
            {c.image && (
              <div className={`relative aspect-[4/3] overflow-hidden ${cards.length === 5 && i < 2 ? "lg:aspect-[16/8]" : ""}`}>
                <Image
                  src={c.image.src}
                  alt={c.image.alt || c.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold">{c.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-500">{c.text}</p>
              {c.href && (
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Learn more <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </div>
          </>
        );
        return (
          <li key={c.title} className={cards.length === 5 ? (i < 2 ? 'lg:col-span-3' : 'lg:col-span-2') + (i === 4 ? ' sm:col-span-2 lg:col-span-2' : '') : ''}>
            {c.href ? (
              <Link href={c.href} className="group card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-ink-900/5">
                {inner}
              </Link>
            ) : (
              <div className="group card flex h-full flex-col overflow-hidden">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const FEATURE_ICONS: IconName[] = ['clock', 'tag', 'leaf', 'shield', 'building', 'smile'];

export function FeatureGrid({ features, dark = false }: { features: Feature[]; dark?: boolean }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <li key={f.title + i} className={`rounded-3xl p-7 ${dark ? 'bg-white/5 ring-1 ring-white/10' : 'card'}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
            <Icon name={iconFromFa(String(f.icon || ''), FEATURE_ICONS[i % FEATURE_ICONS.length])} className="h-6 w-6" />
          </span>
          <h3 className={`mt-5 text-lg font-bold ${dark ? 'text-white' : ''}`}>{f.title}</h3>
          <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-500'}`}>{f.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function AreasBlock({ block }: { block: Extract<Block, { type: 'areas' }> }) {
  return (
    <section className="bg-sand py-20">
      <div className="container-x">
        <SectionHeading title={block.title} text={block.subtitle} center />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {block.columns.map((col) => (
            <div key={col.title} className="card p-7">
              <h3 className="border-b-2 border-brand-400 pb-3 text-lg font-bold">{col.title}</h3>
              <ul className="mt-4 divide-y divide-ink-100">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 text-ink-600">
                    <Icon name="pin" className="h-4 w-4 shrink-0 text-brand-500" /> {item}
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
  const q = encodeURIComponent(address.includes('Dubai') ? address : `${address}, Dubai`);
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Location" title={title} />
        <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-ink-100">
          <iframe
            title={`Map of ${address}`}
            src={`https://maps.google.com/maps?q=${q}&z=13&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}

/** Intro layout: two stacked images + heading + rich text (about & service pages). */
export function SplitIntro({ section }: { section: Section }) {
  const images = section.blocks.filter((b): b is Extract<Block, { type: 'image' }> => b.type === 'image' && !!b.image);
  const heading = section.blocks.find((b) => b.type === 'heading') as Extract<Block, { type: 'heading' }> | undefined;
  const texts = section.blocks.filter((b): b is Extract<Block, { type: 'text' }> => b.type === 'text');
  return (
    <section className="py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          {images[0]?.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={images[0].image.src} alt={images[0].image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          )}
          {images[1]?.image && (
            <div className="relative -mt-20 ml-auto hidden aspect-square w-1/2 overflow-hidden rounded-3xl border-8 border-white shadow-xl sm:block">
              <Image src={images[1].image.src} alt={images[1].image.alt} fill sizes="25vw" className="object-cover" />
            </div>
          )}
        </div>
        <div>
          {heading && <SectionHeading eyebrow={heading.eyebrow && heading.eyebrow !== 'About Us' ? heading.eyebrow : undefined} title={heading.title} />}
          {texts.map((t, i) => (
            <div key={i} className="prose-content mt-6" dangerouslySetInnerHTML={{ __html: t.html }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Heading + optional text + checklist. */
export function ListSection({ section, tone = 'white' }: { section: Section; tone?: 'white' | 'sand' }) {
  const heading = section.blocks.find((b) => b.type === 'heading') as Extract<Block, { type: 'heading' }> | undefined;
  const text = section.blocks.find((b) => b.type === 'text') as Extract<Block, { type: 'text' }> | undefined;
  const list = section.blocks.find((b) => b.type === 'list') as Extract<Block, { type: 'list' }> | undefined;
  return (
    <section className={`py-16 ${tone === 'sand' ? 'bg-sand' : ''}`}>
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          {heading && <SectionHeading title={heading.title.replace(/:$/, '')} />}
          {text && <div className="prose-content mt-5" dangerouslySetInnerHTML={{ __html: text.html }} />}
        </div>
        {list && <Checklist items={list.items} />}
      </div>
    </section>
  );
}

export function PostCard({ post, headingLevel = 'h2' }: { post: Post; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className="group card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-ink-900/5">
      <Link href={post.path} className="relative block aspect-[16/10] overflow-hidden bg-ink-50" tabIndex={-1} aria-hidden="true">
        {post.featuredImage && (
          <Image
            src={post.featuredImage.src}
            alt=""
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium text-ink-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.categories[0] && <> · {post.categories[0].name}</>}
        </p>
        <H className="mt-2 text-lg leading-snug font-bold">
          <Link href={post.path} className="hover:text-brand-600">
            {post.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
        <Link href={post.path} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600" aria-label={`Read more: ${post.title}`}>
          Read more <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function PostGrid({ posts, headingLevel }: { posts: Post[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className="btn-outline !px-4">
          <Icon name="chevronLeft" className="h-4 w-4" /> Previous
        </Link>
      )}
      <ul className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${n === page ? 'bg-brand-500 text-white' : 'text-ink-700 ring-1 ring-ink-200 hover:ring-brand-500'}`}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>
      {page < totalPages && (
        <Link href={href(page + 1)} rel="next" className="btn-outline !px-4">
          Next <Icon name="chevronRight" className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}

/** Section helpers for templates. */
export const sectionHas = (s: Section, type: Block['type']) => s.blocks.some((b) => b.type === type);
export const blocksOf = <T extends Block['type']>(s: Section | Page, type: T) =>
  ('sections' in s ? s.sections.flatMap((x) => x.blocks) : s.blocks).filter((b) => b.type === type) as Extract<Block, { type: T }>[];
