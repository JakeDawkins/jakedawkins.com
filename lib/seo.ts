import type { Metadata } from 'next';
import { STAGE_META, TYPE_META, type GardenEntry } from './garden-meta';
import { absoluteUrl, site } from './site';

type PageOptions = {
  title?: string;
  description?: string;
  /** Path with trailing slash, e.g. `/blog/`. */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
};

const defaultImage = { ...site.ogImage, url: absoluteUrl(site.ogImage.url) };
export const feeds = { 'application/rss+xml': [{ url: '/rss.xml', title: `${site.name} RSS feed` }] };

// Next merges metadata shallowly, so every page returns complete openGraph/twitter objects.
export function pageMetadata({ title, description = site.description, path, image = defaultImage, noindex }: PageOptions): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path, types: feeds },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const ogImagePath = (slug: string) => absoluteUrl(`/og/${slug}/image.png`);

export function articleMetadata(post: GardenEntry): Metadata {
  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: { url: ogImagePath(post.slug), width: 1200, height: 630, alt: `${post.title}, by ${site.name}` },
  });
  return {
    ...base,
    keywords: post.topics,
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.planted,
      modifiedTime: post.tended,
      authors: [site.url],
      tags: post.topics,
    },
  };
}

export const person = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  url: site.url,
  image: defaultImage.url,
  jobTitle: 'Staff Software Engineer',
  worksFor: { '@type': 'Organization', name: 'Homeaglow', url: 'https://www.homeaglow.com' },
  description: site.tagline,
  sameAs: site.socials.map((s) => s.href),
  knowsAbout: ['React', 'GraphQL', 'Web accessibility', 'TypeScript', 'Rust', 'Next.js', 'React Native'],
};

export function articleJsonLd(post: GardenEntry) {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: url,
      datePublished: post.planted,
      dateModified: post.tended,
      author: { '@id': person['@id'], '@type': 'Person', name: site.name, url: site.url },
      publisher: { '@type': 'Person', name: site.name, url: site.url },
      image: ogImagePath(post.slug),
      keywords: post.topics.join(', '),
      articleSection: TYPE_META[post.type].label,
      creativeWorkStatus: STAGE_META[post.stage].status,
      wordCount: post.readingMinutes * 230,
      inLanguage: 'en-US',
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Writing', path: '/blog/' },
      { name: post.title, path: `/blog/${post.slug}/` },
    ]),
  ];
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
