import { telHref, whatsappHref } from '@/lib/content';
import { Icon, WhatsAppIcon } from './Icon';

/** Mobile bottom action bar + desktop floating WhatsApp button. */
export function StickyCta() {
  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_1fr_1.3fr] gap-1.5 rounded-2xl bg-ink-900/95 p-1.5 text-[0.82rem] font-semibold shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] backdrop-blur md:hidden">
        <a href={telHref} className="flex items-center justify-center gap-1.5 rounded-xl py-3 text-white">
          <Icon name="phone" className="h-4 w-4 text-brand-400" /> Call
        </a>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl py-3 text-white">
          <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> WhatsApp
        </a>
        <a href="#quote" className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-500 py-3 text-white">
          Free quote <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      </div>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink-950 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 md:flex"
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
