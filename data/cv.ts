// Source: LinkedIn profile export. Evidence links point at posts, talks, and repos on this site or GitHub.
// The single source for the CV: the web CV (/cv/), its machine-readable copies, and the PDF CV
// (/cv/print/) all read from here. The PDF shows a subset: highlights marked `pdf: true`, the summary,
// skill `items` (not `webOnly`), and the `pdf` selections at the bottom.

import { credentialStatus, type Credential } from '@/lib/credentials';

export type MetricPoint = { x: string; y: number };

export type Evidence =
  | {
      kind: 'metric';
      title: string;
      /** How values are formatted on axes and tooltips. */
      format: 'percent' | 'number' | 'ms' | 'seconds';
      /** Is a higher value better? Drives the delta color. */
      higherIsBetter: boolean;
      points: MetricPoint[];
      /** Vertical marker, e.g. when the change shipped. */
      marker?: { x: string; label: string };
      source: string;
    }
  | {
      kind: 'before-after';
      title: string;
      before: { src: string; alt: string };
      after: { src: string; alt: string };
      caption?: string;
    }
  | { kind: 'quote'; quote: string; author: string; role: string }
  | {
      kind: 'link';
      label: string;
      href: string;
      description?: string;
      /** Open source project name, listed under "Open source" on the PDF CV. */
      openSource?: string;
    };

export type Highlight = {
  id: string;
  /** Wrap a phrase in **double asterisks** to bold it. */
  text: string;
  evidence?: Evidence[];
  /** Include on the PDF CV. */
  pdf?: boolean;
};

/** Dates are `YYYY-MM`, or `YYYY` when the month isn't known. */
export type Position = {
  title: string;
  start: string;
  end: string | null;
  location?: string;
  highlights: Highlight[];
};

export type Role = {
  id: string;
  company: string;
  companyUrl?: string;
  /** One-line description of the company, e.g. "Healthcare provider". */
  description?: string;
  positions: Position[];
  stack: string[];
};

export type ImpactStat = {
  value: string;
  label: string;
  /** Anchor of the highlight that backs this claim up. */
  href: string;
};

const gh = (repo: string, name: string, commits: number, description: string): Evidence => ({
  kind: 'link',
  label: `${name} on GitHub (${commits} commits)`,
  href: `https://github.com/apollographql/${repo}/commits?author=JakeDawkins`,
  description,
  openSource: name,
});

const cpacc: Credential = {
  name: 'Certified Professional in Accessibility Core Competencies (CPACC)',
  shortName: 'CPACC',
  issuer: 'IAAP',
  earned: '2023',
  expires: '2026-12',
};
const cpaccStatus = credentialStatus(cpacc);

/**
 * UK job-search details. Keep `public` off until the search is public: when on, they replace the
 * location and availability everywhere, including the PDF CV, which is published on the site.
 */
const jobSearch = {
  public: false,
  location: 'Valencia, Spain, moving to the UK',
  workPreference: 'Open to UK remote roles, or hybrid in Edinburgh',
  rightToWork: 'Requires UK visa sponsorship',
};

export const cv = {
  /** While true, the CV is noindexed and hidden from the home page. */
  placeholder: false,
  title: 'Staff Software Engineer',
  location: jobSearch.public ? jobSearch.location : 'Valencia, Spain',
  /** Job-search status, shown on the CV and home page and in the machine-readable CV files. */
  availability: jobSearch.public ? `${jobSearch.workPreference}. ${jobSearch.rightToWork}.` : 'Not looking for new roles right now.',
  jobSearch,
  headline: 'Staff Software Engineer',
  /** Web only, shown before the summary. */
  intro:
    "I'm a full-stack engineer who likes taking a fresh look at old problems, especially the ones a team has stopped noticing, and I care a lot about accessibility.",
  /** Shown on the web CV and as the PDF CV's profile. */
  summary: [
    'Staff Software Engineer with 10 years building product across web, native, and backend in React, React Native, TypeScript, GraphQL, and Python/Django. I lead cross-team product bets from problem definition to A/B-tested launch: a membership model that became the national default offer, checkout work behind record sales, an enterprise frontend rebuild, and a Rust CLI for Apollo GraphQL.',
    "I've moved my day-to-day engineering to an AI-assisted workflow with Claude Code, on tooling I built to run it.",
  ],
  impact: [
    { value: '17-20%', label: 'lift in purchase conversion from a redesigned marketing landing page and checkout', href: '#homeaglow-deal-reskin' },
    { value: '90%', label: 'decrease in user load times after rebuilding an enterprise product', href: '#carbon-rebuild' },
    { value: '500+', label: 'commits to Apollo open source developer tools', href: '#apollo-oss-tools' },
    cpaccStatus.expired
      ? { value: 'CPACC', label: `IAAP accessibility certification, held through ${cpaccStatus.until}`, href: '#certifications' }
      : { value: 'CPACC', label: 'IAAP Certified Professional in Accessibility Core Competencies', href: '#certifications' },
  ] satisfies ImpactStat[],
  roles: [
    {
      id: 'homeaglow',
      company: 'Homeaglow',
      companyUrl: 'https://www.homeaglow.com',
      description: 'Home cleaning marketplace',
      stack: ['React', 'React Native', 'Expo', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Apollo Client', 'GraphQL', 'Django', 'Statsig', 'Stripe'],
      positions: [
        {
          title: 'Staff Software Engineer',
          start: '2024-07',
          end: null,
          location: 'Remote',
          highlights: [
            {
              id: 'homeaglow-membership',
              pdf: true,
              text: 'Owned a new membership model end to end across web, native, and backend, iterating through four versions until it became the **national default offer**.',
            },
            {
              id: 'homeaglow-deal-reskin',
              pdf: true,
              text: 'Led UI overhauls and major UX experiments on the main marketing landing page and checkout (**30,000+ visitors a day**); the winning design raised purchase conversion by **17-20%** and drove **record daily sales**.',
            },
            {
              id: 'homeaglow-sales-tool',
              pdf: true,
              text: 'Scoped and built an inside sales CRM alone, with no product or design support, working directly with sales stakeholders so agents could book a cleaning and sell a membership in one flow. Piloted it with small, then larger teams, raising leads handled per hour by **28%**, cutting handle time by **14%**, and **halving agent training time**; I still maintain it based on their feedback.',
            },
            {
              id: 'homeaglow-experimentation',
              pdf: true,
              text: 'Led adoption of Statsig as the experimentation platform **across all major products**, fixed setup and cohorting bugs that had been invalidating results, and shipped checkout experiments with wins of **+15%**, **+13%**, and **+10%** purchase conversion.',
            },
            {
              id: 'homeaglow-native-app',
              pdf: true,
              text: 'Led the proof of concept for moving from a web-only app to a **React Native** customer app, designing the incremental path (request proxying, shared auth, complex navigation) that let us rebuild and A/B test it one screen at a time, then co-built the app through App Store and Google Play release.',
            },
            {
              id: 'homeaglow-hiring',
              pdf: true,
              text: 'Joined as the **third engineering hire** and have been on the hiring loop for nearly every product engineer since, helping grow the team to 4 product and 3 platform engineers.',
            },
          ],
        },
        {
          title: 'Senior Software Engineer',
          start: '2023-02',
          end: '2024-07',
          location: 'Remote',
          highlights: [
            {
              id: 'homeaglow-ncw',
              pdf: true,
              text: 'Built a new **React web app** for customers, including the booking flow, taking inspiration from the old Django app while improving functionality, transparency, and accessibility. For a time the only engineer on it, I launched it to all new customers; it averaged **105,000+ monthly active users** in 2024, peaking above **150,000**.',
            },
            {
              id: 'homeaglow-experiment-infra',
              pdf: true,
              text: 'Built frontend experimentation infrastructure for the booking flow and landing page, cutting experiment launch time **from weeks to under two days**.',
            },
            {
              id: 'homeaglow-graphql',
              pdf: true,
              text: 'Built the first version of the customer-facing **GraphQL API**, migrating and expanding what the legacy Django view handlers could do, and moved the customer web app onto it.',
            },
            {
              id: 'homeaglow-deal-rebuild',
              pdf: true,
              text: 'Migrated the main marketing landing page from Django views to React on Next.js, making it faster and more accessible; winning tests on the new page added a **10% conversion lift**.',
            },
          ],
        },
      ],
    },
    {
      id: 'carbon-health',
      company: 'Carbon Health',
      companyUrl: 'https://carbonhealth.com',
      description: 'Healthcare provider',
      stack: ['React Native Web', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Apollo Client', 'GraphQL'],
      positions: [
        {
          title: 'Senior Product Engineer',
          start: '2021-05',
          end: '2023-01',
          location: 'Remote',
          highlights: [
            {
              id: 'carbon-rebuild',
              pdf: true,
              text: 'Led the rebuild of a legacy enterprise product on React Native Web, Next.js, TypeScript, and GraphQL, cutting user load times by **90%**.',
              evidence: [
                {
                  kind: 'link',
                  label: "Carbon Health's Resilient Enterprise Frontend Application",
                  href: '/blog/carbon-healths-resilient-enterprise-frontend-application/',
                  description: 'How the rebuild was engineered for speed and resilience.',
                },
              ],
            },
            {
              id: 'carbon-tech-lead',
              pdf: true,
              text: "As the team's **most senior frontend engineer**, tech-led planning for its larger projects, built or reviewed most of them, coordinated work and deadlines with product teams, and mentored junior engineers.",
            },
            {
              id: 'carbon-interface-system',
              pdf: true,
              text: 'Led the **design system guild**, coordinating engineers across **4 product teams** to govern and build a unified design system used across all major applications at the company.',
            },
            {
              id: 'carbon-architecture',
              pdf: true,
              text: 'Set frontend architecture standards for the wider engineering organization, and wrote the contribution guidelines and schema design docs teams used to share one GraphQL service.',
              evidence: [
                {
                  kind: 'link',
                  label: 'React Style Guide',
                  href: '/blog/react-style-guide/',
                  description: 'Conventions for modular, composable, testable React components.',
                },
                {
                  kind: 'link',
                  label: 'GraphQL Style Guide',
                  href: '/blog/graphql-style.guide/',
                  description: "Originally written for Carbon Health's data graph.",
                },
                { kind: 'link', label: 'Feature Flags with React & GraphQL', href: '/blog/feature-flags-with-react-graphql/' },
              ],
            },
            {
              id: 'carbon-testing',
              pdf: true,
              text: 'Designed and implemented the unit and end-to-end testing strategy, holding coverage at **90% or higher**.',
              evidence: [
                {
                  kind: 'link',
                  label: 'Testing in the enterprise rebuild',
                  href: '/blog/carbon-healths-resilient-enterprise-frontend-application/',
                  description: 'Includes the Cypress end-to-end setup.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'apollo',
      company: 'Apollo GraphQL',
      companyUrl: 'https://www.apollographql.com',
      description: 'GraphQL platform and open source tooling',
      stack: ['Rust', 'TypeScript', 'Node.js', 'GraphQL', 'Apollo Federation', 'VS Code API'],
      positions: [
        {
          title: 'Open Source Engineer',
          start: '2019',
          end: '2021-05',
          location: 'Remote',
          highlights: [
            {
              id: 'apollo-rover',
              pdf: true,
              text: "Proposed Rust as a new language for the company, then led the initiative to build **Rover**, a new Rust CLI for Apollo's main product line; Rust went on to have a growing influence across the company.",
              evidence: [
                gh('rover', 'Rover', 168, "Rover, the Rust CLI for Apollo's product line."),
                { kind: 'link', label: 'Getting Acquainted with Rust', href: '/blog/learing-rust/', description: "Why Rust fit Apollo's CLI toolchain." },
                { kind: 'link', label: 'Unwrap and Expect in Rust', href: '/blog/unwrap-and-expect-in-rust/' },
              ],
            },
            {
              id: 'apollo-federation',
              pdf: true,
              text: "Helped design and build **Apollo Federation's** composition algorithm and its test suite.",
              evidence: [gh('federation', 'Apollo Federation', 40, 'Apollo Federation.')],
            },
            {
              id: 'apollo-oss-tools',
              pdf: true,
              text: 'Maintained the Apollo CLI and VS Code extensions (**500+ commits** across Apollo open source), coordinating releases with multiple teams and product roadmaps.',
              evidence: [
                gh('apollo-tooling', 'Apollo CLI', 131, 'The Apollo CLI and language server.'),
                gh('vscode-graphql', 'Apollo GraphQL VS Code extension', 131, 'The Apollo GraphQL VS Code extension.'),
              ],
            },
            { id: 'apollo-community', text: 'Engaged with the community regularly for technical support, feature requests, and guidance on best practices.' },
            {
              id: 'apollo-teaching',
              text: 'Communicated and taught on tooling through blog posts, conference talks, and internal demos.',
              evidence: [
                { kind: 'link', label: 'Open Source Software From My Eyes', href: '/blog/open-source-from-my-eyes/', description: 'Guest lecture at Clemson, 2021.' },
                { kind: 'link', label: 'All talks', href: '/talks/' },
              ],
            },
          ],
        },
        {
          title: 'Apollo Architect',
          start: '2018-04',
          end: '2019',
          location: 'Remote',
          highlights: [
            {
              id: 'apollo-reviews',
              pdf: true,
              text: 'Led frontend and backend architecture reviews, training, and workshops for customers adopting GraphQL, and worked with engineers inside and outside Apollo on best-practice docs for running GraphQL in production.',
            },
            {
              id: 'apollo-docs',
              text: 'Wrote extensive documentation and technical guides.',
              evidence: [
                {
                  kind: 'link',
                  label: 'Authorization in GraphQL',
                  href: 'https://www.apollographql.com/blog/authorization-in-graphql',
                  description: 'Apollo blog, 2018.',
                },
              ],
            },
            {
              id: 'apollo-talks',
              text: 'Spoke at conferences and meetups about GraphQL.',
              evidence: [
                { kind: 'link', label: 'Testing GraphQL (GraphQL Summit 2018)', href: 'https://www.youtube.com/watch?v=loA3FwbVt90&t=39s' },
                {
                  kind: 'link',
                  label: 'A Hands-On Look at Apollo GraphQL (Apollo Day 2018)',
                  href: 'https://www.youtube.com/watch?v=bLP0DVS_k9c&index=5&list=PLpi1lPB6opQyY4QPskD20AULj7q6xREm3',
                },
              ],
            },
            { id: 'apollo-maintainer', text: 'Maintained multiple Apollo open source projects.' },
          ],
        },
      ],
    },
    {
      id: 'mls',
      company: 'Major League Soccer',
      description: 'Professional football league',
      stack: ['React Native', 'GraphQL', 'Apollo Server'],
      positions: [
        {
          title: 'Lead Engineer, Mobile',
          start: '2017-07',
          end: '2018-04',
          location: 'New York, NY',
          highlights: [
            {
              id: 'mls-apps',
              pdf: true,
              text: 'Led mobile engineering, building the iOS and Android apps in React Native and the GraphQL API behind them with Apollo Server.',
            },
            {
              id: 'mls-data-ui',
              pdf: true,
              text: 'Worked directly with the design team to build a performant, dynamic, data-heavy UI with live event visualizations and graphs.',
            },
            {
              id: 'mls-mentoring',
              pdf: true,
              text: 'Mentored junior engineers in their first engineering roles, set up the type system and unit testing, ran weekly team teaching sessions, and managed the project timeline.',
            },
          ],
        },
      ],
    },
    {
      id: 'newspring',
      company: 'NewSpring',
      stack: ['React', 'Redux', 'React-Apollo', 'Node.js', 'GraphQL', 'Flow', 'Jest'],
      positions: [
        {
          title: 'Web Developer',
          start: '2016-05',
          end: '2017-07',
          location: 'Anderson, SC',
          highlights: [
            { id: 'newspring-apps', text: 'Developed web and native mobile applications using React, Redux and React-Apollo.' },
            { id: 'newspring-graphql', text: 'Built and maintained GraphQL server to aggregate data from MSSQL, MongoDB, and MySQL in Node.js.' },
            { id: 'newspring-mssql', text: 'Managed a MSSQL database which tracked financial data and personal information across the organization.' },
            {
              id: 'newspring-testing',
              text: 'Unit tested projects using Jest and Enzyme.',
              evidence: [{ kind: 'link', label: 'More Testable React Components', href: '/blog/more-testable-react-components/' }],
            },
            { id: 'newspring-flow', text: 'Implemented static typing for JavaScript in Flow.' },
          ],
        },
        {
          title: 'Digital Media Content Coordinator',
          start: '2012-06',
          end: '2016-05',
          highlights: [
            { id: 'newspring-archive', text: 'Managed an archive of digital content ranging 15 years.' },
            { id: 'newspring-pipelines', text: 'Developed automation and delivery pipeline workflows to handle audio and video encoding and delivery.' },
            { id: 'newspring-video', text: 'Edited and produced video content for this archive from many weekly live events.' },
            { id: 'newspring-broadcast', text: 'Operated professional level broadcast equipment and cameras.' },
            { id: 'newspring-training', text: 'Wrote training documentation to teach volunteers on the equipment.' },
            { id: 'newspring-volunteers', text: 'Led a volunteer team of approximately 100 people in live video positions.' },
            { id: 'newspring-requests', text: 'Received and handled requests for content across the organization.' },
          ],
        },
      ],
    },
  ] satisfies Role[] as Role[],
  /** `items` appear on the web and PDF CV; `webOnly` items only on the web. */
  skills: [
    { group: 'Frontend', items: ['React', 'React Native', 'Expo', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Cypress'], webOnly: ['Flow'] },
    {
      group: 'Backend & APIs',
      items: ['Python', 'Django', 'GraphQL', 'Apollo Client & Server', 'Apollo Federation', 'Node.js', 'Stripe'],
      webOnly: ['MSSQL, MongoDB, MySQL'],
    },
    {
      group: 'Practice',
      items: ['AI-assisted development (Claude Code)', 'Experimentation (Statsig)', 'Web accessibility (WCAG)', 'Testing strategy', 'Design systems', 'Rust & CLI tooling', 'Mentoring'],
      webOnly: ['Writing & speaking'],
    },
  ] as { group: string; items: string[]; webOnly?: string[] }[],
  certifications: [cpacc].map((c) => ({ ...c, status: credentialStatus(c) })),
  education: [{ school: 'Clemson University', degree: 'BS Computer Science (US)', years: '2012 – 2016', honors: "Dean's List" }],
  /**
   * What else the PDF CV lists. Talks and projects are picked with `cv` in data/talks.ts and
   * data/projects.ts; open source comes from GitHub evidence links on PDF highlights.
   */
  pdf: {
    /** Blog post slugs, listed under "Writing". */
    writing: [
      'carbon-healths-resilient-enterprise-frontend-application',
      'react-style-guide',
      'graphql-style.guide',
      'authorization-in-graphql',
      '20261001-personalized-productivity',
      '20261003-maintainability-with-ai',
    ],
  },
};

/** Every skill in a group, for the web CV and machine-readable copies. */
export const allSkills = (g: (typeof cv.skills)[number]) => [...g.items, ...(g.webOnly ?? [])];

/** Strips `**bold**` markers for plain-text outputs. */
export const plainText = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1');
