// Converts images generated for blog articles (from the article-images/ inbox) into optimised WebP
// files in public/images/blog/, then deletes the processed source files and the prompts file(s).
//
// Usage (from website/):
//   node scripts/process-article-images.mjs [inboxDir=../article-images] [--slugs=a,b,c] [--keep]
//
// File naming in the inbox:
//   <slug>.<png|jpg|jpeg|webp>     → public/images/blog/<slug>.webp      (featured, 1600×1000 crop)
//   <slug>-2.<png|jpg|jpeg|webp>   → public/images/blog/<slug>-2.webp    (in-article, 1200×800 crop)
//   area-<key>.<png|jpg|jpeg|webp> → public/images/areas/<key>.webp      (area page photo, 1600×1000 crop)
//                                     key = area page slug without "junk-removal-", e.g. area-business-bay.png
// Prompts files (*-prompts.txt) are deleted once every image they list has been processed.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const INBOX = path.resolve(ROOT, args.find((a) => !a.startsWith('--')) ?? '../article-images');
const KEEP = args.includes('--keep');
const onlySlugs = (args.find((a) => a.startsWith('--slugs=')) ?? '').replace('--slugs=', '').split(',').filter(Boolean);
const OUT = path.join(ROOT, 'public', 'images', 'blog');
const OUT_AREAS = path.join(ROOT, 'public', 'images', 'areas');
const MAX_BYTES = 250 * 1024;

if (!fs.existsSync(INBOX)) {
  console.log(JSON.stringify({ inbox: INBOX, processed: [], missing: [], note: 'inbox folder not found' }, null, 2));
  process.exit(0);
}
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(OUT_AREAS, { recursive: true });

const IMAGE_RE = /^([a-z0-9-]+?)(-2)?\.(png|jpe?g|webp)$/i;
const files = fs.readdirSync(INBOX).filter((f) => IMAGE_RE.test(f));
const processed = [];
const failed = [];

async function encode(src, dest, width, height) {
  // Lower quality until the file fits the size budget (WebP, cover crop to the target box).
  for (const quality of [82, 76, 70, 64, 58]) {
    const buf = await sharp(src).rotate().resize(width, height, { fit: 'cover', position: 'attention' }).webp({ quality, effort: 5 }).toBuffer();
    if (buf.length <= MAX_BYTES || quality === 58) {
      fs.writeFileSync(dest, buf);
      return { bytes: buf.length, quality };
    }
  }
}

for (const file of files) {
  const [, slug, second] = file.match(IMAGE_RE);
  const base = slug.toLowerCase();
  if (onlySlugs.length && !onlySlugs.includes(base)) continue;
  const isArea = base.startsWith('area-') && !second;
  const name = isArea ? `${base.replace(/^area-/, '')}.webp` : `${base}${second ? '-2' : ''}.webp`;
  const [w, h] = second ? [1200, 800] : [1600, 1000];
  const src = path.join(INBOX, file);
  try {
    const meta = await sharp(src).metadata();
    const { bytes, quality } = await encode(src, path.join(isArea ? OUT_AREAS : OUT, name), w, h);
    processed.push({
      source: file,
      output: `/images/${isArea ? 'areas' : 'blog'}/${name}`,
      size: `${w}x${h}`,
      kb: Math.round(bytes / 1024),
      quality,
      sourcePx: `${meta.width}x${meta.height}`,
      lowRes: (meta.width ?? 0) < w * 0.75,
    });
    if (!KEEP) fs.unlinkSync(src);
  } catch (e) {
    failed.push({ source: file, error: String(e.message || e) });
  }
}

// Delete prompts files whose listed images have all been converted.
const deletedPrompts = [];
const missing = [];
for (const p of fs.readdirSync(INBOX).filter((f) => /-prompts\.txt$/i.test(f))) {
  const txt = fs.readFileSync(path.join(INBOX, p), 'utf8');
  const expected = [...txt.matchAll(/^\s*SAVE AS:\s*([a-z0-9-]+?)(-2)?\.(?:png|jpe?g|webp)/gim)].map((m) => ({ webp: `${m[1].toLowerCase()}${m[2] ? '-2' : ''}.webp`, required: !m[2] }));
  const absent = expected.filter((e) => !fs.existsSync(path.join(OUT, e.webp)));
  missing.push(...absent.map((a) => ({ prompts: p, image: a.webp, required: a.required })));
  if (!KEEP && absent.every((a) => !a.required)) {
    fs.unlinkSync(path.join(INBOX, p));
    deletedPrompts.push(p);
  }
}

console.log(JSON.stringify({ inbox: INBOX, processed, failed, missing, deletedPrompts }, null, 2));
