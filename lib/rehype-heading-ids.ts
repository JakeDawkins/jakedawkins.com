import slugify from 'slugify';
import type { Element, ElementContent, Root, RootContent } from 'hast';

/**
 * Keeps heading anchors identical to the old Astro site so existing #deep-links keep working.
 * The old site slugified only the heading's first text node. When that's empty (heading starts
 * with code or a link) we keep the id rehype-slug already assigned. Also adds a hover "#" link
 * and normalizes heading levels.
 */
export function rehypeHeadingIds() {
  return (tree: Root) => {
    normalizeLevels(tree);
    walk(tree);
  };
}

/**
 * Posts render under the page's h1, so their top heading level must be h2. Some older posts start
 * at ###; shift every heading up so levels never skip (WCAG 1.3.1 / heading-order).
 */
function normalizeLevels(tree: Root) {
  const headings: Element[] = [];
  const collect = (node: Root | Element) => {
    for (const child of node.children as (RootContent | ElementContent)[]) {
      if (child.type !== 'element') continue;
      if (HEADING.test(child.tagName)) headings.push(child);
      else collect(child);
    }
  };
  collect(tree);
  if (!headings.length) return;
  const min = Math.min(...headings.map((h) => Number(h.tagName[1])));
  const shift = Math.max(0, min - 2);
  // Shift so the top level is h2, then never go more than one level deeper than the previous heading.
  let prev = 1;
  for (const h of headings) {
    const level = Math.min(Math.max(2, Number(h.tagName[1]) - shift), prev + 1);
    h.tagName = `h${level}`;
    prev = level;
  }
}

const HEADING = /^h[1-6]$/;

function walk(node: Root | Element) {
  for (const child of node.children as (RootContent | ElementContent)[]) {
    if (child.type !== 'element') continue;
    if (HEADING.test(child.tagName)) decorate(child);
    else walk(child);
  }
}

function textOf(node: ElementContent): string {
  if (node.type === 'text') return node.value;
  if (node.type === 'element') return node.children.map(textOf).join('');
  return '';
}

function decorate(heading: Element) {
  const first = heading.children[0];
  const legacy = first?.type === 'text' ? slugify(first.value.toLowerCase()) : '';
  const id = legacy || String(heading.properties.id ?? '');
  if (!id) return;
  heading.properties.id = id;
  heading.children.push({
    type: 'element',
    tagName: 'a',
    // Mouse convenience only: hidden from assistive tech so the heading's name stays just its text.
    properties: { href: `#${id}`, className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
    children: [{ type: 'text', value: '#' }],
  });
}
