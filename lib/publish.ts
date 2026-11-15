/**
 * Scheduled publishing. A post whose publish date is in the future is built and deployed but stays
 * hidden (404, not in listings/sitemap/feed) until that date, then goes live automatically: the
 * routes that list or render posts use ISR (`revalidate`), so they re-check on the next regeneration.
 *
 * Rule: date-only values ("2026-11-20", "20/11/26") go live at 00:00 Asia/Dubai on that day; values
 * with a time ("2026-08-13T09:48:08Z") go live at that exact moment. Missing or unparseable dates
 * count as published so existing content is never hidden by accident.
 */
export const PUBLISH_TIME_ZONE = 'Asia/Dubai';

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const DMY = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})$/;

/** Today's calendar date in Asia/Dubai as YYYY-MM-DD. */
export function dubaiToday(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: PUBLISH_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/**
 * Normalise a publish date to either "YYYY-MM-DD" (date only) or a full ISO timestamp.
 * Accepts ISO strings, dd/mm/yy(yy) strings and Date objects (YAML frontmatter dates arrive as Dates
 * at UTC midnight when no time was given). Returns undefined when missing or unparseable.
 */
export function normalizePublishDate(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined;
    const iso = value.toISOString();
    return iso.endsWith('T00:00:00.000Z') ? iso.slice(0, 10) : iso;
  }
  const s = String(value).trim();
  if (DATE_ONLY.test(s)) return s;
  const dmy = s.match(DMY);
  if (dmy) {
    const [, d, m, y] = dmy;
    const year = y.length === 2 ? `20${y}` : y;
    return `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  const t = Date.parse(s);
  return Number.isNaN(t) ? undefined : new Date(t).toISOString();
}

/** True when a post with this publish date is live at `now` (see rule above). */
export function isPublished(dateStr: unknown, now: Date = new Date()): boolean {
  const d = normalizePublishDate(dateStr);
  if (!d) return true;
  if (DATE_ONLY.test(d)) return dubaiToday(now) >= d;
  return now.getTime() >= Date.parse(d);
}
