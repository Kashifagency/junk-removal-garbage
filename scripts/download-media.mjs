// Downloads every media URL listed in content/media.json into public/, keeping the original
// /wp-content/uploads/... paths so old image URLs keep working. Writes content/media-report.json.
//
// Usage: node scripts/download-media.mjs [--force]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const force = process.argv.includes('--force');
const list = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'media.json'), 'utf8'));

const report = { downloaded: [], skippedExisting: [], missing: [], externalNotDownloaded: [] };

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (site-migration)' }, redirect: 'follow' });
  return res;
}

const queue = [...list];
async function worker() {
  while (queue.length) {
    const m = queue.shift();
    const u = new URL(m.url);
    if (!/junkremovalgarbage\.com$/i.test(u.hostname)) {
      report.externalNotDownloaded.push(m.url);
      continue;
    }
    const dest = path.join(PUBLIC, decodeURIComponent(u.pathname));
    if (!force && fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      report.skippedExisting.push(u.pathname);
      continue;
    }
    try {
      const res = await get(m.url);
      const type = res.headers.get('content-type') || '';
      if (!res.ok || type.includes('text/html')) {
        report.missing.push({ url: m.url, status: res.status, unreferenced: !!m.unreferenced });
        continue;
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      report.downloaded.push(u.pathname);
    } catch (e) {
      report.missing.push({ url: m.url, status: 'network-error', error: String(e.message || e) });
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

fs.writeFileSync(path.join(ROOT, 'content', 'media-report.json'), JSON.stringify(report, null, 2));
console.log(
  `downloaded ${report.downloaded.length}, existing ${report.skippedExisting.length}, missing ${report.missing.length}, external ${report.externalNotDownloaded.length}`,
);
for (const m of report.missing) console.log('MISSING', m.status, m.url);
for (const m of report.externalNotDownloaded) console.log('EXTERNAL', m);
