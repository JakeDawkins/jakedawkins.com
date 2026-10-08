---
# Template for new posts. This file is ignored by the site (lib/garden.ts, scripts/redirects.mjs).
# Copy it to content/blog/<slug>.md (or .mdx to use components). The filename is the URL: /blog/<slug>/.

title: 'Post title'                # required
description: 'One-line summary.'   # required. Shown on cards, in meta tags, RSS, and llms.txt
type: article                      # required. article | note | til
stage: seedling                    # required. seedling (Draft) | budding (In progress) | evergreen (Complete) | outdated (No longer current)
planted: 2026-10-08                # required. Published date, YYYY-MM-DD
tended: 2026-10-08                 # optional. Last updated; defaults to planted. Lists sort by this
topics: [react, accessibility]     # optional. Tags, used for filtering and related posts
featured: false                    # optional. true shows it in the home page "Writing" cards (first 2)
# url: https://example.com/post    # optional. For posts published elsewhere: links out, no local page, adds a redirect
---

Body goes here. Everything below the frontmatter is the post.

## Markdown

- GitHub-flavored markdown: tables, task lists, strikethrough, footnotes.
- Headings get anchor IDs automatically, so `#section-name` links work.
- Code blocks are highlighted by Shiki. Add a language after the opening fence.
- Images: put files in `public/images/blog/` and use `![Alt text](/images/blog/file.png)`. `.gif` files get a play/pause control.
- Linking to another post with `[text](/blog/<slug>/)` adds a "Linked from" backlink on that post.
- Seedling and outdated posts get a notice under the title automatically.

## MDX components

Only in `.mdx` files:

```mdx
<Callout title="Optional title">
  Aside text.
</Callout>

<MetricChart
  title="p95 load time"
  format="ms"                       // percent | number | ms | seconds
  higherIsBetter={false}            // optional, default true
  points={[{ x: '2024-01-01', y: 4200 }, { x: '2024-06-01', y: 900 }]}
  marker={{ x: '2024-03-01', label: 'Shipped' }}   // optional
  source="Datadog RUM"              // optional
/>

<BeforeAfter
  title="Optional title"
  before={{ src: '/images/blog/before.png', alt: 'Before' }}
  after={{ src: '/images/blog/after.png', alt: 'After' }}
  caption="Optional caption"
/>

<SequenceDiagram
  title="Request flow"
  participants={['Client', 'Server']}
  messages={[
    { from: 'Client', to: 'Server', label: 'GET /posts' },
    { from: 'Server', to: 'Client', label: '200 OK', reply: true },   // reply draws a dashed arrow
  ]}
  note="Optional small print under the diagram"
/>
```
