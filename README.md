# jakedawkins.com

Next.js 16 static export, deployed on Netlify.

```sh
npm install
npm run dev              # http://localhost:3000
npm run build            # static site in out/, plus out/_redirects
npm run check:redirects  # every old-site URL still resolves
npm run check:a11y       # axe WCAG 2.2 AA audit of every page, light and dark
npm run cv:pdf           # after build: regenerate public/jake-dawkins-cv.pdf (commit it)
```

## Content

| What | Where | Format |
| --- | --- | --- |
| Blog (articles, notes, TILs) | `content/blog/*.md` / `*.mdx` | Markdown + frontmatter. `.mdx` can embed `<MetricChart>`, `<BeforeAfter>`, `<Callout>` |
| CV | `data/cv.ts` | Typed data. Each highlight can carry `evidence` (chart, before/after, quote, link) |
| Projects | `data/projects.ts` | Typed data with a status |
| Talks | `data/talks.ts` | Typed data |

Blog frontmatter:

```yaml
title: Errors as data in GraphQL
description: One-line summary.
type: article | note | til
stage: seedling | budding | evergreen | outdated   # shown as Draft / In progress / Complete / No longer current
planted: 2025-02-10  # published
tended: 2026-07-21   # optional, last updated; defaults to planted
topics: [graphql, architecture]
featured: true       # optional, shows on home
url: https://...     # optional, for posts published elsewhere (links out, no local page)
```

Linking to `/blog/<slug>/` from any post creates a backlink on the target post.

After changing `data/cv.ts`, run `npm run build && npm run cv:pdf` and commit the new PDF.

## SEO and indexing

- Posts keep the old site's `/blog/<slug>/` URLs, so existing links and rankings carry over with no redirect. `scripts/redirects.mjs` writes the few 301s that are needed (old sitemap URLs, the external Apollo post) to `out/_redirects`.
- Heading anchors match the old site (`lib/rehype-heading-ids.ts`), so `#section` links keep working.
- Every page sets canonical, Open Graph, and Twitter tags (`lib/seo.ts`). Posts get a generated social card at `/og/<slug>/image.png`, plus `BlogPosting` (with `creativeWorkStatus` for maturity) and breadcrumb JSON-LD. The CV has `ProfilePage` JSON-LD.
- Generated at build time: `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt`, `llms-full.txt`, `cv.md`, `resume.json` (JSON Resume v1.0.0).

## Deploying

Netlify builds from the repo root using `netlify.toml` (`npm run build`, publish `out`, Node 22). `public/_headers` sets long-lived caching for hashed assets. `.github/workflows/scheduled-rebuild.yml` rebuilds weekly through a Netlify build hook (set the `NETLIFY_BUILD_HOOK` repo secret) so date-based content stays current.
