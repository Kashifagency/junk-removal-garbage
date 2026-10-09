import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { CallButtons } from '@/components/ui';
import { services } from '@/lib/catalog';

export const metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="kicker">
            <span className="text-brand-700">404</span> Page not found
          </p>
          <h1 className="display-xl mt-5">This page has been cleared away.</h1>
          <p className="mt-6 max-w-lg text-lg text-ink-600">The page you’re looking for doesn’t exist or has moved. Try one of these instead, or get in touch.</p>
          <CallButtons className="mt-8" />
        </div>
        <ul className="border-t border-ink-900">
          {[{ title: 'Home', path: '/' }, ...services, { title: 'Blog', path: '/blog/' }].map((p) => (
            <li key={p.path} className="border-b border-line">
              <Link href={p.path} className="group flex items-center justify-between py-4 font-display text-lg font-bold text-ink-900 hover:text-brand-600" style={{ fontStretch: '106%' }}>
                {p.title}
                <Icon name="arrowRight" className="h-5 w-5 text-ink-300 group-hover:text-brand-500" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
