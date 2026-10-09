// Merges content/area-drafts/part-*.json into content/area-pages.json and checks quality:
// schema, lengths, banned words and cross-page uniqueness (8-word shingles), including overlap
// with the 10 legacy area pages (content/local-content.json).
//
// Usage (from website/): node scripts/merge-area-drafts.mjs [--write]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const list = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/area-list.json'), 'utf8')).areas;
const legacy = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/local-content.json'), 'utf8'));
const DRAFTS = path.join(ROOT, 'content/area-drafts');
const entries = fs
  .readdirSync(DRAFTS)
  .filter((f) => /^part-\d+\.json$/.test(f))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(DRAFTS, f), 'utf8')));

const problems = [];
const words = (s) => s.split(/\s+/).filter(Boolean).length;
const byslug = Object.fromEntries(entries.map((e) => [e.slug, e]));
for (const a of list) if (!byslug[a.slug]) problems.push(`missing area: ${a.slug}`);
for (const e of entries) {
  const p = (m) => problems.push(`${e.slug}: ${m}`);
  if (!list.find((a) => a.slug === e.slug)) p('not in area-list.json');
  if (e.seoTitle.length > 60) p(`seoTitle ${e.seoTitle.length} chars`);
  if (e.description.length < 130 || e.description.length > 160) p(`description ${e.description.length} chars`);
  if (e.paragraphs?.length !== 3) p('paragraphs != 3');
  if (e.tips?.length !== 4 || e.jobs?.length !== 4 || e.faq?.length !== 4) p('tips/jobs/faq count');
  if (!/junk removal in/i.test(e.intro)) p('intro missing "junk removal in"');
  const all = JSON.stringify(e);
  for (const bad of [/\bquote/i, /donat/i, /charit/i, /24\/7/, /\bAED\b/, /765/, /cheapest|fastest|guarantee/i]) if (bad.test(all)) p(`banned: ${bad}`);
  const total = [e.intro, ...e.paragraphs, ...e.tips, ...e.faq.flatMap((f) => [f.q, f.a])].map(words).reduce((x, y) => x + y, 0);
  e._words = total;
  if (total < 450) p(`only ${total} unique words`);
}

// Uniqueness: share of 8-word shingles that appear in any other page's unique copy.
const textOf = (o) => [o.intro, o.heading, ...o.paragraphs, ...o.tips, ...(o.jobs ?? []), ...o.faq.flatMap((f) => [f.q, f.a])].filter(Boolean).join(' ');
const shingles = (t) => {
  const w = t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 8 <= w.length; i++) s.add(w.slice(i, i + 8).join(' '));
  return s;
};
const pool = [
  ...entries.map((e) => ({ id: e.slug, sh: shingles(textOf(e)) })),
  ...Object.entries(legacy).filter(([k]) => k.startsWith('/')).map(([k, v]) => ({ id: k, sh: shingles(textOf({ ...v, intro: '' })) })),
];
const overlaps = [];
for (const e of entries) {
  const me = pool.find((x) => x.id === e.slug).sh;
  let shared = 0;
  for (const s of me) if (pool.some((o) => o.id !== e.slug && o.sh.has(s))) shared++;
  const pct = Math.round((shared / Math.max(me.size, 1)) * 100);
  overlaps.push([e.slug, pct, e._words]);
  if (pct > 5) problems.push(`${e.slug}: ${pct}% of phrases shared with other area pages`);
}

const out = Object.fromEntries(list.filter((a) => byslug[a.slug]).map((a) => {
  const { _words, ...rest } = byslug[a.slug];
  return [a.slug, rest];
}));
console.log(JSON.stringify({ entries: entries.length, problems, overlapPctAndWords: overlaps }, null, 1));
if (process.argv.includes('--write')) {
  if (problems.length) {
    console.error('Not written: fix the problems above first.');
    process.exit(1);
  }
  fs.writeFileSync(path.join(ROOT, 'content/area-pages.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote content/area-pages.json (${Object.keys(out).length} areas)`);
}
