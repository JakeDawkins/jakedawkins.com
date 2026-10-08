export const READING_KINDS = ['article', 'post', 'paper', 'video', 'podcast', 'book'] as const;
export type ReadingKind = (typeof READING_KINDS)[number];

export const READING_KIND_LABEL: Record<ReadingKind, string> = {
  article: 'Article',
  post: 'Blog post',
  paper: 'Paper',
  video: 'Video',
  podcast: 'Podcast',
  book: 'Book',
};

export type ReadingItem = {
  title: string;
  url: string;
  /** Author or publication. */
  source: string;
  kind: ReadingKind;
  /** When it went on the list (YYYY-MM-DD). Freshness is computed from this. */
  added: string;
  /** Why it's interesting, in a sentence or two. */
  note?: string;
};

// Add entries to `items`. The home page section, /reading/ list, sitemap entry, and llms.txt section
// only appear when there is at least one. Copy a template below to start; commented entries are ignored.
const items: ReadingItem[] = [
  // Every field:
  // {
  //   title: 'A Brief History & Ethos of the Digital Garden',
  //   url: 'https://maggieappleton.com/garden-history',
  //   source: 'Maggie Appleton', // author or publication
  //   kind: 'article', // article | post | paper | video | podcast | book
  //   added: '2026-10-01', // YYYY-MM-DD. Drives freshness: Fresh <= 30 days, Recent <= 90, Stale after.
  //   note: 'Optional. Why it is interesting, in a sentence or two. Clamped to 2 lines on cards.',
  // },
  //
  // Minimal (no note):
  // {
  //   title: 'How to Do Great Work',
  //   url: 'https://www.paulgraham.com/greatwork.html',
  //   source: 'Paul Graham',
  //   kind: 'post',
  //   added: '2026-09-18',
  // },
  {
    title: 'Understanding is the new bottleneck',
    url: 'https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck.html',
    source: 'Geoffrey Litt',
    kind: 'post',
    added: '2026-10-08',
    note: "Agents can write code faster than we can absorb it. Here's why it still matters for humans to understand what they build — and some techniques for doing that efficiently: explainer docs, quizzes, micro-worlds, and shared spaces.",
  },
];

/** Newest first. */
export const reading = items.toSorted((a, b) => b.added.localeCompare(a.added));
