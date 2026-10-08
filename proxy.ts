import { NextResponse, type NextRequest } from 'next/server';
import routes from './content/routes.json' with { type: 'json' };

// WordPress plain permalinks (/?p=123, /?page_id=45) -> pretty URLs, without carrying the query string.
const byId = new Map(routes.map((r) => [`${r.type === 'page' ? 'page_id' : 'p'}:${r.id}`, r.path]));

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const key = searchParams.has('p') ? `p:${searchParams.get('p')}` : `page_id:${searchParams.get('page_id')}`;
  const target = byId.get(key);
  if (!target) return NextResponse.next();
  return NextResponse.redirect(new URL(target, request.url), 308);
}

export const config = {
  matcher: [{ source: '/', has: [{ type: 'query', key: 'p' }] }, { source: '/', has: [{ type: 'query', key: 'page_id' }] }],
};
