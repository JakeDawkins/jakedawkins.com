import Link from 'next/link';
import type { Evidence as EvidenceItem } from '@/data/cv';
import { BeforeAfter } from '../before-after';
import { MetricChart } from '../metric-chart';

export function Evidence({ item }: { item: EvidenceItem }) {
  switch (item.kind) {
    case 'metric':
      return (
        <MetricChart
          title={item.title}
          points={item.points}
          format={item.format}
          higherIsBetter={item.higherIsBetter}
          marker={item.marker}
          source={item.source}
        />
      );
    case 'before-after':
      return <BeforeAfter title={item.title} before={item.before} after={item.after} caption={item.caption} />;
    case 'quote':
      return (
        <blockquote className="rounded-xl border border-line bg-surface p-5">
          <p className="font-serif text-lg leading-relaxed text-ink">“{item.quote}”</p>
          <footer className="mt-3 text-sm text-ink-3">
            <span className="text-ink-2">{item.author}</span>, {item.role}
          </footer>
        </blockquote>
      );
    case 'link': {
      const external = /^https?:/.test(item.href);
      const cls = 'group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4 hover:border-ink-3/40';
      const body = (
        <>
          <span>
            <span className="text-sm font-medium text-ink group-hover:text-accent">{item.label}</span>
            {item.description && <span className="block text-sm text-ink-3">{item.description}</span>}
          </span>
          <span aria-hidden className="text-ink-3 group-hover:text-accent">
            {external ? '↗' : '→'}
          </span>
        </>
      );
      return external ? (
        <a href={item.href} className={cls}>
          {body}
        </a>
      ) : (
        <Link href={item.href} className={cls}>
          {body}
        </Link>
      );
    }
  }
}

const KIND_LABEL: Record<EvidenceItem['kind'], string> = {
  metric: 'Chart',
  'before-after': 'Before / after',
  quote: 'Reference',
  link: 'Link',
};

export function evidenceSummary(items: EvidenceItem[]) {
  return [...new Set(items.map((i) => KIND_LABEL[i.kind]))].join(' · ');
}
