import { cv } from '@/data/cv';
import { talks } from '@/data/talks';
import { cvDuration, formatCvRange } from '@/lib/cv-dates';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

// A compact, single-column CV used only to render /jake-dawkins-cv.pdf (see scripts/cv-pdf.mjs).
// Linear markup keeps the PDF's text in reading order for applicant tracking systems.
export const metadata = pageMetadata({ title: 'CV (print)', path: '/cv/', noindex: true });

export default function CVPrint() {
  const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '');
  return (
    <article className="cv-print mx-auto max-w-[7.5in] font-sans text-[10pt] leading-snug text-ink">
      <header className="mb-3">
        <h1 className="font-serif text-[22pt] leading-none">{site.name}</h1>
        <p className="mt-1 text-[11pt]">
          {cv.title} · {cv.location}
        </p>
        <p className="mt-1 text-ink-2">{cv.availability}</p>
        <p className="mt-1 text-ink-2">
          {[site.url, ...site.socials.map((s) => s.href)].map(host).join(' · ')}
        </p>
      </header>

      <Section title="Summary">
        <p>{cv.summary.join(' ')}</p>
      </Section>

      <Section title="Experience">
        {cv.roles.map((role) => (
          <div key={role.id} className="mb-2.5">
            {role.positions.map((p, i) => {
              const duration = cvDuration(p.start, p.end);
              return (
                <div key={p.title} className={i ? 'mt-1.5' : ''}>
                  <h3 className="font-semibold">
                    {p.title}, {role.company}
                  </h3>
                  <p className="text-ink-2">
                    {formatCvRange(p.start, p.end)}
                    {duration && ` (${duration})`}
                    {p.location && ` · ${p.location}`}
                  </p>
                  {p.highlights.length > 0 && (
                    <ul className="mt-0.5 list-disc pl-4">
                      {p.highlights.map((h) => (
                        <li key={h.id}>{h.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            {role.stack.length > 0 && <p className="mt-0.5 text-ink-2">Tools: {role.stack.join(', ')}</p>}
          </div>
        ))}
      </Section>

      <Section title="Skills">
        {cv.skills.map((g) => (
          <p key={g.group}>
            <span className="font-semibold">{g.group}:</span> {g.items.join(', ')}
          </p>
        ))}
      </Section>

      <Section title="Certifications">
        {cv.certifications.map((c) => (
          <p key={c.name}>
            {c.name}, {c.issuer}. {c.status.note}.
          </p>
        ))}
      </Section>

      <Section title="Education">
        {cv.education.map((e) => (
          <p key={e.school}>
            {e.degree}, {e.school}, {e.years}. {e.honors}.
          </p>
        ))}
      </Section>

      <Section title="Talks">
        {talks.map((t) => (
          <p key={t.slug}>
            {t.title}, {t.event} ({t.date.slice(0, 4)})
          </p>
        ))}
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-3">
      <h2 className="mb-1 border-b border-line pb-0.5 text-[9pt] font-semibold uppercase tracking-wider text-ink-2">{title}</h2>
      {children}
    </section>
  );
}
