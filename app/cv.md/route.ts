import { cvMarkdown } from '@/lib/cv-markdown';

export const dynamic = 'force-static';

// The CV as plain markdown for agents and recruiting tools that prefer text over HTML.
export function GET() {
  return new Response(cvMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
