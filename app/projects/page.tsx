import { ProjectCard } from '@/components/project-card';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/section-heading';
import { PROJECT_STATUSES, PROJECT_STATUS_META, projects } from '@/data/projects';

export const metadata = pageMetadata({
  title: 'Projects',
  description: 'Apps and open source from Jake Dawkins, including Trample, Stitch, and Trek.',
  path: '/projects/',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Things I make">
        <p>Apps, open source, and experiments.</p>
      </PageHeader>

      <div className="space-y-16">
        {PROJECT_STATUSES.map((status) => {
          const list = projects.filter((p) => p.status === status);
          if (!list.length) return null;
          return (
            <section key={status}>
              <div className="mb-5 flex items-baseline gap-3 border-b border-line pb-3">
                <h2 className="font-serif text-2xl tracking-tight">{PROJECT_STATUS_META[status].label}</h2>
                <p className="text-sm text-ink-3">{PROJECT_STATUS_META[status].description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
