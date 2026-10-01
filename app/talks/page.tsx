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
      <PageHeader title="Talks & appearances">
        <p>Conference talks, a guest lecture, and a podcast, mostly about GraphQL, testing, and open source.</p>
      </PageHeader>
      <div className="border-b border-line">
        {[...byYear.entries()].map(([year, list]) => (
          <section key={year} className="grid border-t border-line sm:grid-cols-[80px_1fr] sm:gap-x-6">
            <h2 className="pt-5 font-serif text-lg leading-snug text-ink-3">{year}</h2>
            <div className="divide-y divide-line">
              {list.map((t) => (
                <TalkRow key={t.slug} talk={t} grouped />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
