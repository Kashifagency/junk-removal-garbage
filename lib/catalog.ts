import type { IconName } from '@/components/Icon';
import { getPageByPath, servicePages, type Block, type ImageRef } from './content';

type Card = Extract<Block, { type: 'card' }>;

export type Service = {
  path: string;
  title: string;
  short: string;
  text: string;
  image: ImageRef | null;
  icon: IconName;
};

const ICONS: Record<string, IconName> = {
  '/services/construction-waste-removal/': 'hardhat',
  '/services/household-junk-removal/': 'home',
  '/services/commercial-waste-management/': 'building',
  '/services/furniture-appliance-disposal/': 'sofa',
  '/services/yard-garden-waste-cleanup/': 'leaf',
};

const firstSentence = (s: string) => (s.match(/^.+?[.!?](\s|$)/)?.[0] ?? s).trim();

// Service summaries come from the cards on the original /services/ page.
const serviceCards = (getPageByPath('/services/')?.sections.flatMap((s) => s.blocks).filter((b) => b.type === 'card') ?? []) as Card[];

export const services: Service[] = servicePages.map((p) => {
  const card = serviceCards.find((c) => c.href === p.path || c.title === p.title);
  return {
    path: p.path,
    title: p.title,
    short: card ? firstSentence(card.text) : '',
    text: card?.text ?? '',
    image: card?.image ?? null,
    icon: ICONS[p.path] ?? 'truck',
  };
});

/** Items the business removes — wording taken from the service pages' "What we remove" lists. */
export const ITEMS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'sofa', title: 'Old furniture', text: 'Sofas, beds, mattresses, tables, cabinets, wardrobes' },
  { icon: 'fridge', title: 'Household appliances', text: 'Refrigerators, washing machines, ovens, AC units' },
  { icon: 'monitor', title: 'Electronics & e-waste', text: 'TVs, computers, printers, cables' },
  { icon: 'brick', title: 'Construction debris', text: 'Concrete, bricks, rubble, tiles, plaster, drywall' },
  { icon: 'leaf', title: 'Garden waste', text: 'Branches, palm fronds, leaves, soil, grass clippings' },
  { icon: 'box', title: 'General clutter', text: 'Boxes, carpets, toys, packaging, office equipment' },
];

export const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'phone', title: 'Tell us what needs to go', text: 'Call, WhatsApp photos, or fill in the contact form with your area in Dubai.' },
  { icon: 'tag', title: 'Clear, upfront pricing', text: 'Pricing based on volume, item type and access — agreed before any work starts.' },
  { icon: 'truck', title: 'We load and haul it away', text: 'Our crew does the lifting, from any floor, and leaves the space clean.' },
  { icon: 'recycle', title: 'Responsible disposal', text: 'Materials like metal, wood and electronics are recycled whenever possible, reducing landfill waste.' },
];

export const PROMISES = ['Same-day service available', 'Upfront, transparent pricing', 'Eco-friendly disposal', 'Homes & businesses'];
