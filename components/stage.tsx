import { STAGE_META, type Stage } from '@/lib/garden-meta';

const COLOR: Record<Stage, string> = {
  seedling: 'text-seedling',
  budding: 'text-budding',
  evergreen: 'text-evergreen',
  outdated: 'text-ink-3',
};

export function StageIcon({ stage, className = 'size-4' }: { stage: Stage; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} ${COLOR[stage]}`} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {stage === 'seedling' && (
        <>
          <path d="M12 21v-8" />
          <path d="M12 13c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" fill="currentColor" fillOpacity=".2" />
          <path d="M12 15c0-2.5 2-4.5 5-4.5 0 2.5-2 4.5-5 4.5Z" fill="currentColor" fillOpacity=".2" />
          <path d="M8 21h8" />
        </>
      )}
      {stage === 'budding' && (
        <>
          <path d="M12 21V9" />
          <path d="M12 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="currentColor" fillOpacity=".25" />
          <path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" fill="currentColor" fillOpacity=".2" />
          <path d="M12 17c0-2.5 2-4.5 5-4.5 0 2.5-2 4.5-5 4.5Z" fill="currentColor" fillOpacity=".2" />
        </>
      )}
      {stage === 'outdated' && (
        <>
          <path d="M6 18c0-6 4-11 12-12-1 8-6 12-12 12Z" fill="currentColor" fillOpacity=".15" />
          <path d="M6 18 12 12" />
          <path d="M4 20l2-2" />
        </>
      )}
      {stage === 'evergreen' && (
        <>
          <path d="M12 3 6 11h3l-4 6h14l-4-6h3l-6-8Z" fill="currentColor" fillOpacity=".25" />
          <path d="M12 17v4" />
        </>
      )}
    </svg>
  );
}

/** Garden name paired with plain words, e.g. "Evergreen · Complete". */
export function StageBadge({ stage, showLabel = true }: { stage: Stage; showLabel?: boolean }) {
  const meta = STAGE_META[stage];
  const text = `${meta.label} · ${meta.plain}`;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-2" title={meta.description}>
      <StageIcon stage={stage} />
      {showLabel ? (
        <span>
          {meta.label} <span className="text-ink-3">· {meta.plain}</span>
        </span>
      ) : (
        <span className="sr-only">{text}</span>
      )}
    </span>
  );
}
