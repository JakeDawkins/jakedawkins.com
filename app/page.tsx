import Link from 'next/link';
import { NoteCard, NoteRow } from '@/components/note-card';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { JsonLd } from '@/components/json-ld';
import { TalkRow } from '@/components/talk-row';
import { cv } from '@/data/cv';
import { projects } from '@/data/projects';
import { talks } from '@/data/talks';
import { getGardenEntries } from '@/lib/garden';
import { pageMetadata, person } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({ path: '/' });

export default function Home() {
  const entries = getGardenEntries();
  const featured = entries.filter((e) => e.featured).slice(0, 2);
  const recent = entries.filter((e) => !featured.includes(e)).slice(0, 5);

  return (
    <>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', ...person },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            name: site.name,
            url: site.url,
            description: site.description,
            publisher: { '@id': person['@id'] },
            inLanguage: 'en-US',
          },
        ]}
      />
      <section className="mb-24 max-w-3xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-wider text-ink-3">
          Hi, I&apos;m Jake
        </p>
        <h1 className="font-serif text-4xl leading-[1.15] tracking-tight text-ink sm:text-5xl">
          I build calm, usable products, and write about{' '}
          <Link
            href="/blog/?topic=react"
            className="italic text-accent hover:underline"
          >
            React
          </Link>
          ,{' '}
          <Link
            href="/blog/?topic=graphql"
            className="italic text-accent hover:underline"
          >
            GraphQL
          </Link>
          , and{' '}
          <Link
            href="/blog/?topic=accessibility"
            className="italic text-accent hover:underline"
          >
            web accessibility
          </Link>
          .
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          I&apos;m a full-stack Staff Engineer at Homeaglow, working in React,
          React Native, and Python/Django. Off the keyboard: home barista,
          usually out on my bike.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link
            href="/cv/"
            className="rounded-full bg-ink px-4 py-2 text-bg transition-opacity hover:opacity-85"
          >
            View my CV
          </Link>
          <Link
            href="/blog/"
            className="rounded-full border border-line px-4 py-2 text-ink hover:border-ink-3/50"
          >
            Read the blog
          </Link>
        </div>
        <p className="mt-4 text-sm text-ink-3">{cv.availability}</p>
      </section>

      <section className="mb-24">
        <SectionHeading title="Writing" href="/blog/" linkLabel="All posts" />
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.1fr]">
          {featured.map((e) => (
            <NoteCard key={e.slug} entry={e} feature />
          ))}
          <div className="rounded-2xl border border-line p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-ink-3">
              Recently updated
            </p>
            <ul className="divide-y divide-line text-[15px]">
              {recent.map((e) => (
                <li key={e.slug}>
                  <NoteRow entry={e} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {!cv.placeholder && (
        <section className="mb-24">
          <SectionHeading
            title="Selected impact"
            href="/cv/"
            linkLabel="Full CV"
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {cv.impact.map((s) => (
              <li key={s.href} className="bg-bg">
                <Link
                  href={`/cv${s.href}`}
                  className="group block h-full p-5 hover:bg-surface"
                >
                  <p className="text-4xl font-semibold tracking-tight text-ink">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-ink-2">
                    {s.label}
                  </p>
                  <p className="mt-4 text-xs text-ink-3 group-hover:text-accent">
                    See the receipts →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-24">
        <SectionHeading title="Projects" href="/projects/" />
        <div className="grid gap-4 md:grid-cols-3">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Talks & appearances" href="/talks/" />
        <div className="divide-y divide-line">
          {talks.slice(0, 3).map((t) => (
            <TalkRow key={t.slug} talk={t} compact />
          ))}
        </div>
      </section>
    </>
  );
}
