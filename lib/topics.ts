/**
 * Blog topic hubs (/blog/topic/{slug}/). New Markdown articles set `topic` in their frontmatter;
 * the 38 legacy WordPress posts are classified by their title.
 */
export type Topic = { slug: string; name: string; description: string; match: RegExp; service?: string };

export const TOPICS: Topic[] = [
  {
    slug: 'construction-waste',
    name: 'Construction Waste',
    description: 'Construction and renovation waste removal in Dubai: what debris can be removed, how disposal works, and how to plan a clean site handover.',
    match: /construction|debris|renovation|rubble/i,
    service: '/services/construction-waste-removal/',
  },
  {
    slug: 'garden-waste',
    name: 'Garden Waste',
    description: 'Garden waste removal guides for Dubai villas and communities: palm fronds, branches, leaves and full yard clean-ups after landscaping.',
    match: /garden|yard|green waste/i,
    service: '/services/yard-garden-waste-cleanup/',
  },
  {
    slug: 'commercial',
    name: 'Office & Commercial',
    description: 'Office clearance and commercial junk removal in Dubai: clearing desks, equipment, warehouse waste and shop fixtures with minimal disruption.',
    match: /office (junk|cleanout|furniture removal)|commercial|warehouse|workplace/i,
    service: '/services/commercial-waste-management/',
  },
  {
    slug: 'furniture-appliances',
    name: 'Furniture & Appliances',
    description: 'Furniture and appliance disposal in Dubai: how to get rid of sofas, beds, mattresses, fridges, washing machines and old AC units responsibly.',
    match: /furniture|sofa|bed|mattress|appliance|washing machine|fridge|refrigerator/i,
    service: '/services/furniture-appliance-disposal/',
  },
  {
    slug: 'home-cleanouts',
    name: 'Home Cleanouts',
    description: 'Home cleanout guides for Dubai: apartment and villa clear-outs, moving-out junk removal and decluttering before a tenancy handover.',
    match: /house|home|residential|apartment|villa|cleanout|clearing|take my junk/i,
    service: '/services/household-junk-removal/',
  },
  {
    slug: 'guides',
    name: 'Junk Removal Guides',
    description: 'Practical guides to junk removal and waste collection in Dubai: how pricing works, planning a collection and choosing the right provider.',
    match: /./,
  },
];

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);

/** Topic for a post: explicit frontmatter topic wins, otherwise first title match. */
export const classifyTopic = (title: string, explicit?: string) =>
  (explicit && topicBySlug(explicit)) || TOPICS.find((t) => t.match.test(title)) || TOPICS[TOPICS.length - 1];
