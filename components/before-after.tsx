'use client';

import { useRef, useState } from 'react';

type Img = { src: string; alt: string };

export function BeforeAfter({ before, after, caption, title }: { before: Img; after: Img; caption?: string; title?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function update(clientX: number) {
    const rect = ref.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }

  return (
    <figure className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      {title && <p className="mb-3 text-sm font-medium text-ink">{title}</p>}
      <div
        ref={ref}
        className="relative aspect-[16/10] cursor-ew-resize has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent touch-none select-none overflow-hidden rounded-lg border border-line bg-sunken"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.src} alt={after.alt} className="absolute inset-0 size-full object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before.src} alt={before.alt} className="absolute inset-0 size-full object-cover" draggable={false} />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2 py-0.5 text-[11px] font-medium text-bg">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-2 py-0.5 text-[11px] font-medium text-bg">After</span>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-surface shadow-[0_0_0_1px_rgb(0_0_0/0.1)]" />
          <div className="absolute top-1/2 -ml-4 -mt-4 grid size-8 place-items-center rounded-full border border-line bg-surface text-ink-2 shadow-md">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal before or after"
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-2">{caption}</figcaption>}
    </figure>
  );
}
