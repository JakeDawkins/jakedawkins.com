import { cv } from '@/data/cv';
import { projects, PROJECT_STATUS_META } from '@/data/projects';
import { talks } from '@/data/talks';
import { cvDuration, formatCvRange, roleSpan } from './cv-dates';
import { absoluteUrl, site } from './site';

/** The full CV as markdown, with every claim's evidence inlined. Served at /cv.md and in llms-full.txt. */
export function cvMarkdown() {
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(`# ${site.name}`, '', `${cv.title} · ${cv.location}`, '', `Status: ${cv.availability}`, '');
  push(`- Website: ${site.url}`, ...site.socials.map((s) => `- ${s.label}: ${s.href}`), `- CV (HTML): ${absoluteUrl('/cv/')}`, '');

  push('## Summary', '', ...cv.summary.flatMap((p) => [p, '']));

  push('## Highlights', '', ...cv.impact.map((i) => `- **${i.value}** ${i.label}`), '');

  push('## Experience', '');
  for (const role of cv.roles) {
    const span = roleSpan(role);
    const total = cvDuration(span.start, span.end);
    push(`### ${role.company}${total && role.positions.length > 1 ? ` (${total})` : ''}`, '');
    for (const p of role.positions) {
      const duration = cvDuration(p.start, p.end);
      push(`**${p.title}** · ${formatCvRange(p.start, p.end)}${duration ? ` (${duration})` : ''}${p.location ? ` · ${p.location}` : ''}`, '');
      for (const h of p.highlights) {
        push(`- ${h.text}`);
        for (const e of h.evidence ?? []) {
          if (e.kind === 'link') push(`  - Evidence: [${e.label}](${absoluteUrl(e.href)})${e.description ? ` (${e.description})` : ''}`);
          if (e.kind === 'quote') push(`  - Reference: "${e.quote}" (${e.author}, ${e.role})`);
          if (e.kind === 'metric') push(`  - Evidence: ${e.title}, ${e.source}`);
          if (e.kind === 'before-after') push(`  - Evidence: ${e.title} (before/after screenshots on ${absoluteUrl('/cv/')})`);
        }
      }
      if (p.highlights.length) push('');
    }
    if (role.stack.length) push(`Tools: ${role.stack.join(', ')}`, '');
  }

  push('## Skills', '', ...cv.skills.map((g) => `- **${g.group}:** ${g.items.join(', ')}`), '');
  push('## Certifications', '', ...cv.certifications.map((c) => `- ${c.name}, ${c.issuer}. ${c.status.note}.`), '');
  push('## Education', '', ...cv.education.map((e) => `- ${e.school}, ${e.degree}, ${e.years}. ${e.honors}.`), '');

  push('## Talks and appearances', '');
  for (const t of talks) push(`- [${t.title}](${absoluteUrl(t.links[0]?.href ?? '/talks/')}), ${t.event}, ${t.date}. ${t.description}`);
  push('');

  push('## Projects', '');
  for (const p of projects) {
    push(`- [${p.title}](${p.links[0]?.href ?? absoluteUrl('/projects/')}) (${PROJECT_STATUS_META[p.status].label}): ${p.description}${p.stack.length ? ` Built with ${p.stack.join(', ')}.` : ''}`);
  }
  push('');

  return lines.join('\n');
}
