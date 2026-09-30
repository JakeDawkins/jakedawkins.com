import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

// Everything is public and meant to be read, by search engines and AI agents alike.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url,
  };
}
