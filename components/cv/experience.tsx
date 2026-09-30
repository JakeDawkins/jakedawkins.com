'use client';

import { useEffect, useState } from 'react';
import type { Role } from '@/data/cv';
import { formatCvRange } from '@/lib/cv-dates';
import { Evidence, evidenceSummary } from './evidence';

/**
 * `durations` is computed at build time so server and client render the same text.
 * Keys are `<role id>` for the company span and `<role id>:<position index>` for each position.
 */
export function Experience({ roles, durations }: { roles: Role[]; durations: Record<string, string | null> }) {
  const withEvidence = roles.flatMap((r) => r.positions.flatMap((p) => p.highlights.filter((h) => h.evidence?.length).map((h) => h.id)));
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [activeRole, setActiveRole] = useState(roles[0].id);
  const allOpen = open.size === withEvidence.length;

  // Deep links like /cv/#apollo-rover open that highlight's evidence.
  useEffect(() => {
    function fromHash() {
      const id = window.location.hash.slice(1);
      if (withEvidence.includes(id)) {
        setOpen((prev) => new Set(prev).add(id));
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveRole(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    roles.forEach((r) => {
      const el = document.getElementById(r.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [roles]);

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const toggleAll = (
    <button
      type="button"
      onClick={() => setOpen(allOpen ? new Set() : new Set(withEvidence))}
      className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-2 hover:border-ink-3/50 hover:text-ink"
    >
      {allOpen ? 'Collapse all receipts' : 'Expand all receipts'}
    </button>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
      <aside className="no-print hidden lg:block">
        <div className="sticky top-24">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-3">Experience</p>
          <ul className="space-y-1 border-l border-line text-sm">
            {roles.map((r) => (
              <li key={r.id}>
                <a
                  href={`#${r.id}`}
                  className={`-ml-px block border-l py-1 pl-3 transition-colors ${
                    activeRole === r.id ? 'border-accent-mark text-ink' : 'border-transparent text-ink-3 hover:text-ink-2'
                  }`}
                >
                  {r.company}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">{toggleAll}</div>
        </div>
      </aside>

      <ol className="space-y-16">
        <li className="no-print -mb-8 lg:hidden">{toggleAll}</li>
        {roles.map((role) => (
          <li key={role.id} id={role.id} className="scroll-mt-24">
            <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-2xl tracking-tight">
                {role.companyUrl ? (
                  <a href={role.companyUrl} className="hover:text-accent">
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
              </h3>
              {role.positions.length > 1 && durations[role.id] && <p className="font-mono text-xs text-ink-3">{durations[role.id]}</p>}
            </header>

            <ol className={role.positions.length > 1 ? 'space-y-8 border-l border-line pl-5' : 'space-y-8'}>
              {role.positions.map((position, pi) => {
                const duration = durations[`${role.id}:${pi}`];
                return (
                  <li key={position.title} className="relative">
                    {role.positions.length > 1 && (
                      <span aria-hidden className="absolute -left-[25px] top-2 size-2 rounded-full border border-line bg-bg" />
                    )}
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-medium text-ink">{position.title}</h4>
                      <p className="font-mono text-xs text-ink-3">
                        {formatCvRange(position.start, position.end)}
                        {duration && ` · ${duration}`}
                      </p>
                    </div>
                    {position.location && <p className="text-sm text-ink-3">{position.location}</p>}

                    {position.highlights.length > 0 && (
                      <ul className="mt-4 space-y-3">
                        {position.highlights.map((h) => {
                          const isOpen = open.has(h.id);
                          const hasEvidence = !!h.evidence?.length;
                          return (
                            <li key={h.id} id={h.id} className="scroll-mt-24">
                              <div className="flex gap-3">
                                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink-3" />
                                <div className="min-w-0 flex-1">
                                  <p id={`${h.id}-text`} className="leading-relaxed text-ink-2">{h.text}</p>
                                  {hasEvidence && (
                                    <button
                                      type="button"
                                      onClick={() => toggle(h.id)}
                                      aria-expanded={isOpen}
                                      aria-controls={`${h.id}-evidence`}
                                      aria-describedby={`${h.id}-text`}
                                      className="no-print mt-1.5 inline-flex items-center gap-1.5 text-xs text-ink-3 hover:text-accent"
                                    >
                                      <svg
                                        viewBox="0 0 16 16"
                                        className={`size-3 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden
                                      >
                                        <path d="m6 4 4 4-4 4" />
                                      </svg>
                                      {isOpen ? 'Hide receipts' : 'Show receipts'}
                                      <span>· {evidenceSummary(h.evidence!)}</span>
                                    </button>
                                  )}
                                  {/* Always rendered so scrapers and search engines see the evidence; `hidden` collapses it. */}
                                  {hasEvidence && (
                                    <div id={`${h.id}-evidence`} hidden={!isOpen} className="mt-4 grid gap-3">
                                      {h.evidence!.map((e, i) => (
                                        <Evidence key={i} item={e} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>

            {role.stack.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
                {role.stack.map((s) => (
                  <li key={s} className="rounded-full bg-sunken px-2.5 py-0.5 text-xs text-ink-2">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
