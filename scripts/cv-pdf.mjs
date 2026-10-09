// Renders the CV (/cv/print/) to public/jake-dawkins-cv.pdf using your installed Google Chrome.
// Run after `npm run build` whenever the CV changes: `npm run cv:pdf`. Commit the PDF.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'out');
const target = path.join(root, 'public/jake-dawkins-cv.pdf');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let file = path.join(out, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const { port } = server.address();

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
await page.emulateMedia({ media: 'print', colorScheme: 'light' });
await page.goto(`http://localhost:${port}/cv/print/`, { waitUntil: 'networkidle' });
// The email address is only assembled after hydration (components/email-link.tsx).
await page.waitForSelector('a[href^="mailto:"]');
// A4 for UK readers, with a small page-number footer.
const pdf = await page.pdf({
  path: target,
  format: 'A4',
  printBackground: true,
  margin: { top: '0.55in', bottom: '0.6in', left: '0.6in', right: '0.6in' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font:7pt system-ui,sans-serif;color:#78716c;text-align:center">Jake Dawkins CV · <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  tagged: true,
  outline: true,
});
await browser.close();
server.close();

// UK CVs should be two pages at most. Fail loudly instead of committing an overflow.
const pages = pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)?.length ?? 0;
if (pages > 2) {
  console.error(`Expected a CV of at most 2 pages, got ${pages}. Unmark some pdf: true highlights in data/cv.ts and rerun.`);
  process.exit(1);
}

fs.copyFileSync(target, path.join(out, path.basename(target)));
console.log(`Wrote ${path.relative(root, target)}`);
