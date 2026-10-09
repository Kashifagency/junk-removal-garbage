import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * New blog articles live as Markdown files in /content/articles/*.md (see docs/content-strategy/).
 * They are read at build time and merged with the legacy WordPress posts.
 */
export type ArticleFrontmatter = {
  title: string;
  slug?: string;
  seoTitle?: string;
  description: string;
  date: string;
  updated?: string;
  topic?: string;
  tags?: string[];
  primaryKeyword?: string;
  image?: string;
  imageAlt?: string;
  summary?: string[];
  faq?: { q: string; a: string }[];
  service?: string;
  areas?: string[];
  author?: string;
  draft?: boolean;
  /** true = this article replaces the legacy WordPress post with the same slug (same URL). */
  replaces?: boolean;
  /** Legacy post slugs merged into this article; each gets a 301 to it. */
  redirectFrom?: string[];
};

export type MarkdownArticle = ArticleFrontmatter & { slug: string; html: string; wordCount: number; file: string };

const DIR = path.join(process.cwd(), 'content', 'articles');

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const isoDate = (d: unknown) => {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(String(d));
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date: ${String(d)}`);
  return date.toISOString();
};

/** Markdown → HTML with styled callouts and safe external links. */
function render(md: string) {
  let html = marked.parse(md, { gfm: true, async: false }) as string;
  // > **Tip:** … / > **Note:** … / > **Important:** … become styled callouts.
  html = html.replace(/<blockquote>\s*<p><strong>(Tip|Note|Important|Warning):<\/strong>/g, (_, kind: string) => `<blockquote class="callout callout-${kind.toLowerCase()}"><p><strong>${kind}:</strong>`);
  html = html.replace(/<a href="(https?:\/\/(?!junkremovalgarbage\.com)[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  return html;
}

let cache: MarkdownArticle[] | null = null;

export function loadArticles(): MarkdownArticle[] {
  if (cache) return cache;
  if (!fs.existsSync(DIR)) return (cache = []);
  const showDrafts = process.env.NODE_ENV === 'development';
  const list: MarkdownArticle[] = [];
  for (const file of fs.readdirSync(DIR)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const fm = data as ArticleFrontmatter;
    const missing = (['title', 'description', 'date'] as const).filter((k) => !fm[k]);
    if (missing.length) throw new Error(`content/articles/${file}: missing frontmatter ${missing.join(', ')}`);
    if (fm.draft && !showDrafts) continue;
    const slug = slugify(fm.slug || file.replace(/\.md$/, ''));
    const html = render(content);
    list.push({
      ...fm,
      date: isoDate(fm.date)!,
      updated: isoDate(fm.updated),
      slug,
      html,
      wordCount: content.split(/\s+/).filter(Boolean).length,
      file,
    });
  }
  return (cache = list);
}
