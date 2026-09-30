export const site = {
  name: 'Jake Dawkins',
  url: 'https://jakedawkins.com',
  title: 'Jake Dawkins | Staff Software Engineer (React, GraphQL, Accessibility)',
  tagline: 'Software Engineer. Communicator. Home Barista and Amateur Photographer.',
  description:
    'Jake Dawkins is a Staff Software Engineer specializing in React, GraphQL, React Native, and web accessibility. CV, blog, projects, and talks.',
  ogImage: {
    url: '/images/og.jpg',
    width: 1200,
    height: 630,
    alt: 'Jake sitting on a large red horse statue, looking off into the distance',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/jakedawkins' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jakedawkins' },
  ],
  nav: [
    { label: 'Writing', href: '/blog/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Talks', href: '/talks/' },
    { label: 'CV', href: '/cv/' },
  ],
} as const;

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
