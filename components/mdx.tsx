import Link from 'next/link';
import rehypeShiki from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { rehypeHeadingIds } from '@/lib/rehype-heading-ids';
import { BeforeAfter } from './before-after';
import { Gif } from './gif';
import { MetricChart } from './metric-chart';

function A({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/') || href.startsWith('#')) return <Link href={href} {...props} />;
  return <a href={href} rel="noreferrer" {...props} />;
}

function Img({ alt = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof props.src === 'string' && /\.gif($|\?)/i.test(props.src)) return <Gif src={props.src} alt={alt} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} loading="lazy" decoding="async" className="rounded-lg border border-line" {...props} />;
}

function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <aside className="not-prose my-6 rounded-xl border border-line bg-sunken px-5 py-4 text-[15px] leading-relaxed text-ink-2">
      {title && <p className="mb-1 font-medium text-ink">{title}</p>}
      {children}
    </aside>
  );
}

function Figure({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-8">{children}</div>;
}

// Components available inside .mdx files. Plain .md files are rendered as markdown only.
const components = {
  a: A,
  img: Img,
  Callout,
  MetricChart: (props: React.ComponentProps<typeof MetricChart>) => (
    <Figure>
      <MetricChart {...props} />
    </Figure>
  ),
  BeforeAfter: (props: React.ComponentProps<typeof BeforeAfter>) => (
    <Figure>
      <BeforeAfter {...props} />
    </Figure>
  ),
};

export function Markdown({ source, format }: { source: string; format: 'md' | 'mdx' }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        // Allow JS expressions (e.g. array props on <MetricChart>) in our own trusted content.
        blockJS: false,
        mdxOptions: { format, remarkPlugins: [remarkGfm], rehypePlugins: [
          rehypeSlug,
          rehypeHeadingIds,
          // Highlighting runs at build time, so no syntax-highlighting JS ships to the browser.
          [rehypeShiki, { themes: { light: 'github-light-default', dark: 'github-dark-default' }, fallbackLanguage: 'text' }],
        ] },
      }}
    />
  );
}
