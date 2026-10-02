// Source: LinkedIn profile export. Evidence links point at posts, talks, and repos on this site or GitHub.

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
  | { kind: 'link'; label: string; href: string; description?: string };

export type Highlight = {
  id: string;
  text: string;
  evidence?: Evidence[];
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
  positions: Position[];
  stack: string[];
};

export type ImpactStat = {
  value: string;
  label: string;
  /** Anchor of the highlight that backs this claim up. */
  href: string;
};

const gh = (repo: string, commits: number, description: string): Evidence => ({
  kind: 'link',
  label: `${repo} on GitHub (${commits} commits)`,
  href: `https://github.com/apollographql/${repo}/commits?author=JakeDawkins`,
  description,
});

const cpacc: Credential = {
  name: 'Certified Professional in Accessibility Core Competencies (CPACC)',
  shortName: 'CPACC',
  issuer: 'IAAP',
  expires: '2026-12',
  renewing: false,
};
const cpaccStatus = credentialStatus(cpacc);

export const cv = {
  /** While true, the CV is noindexed and hidden from the home page. */
  placeholder: false,
  title: 'Staff Software Engineer',
  location: 'Valencia, Spain',
  /** Job-search status, shown on the CV and home page and in the machine-readable CV files. */
  availability: 'Not looking for new roles right now.',
  headline: 'Staff Software Engineer',
  summary: [
    "I'm a curious software engineer, with experience across the stack. I've worked with React and GraphQL-based products for much of my career, but I've also built editor extensions and CLI tools for a broad audience.",
    'I have a passion for maintainable and accessible software. I have a strong foundation with testing methodologies, and I have experience writing and speaking publicly on software best practices.',
    "I'm a learner and a teacher, and I love what I do. I value empathetic, diverse, and cross-functional teams.",
  ],
  impact: [
    { value: '17-20%', label: 'lift in purchase conversion from a rebuilt marketing landing page and checkout', href: '#homeaglow-deal-reskin' },
    { value: '90%', label: 'decrease in user load times after rebuilding an enterprise product', href: '#carbon-load-times' },
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
      stack: ['React', 'React Native', 'Expo', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Apollo Client', 'GraphQL', 'Django', 'Statsig', 'Stripe'],
      positions: [
        {
          title: 'Staff Software Engineer',
          start: '2024-07',
          end: null,
          location: 'Remote',
          highlights: [
            {
              id: 'homeaglow-deal-reskin',
              text: 'Rebuilt the main marketing landing page and checkout, then ran five experiments testing different designs on the new build; the winner raised purchase conversion by 17-20% and drove record daily sales.',
            },
            {
              id: 'homeaglow-membership',
              text: 'Built a new membership model end to end across web, mobile, and backend, iterating through four versions until it became the national default offer.',
            },
            { id: 'homeaglow-checkout-experiments', text: 'Shipped a steady stream of checkout experiments, with wins of +15%, +13%, and +10% purchase conversion.' },
            {
              id: 'homeaglow-experimentation',
              text: 'Led adoption of Statsig as the experimentation platform across all major products, and fixed setup and cohorting bugs that had been invalidating results.',
            },
            {
              id: 'homeaglow-sales-tool',
              text: 'Independently scoped and built an inside sales tool with no product or design support, letting agents book a cleaning and sell a membership in one flow; in a pilot it raised leads handled per hour by 28%, cut handle time by 14%, and halved agent training time.',
            },
            {
              id: 'homeaglow-native-app',
              text: 'Co-built the new React Native customer app, rebuilding it screen by screen with an experiment on each flow, through App Store and Google Play release.',
            },
            { id: 'homeaglow-payments', text: 'Moved web and native card entry to Stripe Payment Elements to close PCI compliance gaps.' },
            { id: 'homeaglow-compliance', text: 'Shipped state consent-decree, disclosure, and accessibility changes to the acquisition funnel on tight legal deadlines.' },
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
              text: 'Led the new customer web app and booking flow, for a time as the only engineer, and launched them to all new customers, raising voucher redemption by 3 percentage points.',
            },
            {
              id: 'homeaglow-deal-rebuild',
              text: 'Rebuilt the main marketing landing page in Next.js to be faster and more accessible, then shipped a bundle of winning tests on it for a 10% conversion lift.',
            },
            {
              id: 'homeaglow-experiment-infra',
              text: 'Built frontend experimentation infrastructure, first for the booking flow (cutting launch time from weeks to under two days), then for the main marketing landing page.',
            },
            { id: 'homeaglow-graphql', text: 'Migrated the customer web app from legacy Django view handlers to GraphQL.' },
          ],
        },
      ],
    },
    {
      id: 'carbon-health',
      company: 'Carbon Health',
      companyUrl: 'https://carbonhealth.com',
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
              text: 'Led efforts to rebuild legacy enterprise product with modern tooling (React Native Web, Next.js, TypeScript, Tailwind CSS, Apollo Client).',
              evidence: [
                {
                  kind: 'link',
                  label: "Carbon Health's Resilient Enterprise Frontend Application",
                  href: '/blog/carbon-healths-resilient-enterprise-frontend-application/',
                  description: 'How the rebuild was engineered for speed and resilience.',
                },
              ],
            },
            { id: 'carbon-interface-system', text: 'Set up an interface system used across all major applications and teams at the company.' },
            { id: 'carbon-load-times', text: 'Decreased user load times by 90% with the new product.' },
            {
              id: 'carbon-architecture',
              text: 'Set standards for modern front-end architecture for the broader organization.',
              evidence: [
                {
                  kind: 'link',
                  label: 'React Style Guide',
                  href: '/blog/react-style-guide/',
                  description: 'Conventions for modular, composable, testable React components.',
                },
              ],
            },
            { id: 'carbon-roadmaps', text: 'Coordinated with product teams to set deadlines and roadmaps.' },
            {
              id: 'carbon-graphql',
              text: 'Developed contribution guidelines and schema design documents for inter-team collaboration to a shared GraphQL service.',
              evidence: [
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
              text: 'Designed and implemented unit & e2e testing strategy, attaining a minimum of 90% test coverage.',
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
              text: "Led initiative to build a new CLI for Apollo's main product line using Rust.",
              evidence: [
                gh('rover', 168, "Rover, the Rust CLI for Apollo's product line."),
                { kind: 'link', label: 'Getting Acquainted with Rust', href: '/blog/learing-rust/', description: "Why Rust fit Apollo's CLI toolchain." },
              ],
            },
            {
              id: 'apollo-federation',
              text: "Assisted in designing and building Apollo Federation's composition algorithm and supporting tests.",
              evidence: [gh('federation', 40, 'Apollo Federation.')],
            },
            { id: 'apollo-rollout', text: 'Coordinated features with multiple teams and product roadmaps to ensure a smooth rollout across teams.' },
            {
              id: 'apollo-rust',
              text: 'Led experimentation and proposal of a new language (Rust), which now has a growing influence in the company.',
              evidence: [{ kind: 'link', label: 'Unwrap and Expect in Rust', href: '/blog/unwrap-and-expect-in-rust/' }],
            },
            {
              id: 'apollo-oss-tools',
              text: 'Maintained open-source developer tools such as the Apollo CLI and VS Code editor extensions.',
              evidence: [
                gh('apollo-tooling', 131, 'The Apollo CLI and language server.'),
                gh('vscode-graphql', 131, 'The Apollo GraphQL VS Code extension.'),
              ],
            },
            { id: 'apollo-community', text: 'Engaged with the community regularly for technical support, feature requests, and guidance on best-practices.' },
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
          location: 'New York, NY',
          highlights: [
            { id: 'apollo-reviews', text: 'Led frontend & backend architecture reviews for customers.' },
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
            { id: 'apollo-training', text: 'Led training sessions and workshops for GraphQL and React.' },
            { id: 'apollo-best-practices', text: 'Collaborated with engineers inside & outside of Apollo to develop best practices documentation for using GraphQL in production.' },
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
      stack: ['React Native', 'GraphQL', 'Apollo Server'],
      positions: [
        {
          title: 'Lead Engineer, Mobile',
          start: '2017-07',
          end: '2018-04',
          location: 'New York, NY',
          highlights: [
            { id: 'mls-apps', text: 'Built Android and iOS native apps using React Native.' },
            { id: 'mls-api', text: 'Built and maintained GraphQL API with Apollo-Server.' },
            { id: 'mls-mentoring', text: 'Mentored junior engineers in their first engineering role.' },
            { id: 'mls-types', text: 'Set up type systems and unit testing.' },
            { id: 'mls-process', text: 'Managed project timeline and development process.' },
            { id: 'mls-teaching', text: 'Organized weekly team teaching sessions on various technical topics.' },
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
  skills: [
    { group: 'Frontend', items: ['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flow'] },
    { group: 'APIs & data', items: ['GraphQL', 'Apollo Client & Server', 'Apollo Federation', 'Node.js', 'MSSQL, MongoDB, MySQL'] },
    { group: 'Practice', items: ['Web accessibility (W3C)', 'Testing strategy', 'Rust & CLI tooling', 'Mentoring', 'Writing & speaking'] },
  ],
  certifications: [cpacc].map((c) => ({ ...c, status: credentialStatus(c) })),
  education: [{ school: 'Clemson University', degree: 'B.S. Computer Science', years: '2012 – 2016', honors: "Dean's List" }],
};
