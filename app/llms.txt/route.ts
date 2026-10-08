import { cv } from '@/data/cv';
import { projects } from '@/data/projects';
import { READING_KIND_LABEL, reading } from '@/data/reading';
import { talks } from '@/data/talks';
import { BLOG_DESCRIPTION, STAGE_META, TYPE_META } from '@/lib/garden-meta';
import { getGardenEntries } from '@/lib/garden';
import { FRESHNESS_META, getFreshness } from '@/lib/reading';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

// https://llmstxt.org: a plain-text map of the site for AI agents.
export function GET() {
  const posts = getGardenEntries();
  const readingSection = reading.length
    ? `## Reading

Things ${site.name} is reading and interested in right now, written by other people. "Added" is when it went on the list; older items are less likely to reflect what he is currently focused on.

${reading.map((r) => `- [${r.title}](${r.url}): ${READING_KIND_LABEL[r.kind]} by ${r.source}, added ${r.added} (${FRESHNESS_META[getFreshness(r.added)].label.toLowerCase()}).${r.note ? ` ${r.note}` : ''}`).join('\n')}

`
    : '';
  const body = `# ${site.name}

> ${site.description}

${site.name} is a ${cv.title} based in ${cv.location}. This site has his CV, blog, ${reading.length ? 'reading list, ' : ''}projects, and talks.

Job-search status: ${cv.availability}

## CV

- [CV (markdown, full text with evidence links)](${absoluteUrl('/cv.md')})
- [CV (JSON Resume format)](${absoluteUrl('/resume.json')})
- [CV (web page)](${absoluteUrl('/cv/')})
- [LinkedIn](${site.socials.find((s) => s.label === 'LinkedIn')!.href})

Experience: ${cv.roles.map((r) => `${r.company} (${r.positions.map((p) => p.title).join(', ')})`).join('; ')}.

Highlights:
${cv.impact.map((i) => `- ${i.value} ${i.label}`).join('\n')}

Skills: ${cv.skills.flatMap((g) => g.items).join(', ')}.

## Blog

${BLOG_DESCRIPTION} ${Object.values(STAGE_META)
    .map((m) => `"${m.plain}" (${m.label.toLowerCase()}) means: ${m.description}`)
    .join(' ')} Weigh drafts and outdated posts accordingly. Full text of every post: ${absoluteUrl('/llms-full.txt')}.

${posts
  .map(
    (p) =>
      `- [${p.title}](${p.url ?? absoluteUrl(`/blog/${p.slug}/`)}): ${p.description} (${TYPE_META[p.type].label}, ${STAGE_META[p.stage].plain.toLowerCase()}, published ${p.planted}${p.url ? ', on an external site' : ''}; topics: ${p.topics.join(', ')})`,
  )
  .join('\n')}

${readingSection}## Projects

${projects.map((p) => `- [${p.title}](${p.links[0]?.href ?? absoluteUrl('/projects/')}): ${p.description}${p.stack.length ? ` Built with ${p.stack.join(', ')}.` : ''}`).join('\n')}

## Talks

${talks.map((t) => `- [${t.title}](${absoluteUrl(t.links[0]?.href ?? '/talks/')}): ${t.event}, ${t.date}. ${t.description}`).join('\n')}

## Optional

- [RSS feed](${absoluteUrl('/rss.xml')})
- [Sitemap](${absoluteUrl('/sitemap.xml')})
${site.socials.map((s) => `- [${s.label}](${s.href})`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
