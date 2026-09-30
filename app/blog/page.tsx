import { GardenIndex } from '@/components/garden-index';
import { JsonLd } from '@/components/json-ld';
import { PageHeader } from '@/components/section-heading';
import { StageIcon } from '@/components/stage';
import { STAGES, STAGE_META, getAllTopics, getGardenEntries } from '@/lib/garden';
import { breadcrumbJsonLd, pageMetadata, person } from '@/lib/seo';
import { BLOG_DESCRIPTION } from '@/lib/garden-meta';
import { absoluteUrl, site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Writing',
  description:
    "Jake Dawkins's blog: articles, notes, and short tips on React, GraphQL, web accessibility, and Rust. Each post is labeled draft, in progress, complete, or outdated.",
  path: '/blog/',
});

export default function WritingPage() {
  const entries = getGardenEntries();
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': absoluteUrl('/blog/#blog'),
            name: `${site.name}'s blog`,
            description: BLOG_DESCRIPTION,
            url: absoluteUrl('/blog/'),
            author: { '@id': person['@id'] },
            blogPost: entries.map((e) => ({
              '@type': 'BlogPosting',
              headline: e.title,
              description: e.description,
              url: e.url ?? absoluteUrl(`/blog/${e.slug}/`),
              datePublished: e.planted,
              dateModified: e.tended,
              creativeWorkStatus: STAGE_META[e.stage].status,
            })),
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/blog/' },
          ]),
        ]}
      />
      <PageHeader eyebrow="Blog" title="Writing">
        <p>
          Blog posts, notes, and short tips. Some are polished, some are works in progress, and each one is labeled with
          how finished it is. I think of it as a{' '}
          <a href="https://maggieappleton.com/garden-history" className="text-link">
            digital garden
          </a>
          .
        </p>
      </PageHeader>

      <dl className="mb-12 grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s) => (
          <div key={s} className="relative pl-8">
            <dt className="text-sm font-medium text-ink">
              <StageIcon stage={s} className="absolute left-0 top-0.5 size-5" />
              {STAGE_META[s].label} <span className="font-normal text-ink-3">· {STAGE_META[s].plain}</span>
            </dt>
            <dd className="text-sm text-ink-3">{STAGE_META[s].description}</dd>
          </div>
        ))}
      </dl>

      <GardenIndex entries={entries} topics={getAllTopics()} />
    </>
  );
}
