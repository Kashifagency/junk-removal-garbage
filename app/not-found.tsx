import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { CallButtons } from '@/components/ui';
import { servicePages } from '@/lib/content';

export const metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-x max-w-3xl text-center">
        <p className="font-display text-7xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">This page has been cleared away</h1>
        <p className="mt-4 text-lg text-ink-500">The page you’re looking for doesn’t exist or has moved. Try one of these instead, or get in touch.</p>
        <CallButtons className="mt-8 justify-center" />
        <ul className="mt-12 grid gap-3 text-left sm:grid-cols-2">
          {[{ title: 'Home', path: '/' }, ...servicePages, { title: 'Blog', path: '/blog/' }].map((p) => (
            <li key={p.path}>
              <Link href={p.path} className="group flex items-center justify-between rounded-2xl px-5 py-4 font-semibold text-ink-800 ring-1 ring-ink-100 hover:text-brand-600 hover:ring-brand-400">
                {p.title}
                <Icon name="arrowRight" className="h-4 w-4 text-ink-300 group-hover:text-brand-500" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
