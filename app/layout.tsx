import type { Metadata, Viewport } from 'next';
import { Archivo, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LeadTracker } from '@/components/LeadTracker';
import { StickyCta } from '@/components/StickyCta';
import { JsonLd } from '@/components/ui';
import { site } from '@/lib/content';
import { graph, localBusinessLd, websiteLd } from '@/lib/seo';
import './globals.css';

const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Archivo({ subsets: ['latin'], variable: '--font-display-face', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Junk Removal Dubai | ${site.name}`, template: `%s | ${site.name}` },
  description: 'Junk removal and waste management in Dubai for homes and businesses.',
  applicationName: site.name,
  formatDetection: { telephone: false },
  alternates: { types: { 'application/rss+xml': [{ url: '/feed/', title: `${site.name} – Blog` }] } },
};

export const viewport: Viewport = { themeColor: '#18150f', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[70] rounded-full bg-brand-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <JsonLd data={graph(localBusinessLd(), websiteLd())} />
        <LeadTracker />
        <Analytics />
      </body>
    </html>
  );
}
