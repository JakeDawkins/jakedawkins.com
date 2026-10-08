import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export * from './garden-meta';
import type { GardenEntry } from './garden-meta';

export type GardenPost = GardenEntry & { body: string; format: 'md' | 'mdx' };

const DIR = path.join(process.cwd(), 'content/blog');
/** Documents the frontmatter options. Never published. */
const TEMPLATE = 'TEMPLATE.md';

// YAML parses bare dates into Date objects; keep them as YYYY-MM-DD strings.
function toDate(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

function load(): GardenPost[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f) && f !== TEMPLATE)
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title,
        description: data.description,
        type: data.type,
        stage: data.stage,
        planted: toDate(data.planted),
        tended: toDate(data.tended ?? data.planted),
        topics: data.topics ?? [],
        featured: Boolean(data.featured),
        ...(data.url ? { url: String(data.url) } : {}),
        readingMinutes: Math.max(1, Math.round(words / 230)),
        body: content,
        format: file.endsWith('.mdx') ? 'mdx' : 'md',
      } satisfies GardenPost;
    })
    .sort((a, b) => b.tended.localeCompare(a.tended));
}

let cache: GardenPost[] | null = null;
function all() {
  return (cache ??= load());
}

/** Metadata only, safe to hand to client components. */
export function getGardenEntries(): GardenEntry[] {
  return all().map(({ body: _body, format: _format, ...entry }) => entry);
}

/** Local posts only; external entries have no page of their own. */
export function getGardenPost(slug: string) {
  return all().find((p) => p.slug === slug && !p.url);
}

export function getLocalSlugs() {
  return all()
    .filter((p) => !p.url)
    .map((p) => p.slug);
}

export function getAllTopics() {
  const counts = new Map<string, number>();
  for (const p of all()) for (const t of p.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([topic, count]) => ({ topic, count }));
}

/** Posts that link to `slug` via a markdown link to /blog/<slug>. */
export function getBacklinks(slug: string): GardenEntry[] {
  const needles = [`](/blog/${slug})`, `](/blog/${slug}/)`];
  return all()
    .filter((p) => p.slug !== slug && needles.some((n) => p.body.includes(n)))
    .map(({ body: _body, format: _format, ...entry }) => entry);
}

export function getRelated(post: GardenEntry, limit = 3): GardenEntry[] {
  return getGardenEntries()
    .filter((e) => e.slug !== post.slug)
    .map((e) => ({ e, score: e.topics.filter((t) => post.topics.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ e }) => e);
}
