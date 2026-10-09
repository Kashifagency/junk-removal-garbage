/**
 * Blog topic hubs (/blog/topic/{slug}/). New Markdown articles set `topic` in their frontmatter;
 * the 38 legacy WordPress posts are classified by their title.
 */
export type Topic = { slug: string; name: string; description: string; match: RegExp; service?: string };

export const TOPICS: Topic[] = [
  {
    slug: 'construction-waste',
    name: 'Construction Waste',
    description: 'Renovation debris, rubble and site clearance in Dubai: what can be removed, how disposal works, and how to plan a clean handover.',
    match: /construction|debris|renovation|rubble/i,
    service: '/services/construction-waste-removal/',
  },
  {
    slug: 'garden-waste',
    name: 'Garden Waste',
    description: 'Green waste, palm fronds and yard clean-ups for Dubai villas and communities.',
    match: /garden|yard|green waste/i,
    service: '/services/yard-garden-waste-cleanup/',
  },
  {
    slug: 'commercial',
    name: 'Office & Commercial',
    description: 'Office clearances, warehouse waste and business junk removal across Dubai.',
    match: /office (junk|cleanout|furniture removal)|commercial|warehouse|workplace/i,
    service: '/services/commercial-waste-management/',
  },
  {
    slug: 'furniture-appliances',
    name: 'Furniture & Appliances',
    description: 'Disposing of sofas, beds, mattresses, fridges and washing machines in Dubai — responsibly.',
    match: /furniture|sofa|bed|mattress|appliance|washing machine|fridge|refrigerator/i,
    service: '/services/furniture-appliance-disposal/',
  },
  {
    slug: 'home-cleanouts',
    name: 'Home Cleanouts',
    description: 'Apartment and villa clear-outs, moving-out junk and decluttering in Dubai.',
    match: /house|home|residential|apartment|villa|cleanout|clearing|take my junk/i,
    service: '/services/household-junk-removal/',
  },
  {
    slug: 'guides',
    name: 'Junk Removal Guides',
    description: 'Practical guides to junk removal and waste collection in Dubai: costs, planning and choosing a provider.',
    match: /./,
  },
];

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);

/** Topic for a post: explicit frontmatter topic wins, otherwise first title match. */
export const classifyTopic = (title: string, explicit?: string) =>
  (explicit && topicBySlug(explicit)) || TOPICS.find((t) => t.match.test(title)) || TOPICS[TOPICS.length - 1];
