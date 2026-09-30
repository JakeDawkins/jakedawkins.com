import type { Role } from '@/data/cv';

// CV dates are `YYYY-MM`, or `YYYY` when only the year is known.
const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatCvDate(date: string) {
  return date.length === 4 ? date : monthYear.format(new Date(`${date}-01`));
}

export function formatCvRange(start: string, end: string | null) {
  return `${formatCvDate(start)} – ${end ? formatCvDate(end) : 'Present'}`;
}

function toMonth(date: string) {
  const [y, m] = date.split('-').map(Number);
  return y * 12 + (m - 1);
}

/** Inclusive month count, like LinkedIn. Null when either end has no month. */
export function cvDuration(start: string, end: string | null, now = new Date()) {
  const endValue = end ?? `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  if (start.length === 4 || endValue.length === 4) return null;
  const months = toMonth(endValue) - toMonth(start) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr` : null, m ? `${m} mo` : null].filter(Boolean).join(' ');
}

/** Span across every position at a company, e.g. for the company header. */
export function roleSpan(role: Role) {
  const starts = role.positions.map((p) => p.start).filter((d) => d.length > 4).sort();
  const ends = role.positions.map((p) => p.end);
  const end = ends.includes(null) ? null : (ends as string[]).filter((d) => d.length > 4).sort().at(-1)!;
  return { start: starts[0], end };
}
