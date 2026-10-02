import Link from 'next/link';
import { NavLinks } from './nav-links';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4 min-[360px]:gap-4 min-[360px]:px-5" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2 font-serif text-lg tracking-tight">
          <img
            src="/images/headshot.jpg"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full object-cover transition-transform group-hover:-rotate-6"
          />
          {/* Newsreader's glyphs sit high in the line box; nudge down to optically center with the photo. */}
          <span className="hidden translate-y-0.5 sm:inline-block">Jake Dawkins</span>
        </Link>
        <div className="flex items-center gap-1">
          <NavLinks />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
