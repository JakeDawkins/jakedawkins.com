// Runs axe-core (WCAG 2.2 A/AA + best practices) against every page of the built site,
// in light and dark mode, using your installed Google Chrome. Run after `npm run build`.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'out');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let file = path.join(out, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return fs.createReadStream(path.join(out, '404.html')).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const posts = fs.readdirSync(path.join(out, 'blog')).filter((d) => fs.existsSync(path.join(out, 'blog', d, 'index.html')));
const pages = ['/', '/blog/', ...posts.map((p) => `/blog/${p}/`), '/projects/', '/talks/', '/cv/', '/does-not-exist/'];

const browser = await chromium.launch({ channel: 'chrome' });
const results = new Map();
for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ colorScheme: theme, viewport: { width: 1280, height: 900 } });
  await context.addInitScript((t) => localStorage.setItem('theme', t), theme);
  // Skip third-party requests (e.g. embedded GIFs); the audit only needs our own markup and CSS.
  await context.route((url) => !url.href.startsWith(base), (route) => route.abort());
  const page = await context.newPage();
  for (const url of pages) {
    await page.goto(base + url, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle').catch(() => {});
    // Expand every CV receipt so hidden evidence is audited too.
    if (url === '/cv/') {
      const btn = page.getByRole('button', { name: 'Expand all receipts' }).first();
      if (await btn.isVisible()) await btn.click();
    }
    await page.addScriptTag({ content: axeSource });
    const { violations } = await page.evaluate(() =>
      window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }),
    );
    for (const v of violations) {
      const key = `${v.id} (${v.impact})`;
      const entry = results.get(key) ?? { help: v.help, hits: [] };
      for (const n of v.nodes) entry.hits.push(`${theme} ${url} :: ${n.target.join(' ')} :: ${n.failureSummary?.split('\n')[1]?.trim() ?? ''}`);
      results.set(key, entry);
    }
  }
  await context.close();
}
await browser.close();
server.close();

if (!results.size) console.log(`No axe violations across ${pages.length} pages in light and dark mode.`);
for (const [key, { help, hits }] of results) {
  console.log(`\n${key}: ${help} (${hits.length})`);
  for (const h of [...new Set(hits)].slice(0, 12)) console.log(`  ${h}`);
}
process.exit(results.size ? 1 : 0);
