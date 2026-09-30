import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/json-ld';
import { Markdown } from '@/components/mdx';
import { NoteRow } from '@/components/note-card';
import { StageIcon } from '@/components/stage';
import { formatDate } from '@/lib/format';
import { STAGE_META, TYPE_META, getBacklinks, getGardenPost, getLocalSlugs, getRelated } from '@/lib/garden';
import { articleJsonLd, articleMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getGardenPost((await params).slug);
  return post ? articleMetadata(post) : {};
}

export default async function GardenPostPage({ params }: Props) {
  const post = getGardenPost((await params).slug);
  if (!post) notFound();

  const backlinks = getBacklinks(post.slug);
  const related = getRelated(post).filter((r) => !backlinks.some((b) => b.slug === r.slug));
  const stage = STAGE_META[post.stage];

  return (
    <article className="mx-auto max-w-2xl">
      <JsonLd data={articleJsonLd(post)} />
      <nav className="no-print mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/blog/" className="text-ink-3 hover:text-ink">
          ← Writing
        </Link>
      </nav>

      <header className="mb-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-ink-3">{TYPE_META[post.type].label}</p>
        <h1 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">{post.title}</h1>
        {post.type !== 'til' && <p className="mt-4 text-lg leading-relaxed text-ink-2">{post.description}</p>}

        <dl className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-3 text-sm">
          <div className="flex items-center gap-2" title={stage.description}>
            <dt className="sr-only">Maturity</dt>
            <StageIcon stage={post.stage} />
            <dd className="text-ink">
              {stage.label} <span className="text-ink-3">· {stage.plain}</span>
            </dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-ink-3">Published</dt>
            <dd className="text-ink-2">
              <time dateTime={post.planted}>{formatDate(post.planted)}</time>
            </dd>
          </div>
          {post.tended !== post.planted && (
            <div className="flex gap-1.5">
              <dt className="text-ink-3">Updated</dt>
              <dd className="text-ink-2">
                <time dateTime={post.tended}>{formatDate(post.tended)}</time>
              </dd>
            </div>
          )}
          <div className="flex gap-1.5">
            <dt className="sr-only">Reading time</dt>
            <dd className="text-ink-3">{post.readingMinutes} min read</dd>
          </div>
        </dl>
        {(post.stage === 'seedling' || post.stage === 'outdated') && (
          <p className="mt-4 rounded-lg bg-sunken px-4 py-3 text-sm text-ink-2">
            {post.stage === 'seedling'
              ? 'This is a draft: an early, rough idea. Expect gaps and opinions that may change.'
              : 'This post is outdated. It is kept for reference, but the advice or APIs it describes have moved on.'}
          </p>
        )}
      </header>

      <div className="prose prose-garden prose-lg max-w-none">
        <Markdown source={post.body} format={post.format} />
      </div>

      <footer className="mt-16 space-y-10 border-t border-line pt-8">
        {post.topics.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.topics.map((t) => (
              <li key={t}>
                <Link href={`/blog/?topic=${encodeURIComponent(t)}`} className="rounded-full bg-sunken px-3 py-1 text-sm text-ink-2 hover:text-ink">
                  #{t}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {backlinks.length > 0 && (
          <section>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-3">Linked from</h2>
            <ul className="divide-y divide-line">
              {backlinks.map((b) => (
                <li key={b.slug}>
                  <NoteRow entry={b} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-3">Related posts</h2>
            <ul className="divide-y divide-line">
              {related.map((r) => (
                <li key={r.slug}>
                  <NoteRow entry={r} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </footer>
    </article>
  );
}
