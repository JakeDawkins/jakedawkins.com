import { renderMermaidSVG } from 'beautiful-mermaid';

type Message = {
  from: string;
  to: string;
  label: string;
  /** Draws a dashed return arrow. */
  reply?: boolean;
};

type Props = {
  title: string;
  participants: string[];
  messages: Message[];
};

function toMermaid(participants: string[], messages: Message[]) {
  const id = (name: string) => {
    const i = participants.indexOf(name);
    if (i === -1) throw new Error(`SequenceDiagram: unknown participant "${name}"`);
    return `p${i}`;
  };
  return [
    'sequenceDiagram',
    ...participants.map((p, i) => `participant p${i} as ${p}`),
    ...messages.map((m) => `${id(m.from)}${m.reply ? '-->>' : '->>'}${id(m.to)}: ${m.label}`),
  ].join('\n');
}

// Rendered at build time, so no diagram JS ships to the browser. The renderer's own
// color variables (--line, --accent, --surface) share names with the site's, so every
// one is set explicitly from --diagram-* aliases defined in globals.css.
function renderSvg(code: string) {
  return renderMermaidSVG(code, {
    bg: 'var(--diagram-bg)',
    fg: 'var(--diagram-fg)',
    line: 'var(--diagram-line)',
    accent: 'var(--diagram-accent)',
    muted: 'var(--diagram-muted)',
    surface: 'var(--diagram-surface)',
    border: 'var(--diagram-border)',
    transparent: true,
  })
    .replace(/^\s*@import url\([^)]*\);\n/gm, '')
    .replace(/text \{ font-family: [^}]*\}/, 'text { font-family: inherit; }');
}

/**
 * A Mermaid sequence diagram. The SVG is hidden from assistive tech; screen readers
 * get the same messages as an ordered list instead.
 */
export function SequenceDiagram({ title, participants, messages }: Props) {
  const svg = renderSvg(toMermaid(participants, messages));
  return (
    <figure className="diagram rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-xs text-ink-3">{title}</figcaption>
      {/* Focusable so keyboard users can scroll it on narrow screens. */}
      <div className="overflow-x-auto rounded-lg" tabIndex={0} role="region" aria-label="Diagram, scrollable">
        <div aria-hidden className="min-w-[36rem] [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      <ol className="sr-only">
        {messages.map((m, i) => (
          <li key={i}>{m.from === m.to ? `${m.from}: ${m.label}` : `${m.from} to ${m.to}: ${m.label}`}</li>
        ))}
      </ol>
    </figure>
  );
}
