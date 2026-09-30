import Link from 'next/link';
import { TYPE_META, type GardenEntry } from '@/lib/garden-meta';
import { formatMonthYear } from '@/lib/format';
import { StageBadge } from './stage';

/** External entries link out; everything else goes to its post page. */
function EntryLink({ entry, className, children }: { entry: GardenEntry; className: string; children: React.ReactNode }) {
  return entry.url ? (
    <a href={entry.url} className={className}>
      {children}
    </a>
  ) : (
    <Link href={`/blog/${entry.slug}/`} className={className}>
      {children}
    </Link>
  );
}

/** `feature` is the larger treatment used on the home page. */
export function NoteCard({ entry, feature = false }: { entry: GardenEntry; feature?: boolean }) {
  const isArticle = entry.type === 'article';
  return (
    <EntryLink
      entry={entry}
      className={`group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-ink-3/40 hover:shadow-[0_6px_24px_-12px_rgb(0_0_0/0.25)] ${
        isArticle ? 'sm:p-6' : ''
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">{TYPE_META[entry.type].label}</span>
        <StageBadge stage={entry.stage} />
      </div>
      <h3 className={`font-serif leading-snug tracking-tight text-ink group-hover:text-accent ${feature ? 'text-3xl' : isArticle ? 'text-2xl' : 'text-lg'}`}>
        {entry.title}
      </h3>
      <p className={`leading-relaxed text-ink-2 ${feature ? 'mt-3 text-base' : 'mt-2 line-clamp-3 text-sm'}`}>{entry.description}</p>
      <p className="mt-auto pt-4 text-xs text-ink-3">
        {entry.url ? (
          <>Published {formatMonthYear(entry.planted)} · {new URL(entry.url).hostname} ↗</>
        ) : (
          <>
            {entry.tended === entry.planted ? 'Published' : 'Updated'} {formatMonthYear(entry.tended)} · {entry.readingMinutes} min
          </>
        )}
      </p>
    </EntryLink>
  );
}

export function NoteRow({ entry }: { entry: GardenEntry }) {
  return (
    <EntryLink entry={entry} className="group flex items-baseline gap-3 py-2.5">
      <StageBadge stage={entry.stage} showLabel={false} />
      <span className="text-ink group-hover:text-accent">{entry.title}</span>
      <span className="ml-auto shrink-0 font-mono text-[11px] uppercase tracking-wider text-ink-3">
        {TYPE_META[entry.type].label}
        {entry.url && ' ↗'}
      </span>
    </EntryLink>
  );
}
