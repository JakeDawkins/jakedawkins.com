import Link from 'next/link';
import { NavLinks } from './nav-links';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4 min-[360px]:gap-4 min-[360px]:px-5" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2 font-serif text-lg tracking-tight">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-full bg-ink font-sans text-[11px] font-semibold text-bg transition-transform group-hover:-rotate-6"
          >
            JD
          </span>
          <span className="hidden sm:inline">Jake Dawkins</span>
        </Link>
        <div className="flex items-center gap-1">
          <NavLinks />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
