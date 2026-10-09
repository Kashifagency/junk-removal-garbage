// Single source of truth for content consolidation (shared by next.config.ts, lib/content.ts and
// scripts/validate-routes.mjs):
//   • content/redirects.json            → manual 301s, e.g. legacy posts merged into a service page
//   • article frontmatter `redirectFrom` → legacy posts merged into a new/refreshed Markdown article
//   • article frontmatter `replaces: true` (slug = legacy post slug) → the article replaces that post in place
// Draft articles are ignored in production so redirects never point at a missing page.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const ARTICLES = path.join(ROOT, 'content', 'articles');
const MANUAL = path.join(ROOT, 'content', 'redirects.json');

const clean = (s) => '/' + String(s).replace(/^\/+|\/+$/g, '') + '/';
const slugOf = (file, data) =>
  String(data.slug || file.replace(/\.md$/, ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** @returns {{ redirects: {source:string,destination:string}[], replaced: Set<string>, removed: Set<string> }} */
export function redirectPlan({ includeDrafts = process.env.NODE_ENV === 'development' } = {}) {
  const redirects = [];
  const replaced = new Set(); // legacy slugs now served by a Markdown article at the same URL
  if (fs.existsSync(MANUAL)) {
    for (const r of JSON.parse(fs.readFileSync(MANUAL, 'utf8'))) redirects.push({ source: clean(r.from), destination: clean(r.to) });
  }
  if (fs.existsSync(ARTICLES)) {
    for (const file of fs.readdirSync(ARTICLES)) {
      if (!file.endsWith('.md') || file.startsWith('_')) continue;
      const { data } = matter(fs.readFileSync(path.join(ARTICLES, file), 'utf8'));
      if (data.draft && !includeDrafts) continue;
      const slug = slugOf(file, data);
      if (data.replaces) replaced.add(slug);
      for (const from of data.redirectFrom ?? []) redirects.push({ source: clean(from), destination: `/${slug}/` });
    }
  }
  const seen = new Set();
  for (const r of redirects) {
    if (r.source === r.destination) throw new Error(`Redirect loop: ${r.source}`);
    if (seen.has(r.source)) throw new Error(`Duplicate redirect source: ${r.source}`);
    seen.add(r.source);
  }
  const removed = new Set(redirects.map((r) => r.source.replace(/^\/|\/$/g, '')));
  return { redirects, replaced, removed };
}
