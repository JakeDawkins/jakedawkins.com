import { EmailLink } from '@/components/email-link';
import { RichText } from '@/components/rich-text';
import { cv } from '@/data/cv';
import { projects } from '@/data/projects';
import { talks, type Talk } from '@/data/talks';
import { formatCvRange } from '@/lib/cv-dates';
import { getGardenEntries } from '@/lib/garden';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

// The CV used only to render /jake-dawkins-cv.pdf (see scripts/cv-pdf.mjs). It shows the subset of
// data/cv.ts marked for the PDF. Single column with plain text order so applicant tracking systems parse it cleanly.
export const metadata = { ...pageMetadata({ path: '/cv/', noindex: true }), title: { absolute: `${site.name} CV` } };

const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
const talkLine = (t: Talk) => `${t.title} (${t.event.replace(/ \d{4}$/, '')}, ${t.date.slice(0, 4)})`;

export default function CVPrint() {
  const roles = cv.roles
    .map((role) => ({
      ...role,
      positions: role.positions
        .map((p) => ({ ...p, highlights: p.highlights.filter((h) => h.pdf) }))
        .filter((p) => p.highlights.length),
    }))
    .filter((role) => role.positions.length);

  const posts = getGardenEntries();
  const writing = cv.pdf.writing.map((slug) => {
    const post = posts.find((p) => p.slug === slug);
    if (!post) throw new Error(`cv.pdf.writing: no blog post "${slug}"`);
    return post.url ? `${post.title} (${host(post.url)})` : post.title;
  });
  const openSource = [
    ...new Set(roles.flatMap((r) => r.positions.flatMap((p) => p.highlights.flatMap((h) => h.evidence ?? []))).flatMap((e) => (e.kind === 'link' && e.openSource ? [e.openSource] : []))),
  ];
  const lines = [
    { label: 'Conference talks', text: talks.filter((t) => t.cv === 'talk').map(talkLine).join('; ') },
    { label: 'Teaching', text: talks.filter((t) => t.cv === 'teaching').map(talkLine).join('; ') },
    { label: 'Writing', text: writing.join('; ') },
    { label: 'Open source', text: openSource.join(', ') },
    ...projects.filter((p) => p.cv).map((p) => ({ label: p.title, text: p.description })),
  ];

  return (
    <article className="cv-print font-sans text-[9.5pt] leading-[1.45] text-ink">
      <header className="border-b-2 border-accent pb-3">
        <h1 className="font-serif text-[26pt] leading-none tracking-tight">{site.name}</h1>
        <p className="mt-1.5 text-[11.5pt] font-medium text-ink-2">{cv.title}</p>
        <p className="mt-2 text-[9pt] text-ink-2">
          <EmailLink />
          {[...site.socials.map((s) => s.href), site.url].map((href) => (
            <span key={href}>
              <Dot />
              <a href={href}>{href.replace(/^https?:\/\/(www\.)?/, '')}</a>
            </span>
          ))}
        </p>
        <p className="text-[9pt] text-ink-2">
          {cv.location}
          {cv.jobSearch.public && (
            <>
              <Dot />
              {cv.jobSearch.workPreference}
              <Dot />
              <span className="font-semibold text-ink">{cv.jobSearch.rightToWork}</span>
            </>
          )}
        </p>
      </header>

      <Section title="Profile">
        <p className="text-ink-2">{cv.summary.join(' ')}</p>
      </Section>

      <Section title="Experience">
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id}>
              <h3 className="font-serif text-[13pt] leading-tight">
                {role.company}
                {role.description && <span className="font-sans text-[8.5pt] text-ink-3"> · {role.description}</span>}
              </h3>
              {role.positions.map((p) => (
                <div key={p.title} className="mt-1.5">
                  <h4 className="flex items-baseline justify-between gap-4 font-semibold">
                    <span>{p.title}</span>
                    <span className="shrink-0 text-[8.5pt] font-normal tabular-nums text-ink-3">
                      {formatCvRange(p.start, p.end)}
                      {p.location && ` · ${p.location}`}
                    </span>
                  </h4>
                  {/* Native markers, not positioned dots: positioned elements are painted, and so
                      written into the PDF's text, after everything else, which scrambles ATS parsing. */}
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-ink-2 marker:text-accent">
                    {p.highlights.map((h) => (
                      <li key={h.id} className="pl-0.5">
                        <RichText text={h.text} boldClassName="font-semibold text-ink" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-0.5">
          {cv.skills.map((g) => (
            <div key={g.group}>
              <dt className="inline font-semibold">{g.group}: </dt>
              <dd className="inline text-ink-2">{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Talks, writing, and projects">
        <dl className="space-y-0.5">
          {lines.map((line) => (
            <div key={line.label}>
              <dt className="inline font-semibold">{line.label}: </dt>
              <dd className="inline text-ink-2">{line.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education and certification">
        {cv.education.map((e) => (
          <p key={e.school}>
            <span className="font-semibold">{e.degree}</span>
            <span className="text-ink-2">
              , {e.school}, {e.years.split(/\s*–\s*/).at(-1)}
            </span>
          </p>
        ))}
        {cv.certifications.map((c) => (
          <p key={c.name}>
            <span className="font-semibold">{c.name}</span>
            <span className="text-ink-2">
              , {c.issuer}, {c.status.note}
            </span>
          </p>
        ))}
      </Section>
    </article>
  );
}

function Dot() {
  return <span className="text-ink-3"> · </span>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 flex items-center gap-3 text-[8pt] font-semibold uppercase tracking-[0.12em] text-accent after:h-px after:flex-1 after:bg-line">
        {title}
      </h2>
      {children}
    </section>
  );
}
