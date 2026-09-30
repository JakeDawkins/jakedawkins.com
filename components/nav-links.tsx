'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-0.5 text-sm min-[360px]:text-[15px] sm:gap-1">
      {site.nav.map((item) => {
        const active = `${pathname.replace(/\/$/, '')}/`.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-full px-1.5 py-1.5 transition-colors min-[360px]:px-2 sm:px-3 hover:text-ink ${
                active ? 'bg-sunken text-ink' : 'text-ink-2'
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
