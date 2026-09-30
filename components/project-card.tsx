import { PROJECT_STATUS_META, type Project, type ProjectStatus } from '@/data/projects';

const DOT: Record<ProjectStatus, string> = {
  exploring: 'bg-seedling',
  building: 'bg-accent-mark',
  backburner: 'border border-ink-3',
  shipped: 'bg-budding',
  archived: 'bg-ink-3',
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const meta = PROJECT_STATUS_META[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-2" title={meta.description}>
      <span aria-hidden className={`size-2 rounded-full ${DOT[status]} ${status === 'building' ? 'animate-pulse' : ''}`} />
      {meta.label}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const primary = project.links[0];
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition hover:border-ink-3/40">
      <div className="mb-3 flex items-center justify-between">
        <ProjectStatusBadge status={project.status} />
        {project.date && <span className="font-mono text-xs text-ink-3">{project.date.slice(0, 4)}</span>}
      </div>
      <h3 className="font-serif text-xl tracking-tight">
        {primary ? (
          <a href={primary.href} className="after:absolute after:inset-0 group-hover:text-accent">
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{project.description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full bg-sunken px-2 py-0.5 text-[11px] text-ink-2">
              {s}
            </li>
          ))}
        </ul>
        <ul className="relative z-10 flex gap-3 text-xs">
          {project.links.map((l) => (
            <li key={l.href + l.label}>
              <a href={l.href} className="text-ink-3 hover:text-accent">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
