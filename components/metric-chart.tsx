'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { MetricPoint } from '@/data/cv';

type Format = 'percent' | 'number' | 'ms' | 'seconds';

type Props = {
  title: string;
  points: MetricPoint[];
  format: Format;
  higherIsBetter?: boolean;
  marker?: { x: string; label: string };
  source?: string;
};

const HEIGHT = 200;
const PAD = { top: 20, right: 56, bottom: 26, left: 44 };

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit', timeZone: 'UTC' });
const dateFmtLong = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

function formatValue(v: number, format: Format) {
  switch (format) {
    case 'percent':
      return `${(v * 100).toFixed(1)}%`;
    case 'ms':
      return `${Math.round(v).toLocaleString()}ms`;
    case 'seconds':
      return `${v.toFixed(1)}s`;
    default:
      return v >= 10000 ? compact.format(v) : v.toLocaleString();
  }
}

function niceTicks(min: number, max: number, count = 4) {
  const span = max - min || Math.abs(max) || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let t = lo; t <= hi + step / 2; t += step) ticks.push(Number(t.toPrecision(12)));
  return ticks;
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

export function MetricChart({ title, points, format, higherIsBetter = true, marker, source }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data = useMemo(() => points.map((p) => ({ ...p, t: new Date(p.x).getTime() })), [points]);

  const { xScale, yScale, ticks } = useMemo(() => {
    const ys = data.map((d) => d.y);
    const ticks = niceTicks(Math.min(...ys), Math.max(...ys));
    const t0 = data[0].t;
    const t1 = data[data.length - 1].t;
    const innerW = Math.max(width - PAD.left - PAD.right, 10);
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const [lo, hi] = [ticks[0], ticks[ticks.length - 1]];
    return {
      ticks,
      xScale: (t: number) => PAD.left + ((t - t0) / (t1 - t0 || 1)) * innerW,
      yScale: (y: number) => PAD.top + innerH - ((y - lo) / (hi - lo || 1)) * innerH,
    };
  }, [data, width]);

  const line = data.map((d, i) => `${i ? 'L' : 'M'}${xScale(d.t)},${yScale(d.y)}`).join('');
  const baseY = yScale(ticks[0]);
  const area = `${line}L${xScale(data[data.length - 1].t)},${baseY}L${xScale(data[0].t)},${baseY}Z`;

  // Headline delta: average before the marker vs. the latest value.
  const delta = useMemo(() => {
    if (!marker) {
      const first = data[0].y;
      const last = data[data.length - 1].y;
      return { from: first, to: last };
    }
    const mt = new Date(marker.x).getTime();
    const before = data.filter((d) => d.t < mt).map((d) => d.y);
    return { from: before.length ? mean(before) : data[0].y, to: data[data.length - 1].y };
  }, [data, marker]);
  const change = (delta.to - delta.from) / delta.from;
  const good = change >= 0 === higherIsBetter;

  const markerX = marker ? xScale(new Date(marker.x).getTime()) : null;
  const last = data[data.length - 1];
  const activePoint = active != null ? data[active] : null;

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let best = 0;
    for (let i = 1; i < data.length; i++) {
      if (Math.abs(xScale(data[i].t) - px) < Math.abs(xScale(data[best].t) - px)) best = i;
    }
    setActive(best);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') setActive((i) => Math.min((i ?? -1) + 1, data.length - 1));
    else if (e.key === 'ArrowLeft') setActive((i) => Math.max((i ?? data.length) - 1, 0));
    else if (e.key === 'Escape') setActive(null);
    else return;
    e.preventDefault();
  }

  return (
    <figure className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <figcaption className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p id={titleId} className="text-sm font-medium text-ink">
            {title}
          </p>
          {source && <p className="text-xs text-ink-3">{source}</p>}
        </div>
        <p className="flex items-baseline gap-2 text-sm">
          <span className="text-ink-3">{formatValue(delta.from, format)}</span>
          <span aria-hidden className="text-ink-3">
            →
          </span>
          <span className="font-semibold text-ink">{formatValue(delta.to, format)}</span>
          <span
            className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${
              good ? 'bg-budding/15 text-evergreen dark:text-budding' : 'bg-accent-wash text-accent'
            }`}
          >
            {change > 0 ? '+' : '−'}
            {Math.abs(change * 100).toFixed(0)}%
          </span>
        </p>
      </figcaption>

      <div ref={wrapRef} className="relative">
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          role="img"
          aria-labelledby={titleId}
          tabIndex={0}
          className="block h-auto w-full touch-none select-none overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(null)}
          onKeyDown={onKeyDown}
          onBlur={() => setActive(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={width - PAD.right} y1={yScale(t)} y2={yScale(t)} stroke="var(--line)" strokeWidth={1} />
              <text x={PAD.left - 8} y={yScale(t)} dy="0.32em" textAnchor="end" className="fill-ink-3 text-[10px] tabular-nums">
                {formatValue(t, format)}
              </text>
            </g>
          ))}

          {[data[0], data[Math.floor((data.length - 1) / 2)], last].map((d) => (
            <text key={d.x} x={xScale(d.t)} y={HEIGHT - 6} textAnchor="middle" className="fill-ink-3 text-[10px]">
              {dateFmt.format(d.t)}
            </text>
          ))}

          {marker && markerX != null && (
            <g>
              <line x1={markerX} x2={markerX} y1={PAD.top - 6} y2={baseY} stroke="var(--ink-3)" strokeWidth={1} />
              <text x={markerX + 6} y={PAD.top - 2} className="fill-ink-2 text-[10px] font-medium">
                {marker.label}
              </text>
            </g>
          )}

          <path d={area} fill="var(--accent-mark)" fillOpacity={0.1} />
          <path d={line} fill="none" stroke="var(--accent-mark)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          <circle cx={xScale(last.t)} cy={yScale(last.y)} r={4} fill="var(--accent-mark)" stroke="var(--surface)" strokeWidth={2} />
          <text x={xScale(last.t) + 10} y={yScale(last.y)} dy="0.32em" className="fill-ink text-[11px] font-medium tabular-nums">
            {formatValue(last.y, format)}
          </text>

          {activePoint && (
            <g pointerEvents="none">
              <line x1={xScale(activePoint.t)} x2={xScale(activePoint.t)} y1={PAD.top} y2={baseY} stroke="var(--ink-3)" strokeWidth={1} />
              <circle cx={xScale(activePoint.t)} cy={yScale(activePoint.y)} r={5} fill="var(--accent-mark)" stroke="var(--surface)" strokeWidth={2} />
            </g>
          )}
        </svg>

        {activePoint && (
          <div
            role="status"
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-lg"
            style={{ left: Math.min(Math.max(xScale(activePoint.t), 60), width - 60) }}
          >
            <p className="font-semibold text-ink tabular-nums">{formatValue(activePoint.y, format)}</p>
            <p className="text-ink-3">{dateFmtLong.format(activePoint.t)}</p>
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-end">
        <button type="button" onClick={() => setShowTable((s) => !s)} className="text-xs text-ink-3 hover:text-ink" aria-expanded={showTable}>
          {showTable ? 'Hide data' : 'View data'}
        </button>
      </div>
      {showTable && (
        <table className="mt-2 w-full text-left text-xs">
          <thead className="text-ink-3">
            <tr>
              <th className="py-1 font-medium">Date</th>
              <th className="py-1 text-right font-medium">{title}</th>
            </tr>
          </thead>
          <tbody className="tabular-nums text-ink-2">
            {data.map((d) => (
              <tr key={d.x} className="border-t border-line">
                <td className="py-1">{dateFmtLong.format(d.t)}</td>
                <td className="py-1 text-right">{formatValue(d.y, format)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </figure>
  );
}
