import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-3">404</p>
      <h1 className="mt-3 font-serif text-4xl">Page not found.</h1>
      <Link href="/blog/" className="mt-6 inline-block text-link">
        Browse the blog →
      </Link>
    </div>
  );
}
