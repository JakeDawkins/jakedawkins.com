import type { MetadataRoute } from 'next';
import { cv } from '@/data/cv';
import { getGardenEntries } from '@/lib/garden';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getGardenEntries().filter((e) => !e.url);
  const latest = posts.map((p) => p.tended).sort().at(-1);
  return [
    { url: absoluteUrl('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/blog/'), lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}/`),
      lastModified: p.tended,
      changeFrequency: 'monthly' as const,
      priority: p.stage === 'evergreen' ? 0.8 : 0.6,
    })),
    ...(cv.placeholder ? [] : [{ url: absoluteUrl('/cv/'), changeFrequency: 'monthly' as const, priority: 0.8 }]),
    { url: absoluteUrl('/projects/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/talks/'), changeFrequency: 'yearly', priority: 0.5 },
  ];
}
