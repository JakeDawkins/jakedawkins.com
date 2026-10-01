import type { Talk } from '@/data/talks';
import { formatMonth, formatMonthYear } from '@/lib/format';

const KIND: Record<Talk['kind'], string> = { talk: 'Talk', workshop: 'Workshop', podcast: 'Podcast', panel: 'Panel', lecture: 'Guest lecture' };

// `grouped` rows sit under a year heading, so the date column collapses to a month in the meta line.
export function TalkRow({ talk, compact = false, grouped = false }: { talk: Talk; compact?: boolean; grouped?: boolean }) {
  return (
    <article className={`grid gap-x-6 gap-y-1 py-5 ${grouped ? 'sm:grid-cols-[1fr_auto]' : 'sm:grid-cols-[110px_1fr_auto]'}`}>
      {!grouped && <p className="font-mono text-xs text-ink-3 sm:pt-1">{formatMonthYear(talk.date)}</p>}
      <div>
        <h3 className="font-serif text-lg leading-snug tracking-tight text-ink">{talk.title}</h3>
        <p className="text-sm text-ink-3">
          {grouped && <>{formatMonth(talk.date)} · </>}
          {KIND[talk.kind]} · {talk.event}
          {!compact && talk.location && <> · {talk.location}</>}
        </p>
        {!compact && <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-2">{talk.description}</p>}
      </div>
      <ul className="flex gap-3 text-sm sm:pt-1">
        {talk.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-ink-2 hover:text-accent">
              {l.label} {l.href.startsWith('http') ? '↗' : '→'}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
