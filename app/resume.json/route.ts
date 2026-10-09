import { allSkills, cv, plainText } from '@/data/cv';
import { projects } from '@/data/projects';
import { talks } from '@/data/talks';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

// The CV in the JSON Resume format (https://jsonresume.org/schema), which some recruiting tools import.
export function GET() {
  const links = (h: { evidence?: { kind: string; href?: string }[] }) =>
    (h.evidence ?? []).flatMap((e) => (e.kind === 'link' && e.href ? [absoluteUrl(e.href)] : []));

  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: site.name,
      label: cv.title,
      url: site.url,
      summary: [cv.intro, ...cv.summary, cv.availability].join('\n\n'),
      location: { city: 'Valencia', countryCode: 'ES' },
      profiles: site.socials.map((s) => ({
        network: s.label,
        username: s.href.replace(/\/$/, '').split('/').pop()!.replace('@', ''),
        url: s.href,
      })),
    },
    work: cv.roles.flatMap((role) =>
      role.positions.map((p) => ({
        name: role.company,
        position: p.title,
        ...(role.companyUrl ? { url: role.companyUrl } : {}),
        ...(role.description ? { description: role.description } : {}),
        ...(p.location ? { location: p.location } : {}),
        startDate: p.start,
        ...(p.end ? { endDate: p.end } : {}),
        highlights: p.highlights.map((h) => {
          const refs = links(h);
          return refs.length ? `${plainText(h.text)} (${refs.join(', ')})` : plainText(h.text);
        }),
      })),
    ),
    education: cv.education.map((e) => ({
      institution: e.school,
      area: 'Computer Science',
      studyType: 'Bachelor of Science',
      startDate: e.years.slice(0, 4),
      endDate: e.years.slice(-4),
    })),
    awards: cv.education.map((e) => ({ title: e.honors, awarder: e.school })),
    // JSON Resume has no expiry field, so the status goes in the name.
    certificates: cv.certifications.map((c) => ({ name: `${c.name} (${c.status.note})`, issuer: c.issuer })),
    skills: cv.skills.map((g) => ({ name: g.group, keywords: allSkills(g) })),
    languages: [{ language: 'English' }],
    projects: [
      ...projects.map((p) => ({
        name: p.title,
        description: p.description,
        ...(p.links[0] ? { url: p.links[0].href } : {}),
        ...(p.date ? { startDate: p.date.slice(0, 7) } : {}),
        keywords: p.stack,
        type: 'application',
      })),
      ...talks.map((t) => ({
        name: t.title,
        description: `${t.event}. ${t.description}`,
        url: absoluteUrl(t.links[0]?.href ?? '/talks/'),
        startDate: t.date,
        type: t.kind,
      })),
    ],
    meta: { canonical: absoluteUrl('/resume.json'), version: 'v1.0.0' },
  };

  return new Response(JSON.stringify(resume, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
