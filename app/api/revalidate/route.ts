import { revalidatePath } from 'next/cache';

// Daily on-demand revalidation, called by the Vercel cron in vercel.json shortly
// after midnight Asia/Dubai (20:05 UTC). It refreshes only the routes that list
// or render blog posts, so posts scheduled for the new day go live on time while
// time-based ISR stays at 24h to keep ISR reads/writes low.
//
// Requires the CRON_SECRET env var in Vercel: the cron sends it as
// 'Authorization: Bearer <CRON_SECRET>'. Without it the route refuses every
// call, and the 24h ISR fallback still publishes scheduled posts within a day.
export const dynamic = 'force-dynamic';

// [path, type] — type is required for dynamic segments (see revalidatePath docs).
const PATHS: Array<[string, ('page' | 'layout')?]> = [
  ['/', 'layout'], // every page (all of them list or render posts)
  ['/sitemap.xml'],
  ['/feed'],
];

export function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  for (const [path, type] of PATHS) revalidatePath(path, type);

  return Response.json({ revalidated: PATHS.map(([p]) => p), now: Date.now() });
}
