import Link from 'next/link';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-base text-ink-2">{site.name}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/rss.xml" className="hover:text-ink">
              RSS
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
