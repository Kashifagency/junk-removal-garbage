import { telHref, whatsappHref } from '@/lib/content';
import { Icon, WhatsAppIcon } from './Icon';

/** Mobile bottom action bar + desktop floating WhatsApp button. */
export function StickyCta() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink-100 bg-white/95 text-xs font-semibold backdrop-blur md:hidden">
        <a href={telHref} className="flex flex-col items-center gap-1 py-2.5 text-ink-800">
          <Icon name="phone" className="h-5 w-5 text-brand-500" /> Call
        </a>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-2.5 text-ink-800">
          <WhatsAppIcon className="h-5 w-5 text-[#128c4b]" /> WhatsApp
        </a>
        <a href="#quote" className="flex flex-col items-center gap-1 bg-brand-500 py-2.5 text-white">
          <Icon name="calendar" className="h-5 w-5" /> Free quote
        </a>
      </div>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-ink-900/20 transition-transform hover:scale-105 md:flex"
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
