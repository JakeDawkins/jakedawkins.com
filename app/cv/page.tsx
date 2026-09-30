import Link from 'next/link';
import { Experience } from '@/components/cv/experience';
import { cv } from '@/data/cv';
import { JsonLd } from '@/components/json-ld';
import { MockBanner } from '@/components/mock-banner';
import { cvDuration, roleSpan } from '@/lib/cv-dates';
import { breadcrumbJsonLd, pageMetadata, person } from '@/lib/seo';
import { site } from '@/lib/site';

const base = pageMetadata({
  title: 'CV',
  description:
    'CV of Jake Dawkins, Staff Software Engineer: experience at Homeaglow, Carbon Health, Apollo GraphQL, and Major League Soccer, with links backing up each claim.',
  path: '/cv/',
  noindex: cv.placeholder,
});

// Point agents at the machine-readable versions of this page.
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: {
      ...base.alternates?.types,
      'text/markdown': [{ url: '/cv.md', title: 'CV (markdown)' }],
      'application/json': [{ url: '/resume.json', title: 'CV (JSON Resume)' }],
      'application/pdf': [{ url: '/jake-dawkins-cv.pdf', title: 'CV (PDF)' }],
    },
  },
};

const linkedIn = site.socials.find((s) => s.label === 'LinkedIn')!.href;
const CV_PDF = '/jake-dawkins-cv.pdf';

export default function CVPage() {
  const durations: Record<string, string | null> = {};
  for (const role of cv.roles) {
    const span = roleSpan(role);
    durations[role.id] = cvDuration(span.start, span.end);
    role.positions.forEach((p, i) => (durations[`${role.id}:${i}`] = cvDuration(p.start, p.end)));
  }

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            url: `${site.url}/cv/`,
            mainEntity: {
              ...person,
              alumniOf: cv.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
              hasCredential: cv.certifications.map((c) => ({
                '@type': 'EducationalOccupationalCredential',
                name: c.name,
                recognizedBy: { '@type': 'Organization', name: c.issuer },
                expires: c.expires,
              })),
            },
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'CV', path: '/cv/' },
          ]),
        ]}
      />
      {cv.placeholder && <MockBanner />}
      <header className="mb-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-3">Curriculum vitae</p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">{site.name}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink">
            {cv.headline} <span className="text-ink-3">· {cv.location}</span>
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-ink-2">
            <span aria-hidden className="size-2 rounded-full bg-ink-3" />
            {cv.availability}
          </p>
          <div className="mt-4 space-y-3 leading-relaxed text-ink-2">
            {cv.summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="no-print flex flex-wrap gap-2 text-sm md:flex-col md:items-end">
          <a href={CV_PDF} download className="rounded-full bg-ink px-4 py-2 text-bg hover:opacity-85">
            Download PDF
          </a>
          <a href={linkedIn} className="rounded-full border border-line px-4 py-2 text-ink hover:border-ink-3/50">
            LinkedIn ↗
          </a>
        </div>
      </header>

      <section aria-labelledby="impact" className="mb-20">
        <h2 id="impact" className="mb-4 font-mono text-xs uppercase tracking-wider text-ink-3">
          Impact at a glance
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cv.impact.map((s) => (
            <li key={s.href} className="bg-bg">
              <a href={s.href} className="group block h-full p-5 hover:bg-surface">
                <p className="text-4xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-2 text-sm leading-snug text-ink-2">{s.label}</p>
                <p className="no-print mt-4 text-xs text-ink-3 group-hover:text-accent">Jump to receipts ↓</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="experience" className="mb-20">
        <h2 id="experience" className="sr-only">
          Experience
        </h2>
        <Experience roles={cv.roles} durations={durations} />
      </section>

      <section aria-labelledby="skills" className="mb-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-[180px_1fr]">
        <h2 id="skills" className="font-mono text-xs uppercase tracking-wider text-ink-3">
          Skills
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {cv.skills.map((g) => (
            <div key={g.group}>
              <h3 className="mb-3 font-serif text-lg">{g.group}</h3>
              <ul className="space-y-1.5 text-sm text-ink-2">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="education" className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[180px_1fr]">
        <h2 id="education" className="font-mono text-xs uppercase tracking-wider text-ink-3">
          Education & credentials
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {cv.education.map((e) => (
            <div key={e.school}>
              <h3 className="font-serif text-lg">{e.school}</h3>
              <p className="text-sm text-ink-2">{e.degree}</p>
              <p className="text-sm text-ink-3">
                {e.years} · {e.honors}
              </p>
            </div>
          ))}
          <div id="certifications" className="scroll-mt-24">
            <h3 className="font-serif text-lg">Certifications</h3>
            {cv.certifications.map((c) => (
              <div key={c.name} className="text-sm">
                <p className="text-ink-2">
                  {c.name} <span className="text-ink-3">· {c.issuer}</span>
                </p>
                <p className="text-ink-3">{c.status.note}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-serif text-lg">Speaking</h3>
            <p className="text-sm text-ink-2">
              Talks, a lecture, and a podcast on GraphQL, testing, and open source.{' '}
              <Link href="/talks/" className="text-link">
                See all talks →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
