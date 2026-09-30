import { BLOG_DESCRIPTION, STAGE_META, TYPE_META } from '@/lib/garden-meta';
import { cvMarkdown } from '@/lib/cv-markdown';
import { getGardenPost, getLocalSlugs } from '@/lib/garden';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

// The full CV plus every local post as raw markdown, so agents can read the whole site in one request.
export function GET() {
  const posts = getLocalSlugs().map((slug) => getGardenPost(slug)!);
  const body = [
    `# ${site.name}: full text of the site`,
    `This file has two parts: the CV, then every blog post. ${BLOG_DESCRIPTION}`,
    '---',
    cvMarkdown(),
    '---',
    '# Blog posts',
    ...posts.map((p) => {
      const stage = STAGE_META[p.stage];
      return `---\n\n## ${p.title}\n\nURL: ${absoluteUrl(`/blog/${p.slug}/`)}\nType: ${TYPE_META[p.type].label} (${TYPE_META[p.type].description.toLowerCase()})\nMaturity: ${stage.plain} (${stage.description})\nPublished: ${p.planted}\nLast updated: ${p.tended}\nTopics: ${p.topics.join(', ')}\n\n> ${p.description}\n\n${p.body.trim()}\n`;
    }),
  ].join('\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
