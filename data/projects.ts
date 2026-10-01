export const PROJECT_STATUSES = ['shipped', 'building', 'exploring', 'backburner', 'archived'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_STATUS_META: Record<ProjectStatus, { label: string; description: string }> = {
  exploring: { label: 'Exploring', description: 'Prototypes and sketches. Might not go anywhere.' },
  building: { label: 'Building', description: 'Actively being worked on.' },
  backburner: { label: 'Backburner', description: 'Paused for now. I may pick it back up.' },
  shipped: { label: 'Shipped', description: 'Out in the world and maintained.' },
  archived: { label: 'Archived', description: 'Done or retired. Kept for reference.' },
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  /** Launch or start date, when known. */
  date?: string;
  stack: string[];
  /** Square app icon in /public. */
  logo?: string;
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'trample',
    title: 'Trample',
    description:
      'How many words can you make before you get trampled? A daily word game. No logins, no sign-ups, no ads. A new word and a new chance every day!',
    status: 'shipped',
    logo: '/images/projects/logo-trample.webp',
    stack: ['Next.js'],
    links: [{ label: 'Play', href: 'https://playtrample.com' }],
    featured: true,
  },
  {
    slug: 'stitch-journal',
    title: 'Stitch',
    description:
      'An interstitial journal: a running log of your day, kept moment by moment. Capture transitions on the Timeline, park stray thoughts in Notes, and export everything as Markdown. Private by default; nothing leaves your browser.',
    status: 'shipped',
    logo: '/images/projects/logo-stitch.webp',
    stack: [],
    links: [{ label: 'Website', href: 'https://stitchjournal.app' }],
    featured: true,
  },
  {
    slug: 'trek',
    title: 'Trek',
    description:
      'Your place for your places. Make lists. Save places. Get help from friends. Whether planning a vacation, or curating a list of your favorite hometown spots, Trek is your place.',
    status: 'backburner',
    date: '2025-01-29',
    logo: '/images/projects/logo-trek.webp',
    stack: ['Python', 'Django', 'Strawberry GraphQL', 'Apollo Client', 'React Native', 'Expo'],
    links: [{ label: 'Website', href: 'https://letstrek.app' }],
    featured: true,
  },
  {
    slug: 'react-style-guide',
    title: 'My Next.js/React/GraphQL App Template',
    description: 'My personal template for bootstrapping new React projects.',
    status: 'shipped',
    date: '2022-06-08',
    stack: ['Next.js', 'React', 'GraphQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/JakeDawkins/next-ts-apollo-template' }],
  },
];
