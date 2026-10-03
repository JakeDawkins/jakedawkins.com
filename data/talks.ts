export type Talk = {
  slug: string;
  title: string;
  event: string;
  date: string;
  kind: 'talk' | 'workshop' | 'podcast' | 'panel' | 'lecture';
  location?: string;
  description: string;
  links: { label: string; href: string }[];
};

export const talks: Talk[] = [
  {
    slug: 'intro-to-web-accessibility',
    title: 'Intro to Web Accessibility',
    event: 'Homeaglow internal tech talk',
    date: '2023-11-10',
    kind: 'talk',
    description:
      'The basics of accessibility, what it means, and how to do a basic evaluation for the most commonly-missed accessibility issues.',
    links: [{ label: 'Notes', href: '/files/intro-to-web-accessibility.pdf' }],
  },
  {
    slug: 'open-source-from-my-eyes',
    title: 'Open Source Software From My Eyes',
    event: 'Clemson University',
    date: '2021-02-28',
    kind: 'lecture',
    description: 'The people, incentives, and responsibilities behind open source projects, and how to get involved.',
    links: [
      { label: 'Slides', href: '/files/oss-presentation.pdf' },
      { label: 'Notes', href: '/blog/open-source-from-my-eyes/' },
    ],
  },
  {
    slug: 'clemson-2020',
    title: 'Remote Networking and Technical Leadership',
    event: 'Clemson University',
    date: '2020-10-08',
    kind: 'lecture',
    description:
      'How remote jobs and networking work, and how to advocate for yourself and your ideas in a professional environment.',
    links: [{ label: 'Slides', href: '/files/clemson-2020.pdf' }],
  },
  {
    slug: 'graphql-nyc-2019',
    title: 'GraphQL Tooling',
    event: 'GraphQL NYC Meetup',
    date: '2019-10-08',
    kind: 'talk',
    description:
      "GraphQL's queryable schema makes powerful tooling possible, like code generation, editor support, and schema registries, but today's tools are capable yet disconnected and configured separately. This talk lays out a modern, integrated setup and where that tooling is headed next.",
    links: [{ label: 'Slides', href: '/files/graphql-nyc-2019.pdf' }],
  },
  {
    slug: 'federated-validation',
    title: 'Federated Validation',
    event: 'Private event',
    date: '2019-07-10',
    kind: 'talk',
    description:
      'How Apollo Federation validates a set of GraphQL service schemas when composing them into one gateway schema. Covers each validation stage (before normalization, before composition, during composition via validateSDL, and on the composed schema) and what the resulting errors look like.',
    links: [{ label: 'Slides', href: '/files/federated-validation-2019.pdf' }],
  },
  {
    slug: 'graphql-summit-2018',
    title: 'Testing GraphQL',
    event: 'GraphQL Summit 2018',
    date: '2018-10-08',
    kind: 'talk',
    description:
      'Teams that adopt GraphQL see it become a powerful, yet critical part of how their applications work. The schemas that power these apps act as an important agreement between servers and clients. So how do you support such an important piece of infrastructure? With tests of course! This talk is a deep dive into how to test the Apollo Platform, giving you the security you need to go into production.',
    links: [{ label: 'Video', href: 'https://www.youtube.com/watch?v=loA3FwbVt90&t=39s' }],
  },
  {
    slug: 'graphql-nyc-2018',
    title: 'GraphQL at the Edge',
    event: 'GraphQL NYC Meetup',
    date: '2018-06-01',
    kind: 'talk',
    description:
      'The future of running GraphQL at the edge with Fly.io and Cloudflare Workers, moving data processing closer to users to reduce network latency.',
    links: [{ label: 'Slides', href: '/files/graphql-nyc-2018.pdf' }],
  },
  {
    slug: 'apollo-day-may',
    title: 'A Hands-On Look at Apollo GraphQL',
    event: 'Apollo Day',
    date: '2018-05-31',
    kind: 'talk',
    description:
      'A practical walkthrough of getting up and running with Apollo GraphQL, including using the newly released Apollo Server 2.0.',
    links: [
      {
        label: 'Video',
        href: 'https://www.youtube.com/watch?v=bLP0DVS_k9c&index=5&list=PLpi1lPB6opQyY4QPskD20AULj7q6xREm3',
      },
    ],
  },
  {
    slug: 'graphql-radio-state-management',
    title: 'State Management with Apollo',
    event: 'GraphQL Radio, Episode 12',
    date: '2018-01-24',
    kind: 'podcast',
    description:
      "My work at MLS, and how to use Apollo's new apollo-link-state library for state management in React applications.",
    links: [{ label: 'Listen', href: 'https://graphqlradio.com/episodes/ep-12-state-management-with-apollo-w-jake-dawkins' }],
  },
  {
    slug: 'asbury-agile-2017',
    title: 'When Front-End Met Back-End: A GraphQL Love Story',
    event: 'Asbury Agile 2017',
    date: '2017-10-06',
    kind: 'talk',
    description:
      'An overview of how GraphQL works as an API layer that makes development easier for frontend and backend teams, and allows for lower-data, typesafe networking.',
    links: [{ label: 'Slides', href: '/files/asbury-agile-2017.pdf' }],
  },
];
