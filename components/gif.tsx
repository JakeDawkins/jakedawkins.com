'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated GIFs loop forever, so they get a pause control (WCAG 2.2.2) and start paused
 * for people who prefer reduced motion. Pausing freezes the current frame onto a canvas.
 */
export function Gif({ src, alt = '' }: { src: string; alt?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const img = imgRef.current;
    if (!img) return;
    const freeze = () => pause();
    if (img.complete) freeze();
    else img.addEventListener('load', freeze, { once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pause() {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || !img.naturalWidth) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d')?.drawImage(img, 0, 0);
    setPaused(true);
  }

  return (
    <span className="relative block w-fit max-w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} className={`rounded-lg border border-line ${paused ? 'invisible' : ''}`} />
      <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 size-full rounded-lg border border-line ${paused ? '' : 'hidden'}`} />
      <button
        type="button"
        onClick={() => (paused ? setPaused(false) : pause())}
        className="not-prose absolute bottom-2 right-2 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-bg hover:bg-ink"
      >
        {paused ? 'Play animation' : 'Pause animation'}
      </button>
    </span>
  );
}
