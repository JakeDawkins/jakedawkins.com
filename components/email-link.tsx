'use client';

import { useEffect, useState, type ReactNode } from 'react';

// Assembled after hydration so the address never appears in the static HTML,
// and as split parts so it doesn't match an email regex in the JS bundle either.
const parts = ['hello', 'jakedawkins.com'];

export function EmailLink({ className, children }: { className?: string; children?: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(parts.join('@'));
  }, []);

  return (
    <a href={email ? `mailto:${email}` : undefined} className={className}>
      {children ?? email ?? 'Email'}
    </a>
  );
}
