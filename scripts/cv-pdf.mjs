// Renders the compact CV (/cv/print/) to public/jake-dawkins-cv.pdf using your installed Google Chrome.
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
await page.pdf({ path: target, format: 'Letter', printBackground: true, margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
  tagged: true,
  outline: true, });
await browser.close();
server.close();

fs.copyFileSync(target, path.join(out, path.basename(target)));
console.log(`Wrote ${path.relative(root, target)}`);
