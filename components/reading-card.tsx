import { READING_KIND_LABEL, type ReadingItem } from '@/data/reading';
import { formatDate } from '@/lib/format';
import { FRESHNESS_META, getFreshness, type Freshness } from '@/lib/reading';

const COLOR: Record<Freshness, string> = {
  fresh: 'text-budding',
  recent: 'text-seedling',
  stale: 'text-ink-3',
};

/** A dot that empties out as an item ages: solid, half, hollow. */
export function FreshnessIcon({ freshness, className = 'size-3.5' }: { freshness: Freshness; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`${className} ${COLOR[freshness]}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="8" cy="8" r="5.5" />
      {freshness === 'fresh' && <circle cx="8" cy="8" r="5.5" fill="currentColor" />}
      {freshness === 'recent' && <path d="M8 2.5a5.5 5.5 0 0 1 0 11Z" fill="currentColor" stroke="none" />}
    </svg>
  );
}

export function FreshnessBadge({ freshness }: { freshness: Freshness }) {
  const meta = FRESHNESS_META[freshness];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-2" title={`${meta.plain}. ${meta.description}`}>
      <FreshnessIcon freshness={freshness} />
      {meta.label}
    </span>
  );
}

/** Small card for the reading list. The whole card links out. */
export function ReadingCard({ item }: { item: ReadingItem }) {
  const freshness = getFreshness(item.added);
  return (
    <a
      href={item.url}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-ink-3/40"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">{READING_KIND_LABEL[item.kind]}</span>
        <FreshnessBadge freshness={freshness} />
      </div>
      {/* Stale titles drop to secondary ink rather than opacity, to keep text contrast. */}
      <h3
        className={`line-clamp-2 font-serif text-base leading-snug tracking-tight group-hover:text-accent ${
          freshness === 'stale' ? 'text-ink-2' : 'text-ink'
        }`}
      >
        {item.title}
      </h3>
      {item.note && <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-ink-2">{item.note}</p>}
      <p className="mt-auto truncate pt-3 text-xs text-ink-3">
        <time dateTime={item.added}>{formatDate(item.added)}</time> · {item.source} <span aria-hidden>↗</span>
      </p>
    </a>
  );
}
