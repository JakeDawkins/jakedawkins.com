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
];
