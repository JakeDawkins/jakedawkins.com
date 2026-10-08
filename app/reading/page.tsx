import { PageHeader } from '@/components/section-heading';
import { FreshnessIcon, ReadingCard } from '@/components/reading-card';
import { reading } from '@/data/reading';
import { FRESHNESS, FRESHNESS_META } from '@/lib/reading';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Reading',
  description: 'Articles, blog posts, and other things Jake Dawkins is reading right now, with when each was added.',
  path: '/reading/',
});

export default function ReadingPage() {
  return (
    <>
      <PageHeader title="Things I'm reading">
        <p>Articles, blog posts, and other things I&apos;m interested in right now. Each one fades as it gets older.</p>
      </PageHeader>

      <dl className="mb-12 grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-3">
        {FRESHNESS.map((f) => (
          <div key={f} className="relative pl-7">
            <dt className="text-sm font-medium text-ink">
              <FreshnessIcon freshness={f} className="absolute left-0 top-1 size-4" />
              {FRESHNESS_META[f].label} <span className="font-normal text-ink-3">· {FRESHNESS_META[f].plain}</span>
            </dt>
            <dd className="text-sm text-ink-3">{FRESHNESS_META[f].description}</dd>
          </div>
        ))}
      </dl>

      {reading.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reading.map((item) => (
            <li key={item.url}>
              <ReadingCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-ink-3">Nothing on the list right now.</p>
      )}
    </>
  );
}
