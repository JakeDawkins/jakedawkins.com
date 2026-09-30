// Client-safe blog types and constants. The fs-based loader lives in ./garden.

/** Plain-language framing for people and agents who haven't heard of a digital garden. */
export const BLOG_DESCRIPTION =
  'Mostly technical blog posts, plus shorter notes and tips. Every post is labeled with a maturity level: draft, in progress, complete, or outdated.';

export const STAGES = ['seedling', 'budding', 'evergreen', 'outdated'] as const;
export type Stage = (typeof STAGES)[number];

export const NOTE_TYPES = ['article', 'note', 'til'] as const;
export type NoteType = (typeof NOTE_TYPES)[number];

/**
 * Maturity stages. The garden names are paired with plain words (`plain`) everywhere they appear,
 * and `status` is the schema.org creativeWorkStatus value so search engines and agents can read it.
 */
export const STAGE_META: Record<Stage, { label: string; plain: string; description: string; status: string }> = {
  seedling: { label: 'Seedling', plain: 'Draft', description: 'Early idea. Rough and likely to change.', status: 'Draft' },
  budding: { label: 'Budding', plain: 'In progress', description: 'Useful, but still being revised.', status: 'Incomplete' },
  evergreen: { label: 'Evergreen', plain: 'Complete', description: 'Stable and considered. I stand behind this one.', status: 'Published' },
  outdated: { label: 'Outdated', plain: 'No longer current', description: 'Kept for reference. The advice or APIs have moved on.', status: 'Obsolete' },
};

export const TYPE_META: Record<NoteType, { label: string; plural: string; description: string }> = {
  article: { label: 'Article', plural: 'Articles', description: 'Long-form blog post' },
  note: { label: 'Note', plural: 'Notes', description: 'Shorter working notes' },
  til: { label: 'TIL', plural: 'TILs', description: 'Today I learned: a short tip' },
};

export type GardenEntry = {
  slug: string;
  title: string;
  description: string;
  type: NoteType;
  stage: Stage;
  planted: string;
  tended: string;
  topics: string[];
  featured: boolean;
  readingMinutes: number;
  /** Set for writing published elsewhere. These link out and get no local page. */
  url?: string;
};
