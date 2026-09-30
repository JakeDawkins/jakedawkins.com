import { getGardenEntries } from '@/lib/garden';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const entries = getGardenEntries().sort((a, b) => b.planted.localeCompare(a.planted));
  const items = entries
    .map((e) => {
      const link = e.url ?? absoluteUrl(`/blog/${e.slug}/`);
      // Posts used to live at /blog/<slug>. Keeping that as the guid stops readers re-showing old posts as new.
      const guid = e.url ?? `${site.url}/blog/${e.slug}`;
      return `    <item>
      <title>${esc(e.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">${esc(guid)}</guid>
      <description>${esc(e.description)}</description>
      <pubDate>${new Date(e.planted).toUTCString()}</pubDate>
${e.topics.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}/</link>
    <description>${esc(site.description)}</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(entries.map((e) => e.tended).sort().at(-1)!).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
