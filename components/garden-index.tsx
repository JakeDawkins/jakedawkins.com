'use client';

import { useEffect, useMemo, useState } from 'react';
import { NOTE_TYPES, STAGES, STAGE_META, TYPE_META, type GardenEntry, type NoteType, type Stage } from '@/lib/garden-meta';
import { NoteCard } from './note-card';
import { StageIcon } from './stage';

type Sort = 'tended' | 'planted';

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
        active ? 'border-ink bg-ink text-bg' : 'border-line text-ink-2 hover:border-ink-3/50 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

export function GardenIndex({ entries, topics }: { entries: GardenEntry[]; topics: { topic: string; count: number }[] }) {
  const [type, setType] = useState<NoteType | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>('tended');

  // Accept ?topic=, ?type=, ?stage= so other pages can deep link into a filtered view.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('type');
    const s = q.get('stage');
    if (t && (NOTE_TYPES as readonly string[]).includes(t)) setType(t as NoteType);
    if (s && (STAGES as readonly string[]).includes(s)) setStage(s as Stage);
    if (q.get('topic')) setTopic(q.get('topic'));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (type) q.set('type', type);
    if (stage) q.set('stage', stage);
    if (topic) q.set('topic', topic);
    const qs = q.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [type, stage, topic]);

  const filtered = useMemo(
    () =>
      entries
        .filter((e) => (!type || e.type === type) && (!stage || e.stage === stage) && (!topic || e.topics.includes(topic)))
        .sort((a, b) => b[sort].localeCompare(a[sort])),
    [entries, type, stage, topic, sort],
  );

  const hasFilters = type || stage || topic;

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={!type} onClick={() => setType(null)}>
            Everything <span className="opacity-60">{entries.length}</span>
          </Chip>
          {NOTE_TYPES.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(type === t ? null : t)}>
              {TYPE_META[t].plural} <span className="opacity-60">{entries.filter((e) => e.type === t).length}</span>
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Maturity">
            {STAGES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={stage === s}
                onClick={() => setStage(stage === s ? null : s)}
                title={STAGE_META[s].description}
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                  stage === s ? 'bg-sunken text-ink' : 'text-ink-3 hover:text-ink'
                }`}
              >
                <StageIcon stage={s} />
                {STAGE_META[s].label} <span className="text-ink-3">· {STAGE_META[s].plain}</span>
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-ink-3">
            Topic
            <select
              value={topic ?? ''}
              onChange={(e) => setTopic(e.target.value || null)}
              className="rounded-md border border-line bg-surface px-2 py-1 text-ink"
            >
              <option value="">All</option>
              {topics.map(({ topic: t, count }) => (
                <option key={t} value={t}>
                  {t} ({count})
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-ink-3">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-md border border-line bg-surface px-2 py-1 text-ink"
            >
              <option value="tended">Recently updated</option>
              <option value="planted">Newest</option>
            </select>
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setType(null);
                setStage(null);
                setTopic(null);
              }}
              className="text-ink-3 underline underline-offset-2 hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <h2 className="sr-only">Posts</h2>
      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
      </p>

      {filtered.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <li key={e.slug}>
              <NoteCard entry={e} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-ink-3">No posts match these filters.</p>
      )}
    </div>
  );
}
