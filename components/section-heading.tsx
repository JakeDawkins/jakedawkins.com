import Link from 'next/link';

export function SectionHeading({ title, href, linkLabel = 'View all' }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
      <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-ink-2 hover:text-accent">
          {linkLabel} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-12 max-w-2xl">
      <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
      {children && <div className="mt-5 text-lg leading-relaxed text-ink-2">{children}</div>}
    </header>
  );
}
