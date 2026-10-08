// Reading list freshness. Computed from `added` at build time; the weekly scheduled rebuild keeps it current.

export const FRESHNESS = ['fresh', 'recent', 'stale'] as const;
export type Freshness = (typeof FRESHNESS)[number];

export const FRESHNESS_META: Record<Freshness, { label: string; plain: string; description: string; maxDays: number }> = {
  fresh: { label: 'Fresh', plain: 'This month', description: 'Added in the last 30 days. On my mind right now.', maxDays: 30 },
  recent: { label: 'Recent', plain: 'Last few months', description: 'Added 1 to 3 months ago. Still thinking about it.', maxDays: 90 },
  stale: { label: 'Stale', plain: 'A while ago', description: 'Added over 3 months ago. Kept for reference.', maxDays: Infinity },
};

const DAY = 24 * 60 * 60 * 1000;

export function daysSince(date: string, now = new Date()) {
  return Math.max(0, Math.floor((now.getTime() - new Date(date).getTime()) / DAY));
}

export function getFreshness(added: string, now = new Date()): Freshness {
  const days = daysSince(added, now);
  return FRESHNESS.find((f) => days <= FRESHNESS_META[f].maxDays)!;
}
