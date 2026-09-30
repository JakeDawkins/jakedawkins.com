import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/section-heading';
import { TalkRow } from '@/components/talk-row';
import { talks } from '@/data/talks';

export const metadata = pageMetadata({
  title: 'Talks',
  description: 'Conference talks, a guest lecture, and a podcast from Jake Dawkins on GraphQL, testing, Apollo, and open source.',
  path: '/talks/',
});

export default function TalksPage() {
  const byYear = Map.groupBy(talks, (t) => t.date.slice(0, 4));
  return (
    <>
      <PageHeader eyebrow="Speaking" title="Talks & appearances">
        <p>Conference talks, a guest lecture, and a podcast, mostly about GraphQL, testing, and open source.</p>
      </PageHeader>
      <div className="space-y-12">
        {[...byYear.entries()].map(([year, list]) => (
          <section key={year} className="grid gap-4 sm:grid-cols-[80px_1fr]">
            <h2 className="font-serif text-2xl text-ink-3">{year}</h2>
            <div className="divide-y divide-line border-t border-line sm:border-t-0">
              {list.map((t) => (
                <TalkRow key={t.slug} talk={t} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
