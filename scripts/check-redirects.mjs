// Verifies every URL the old site served still resolves: either a file in out/, or a 301 in
// out/_redirects whose target exists (or is external). Run after `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { parseAllRedirects } from '@netlify/redirect-parser';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'out');

const { redirects, errors } = await parseAllRedirects({
  redirectsFiles: [path.join(out, '_redirects')],
  configRedirects: [],
  minimal: false,
});
if (errors.length) {
  console.error('Invalid _redirects:', errors);
  process.exit(1);
}

const exists = (url) => {
  const p = path.join(out, decodeURIComponent(url.split(/[?#]/)[0]));
  return (fs.existsSync(p) && fs.statSync(p).isFile()) || fs.existsSync(path.join(p, 'index.html'));
};

function match(url) {
  for (const r of redirects) {
    if (r.path === url) return r;
    if (r.path.endsWith('/*') && url.startsWith(r.path.slice(0, -1))) return r;
  }
  return null;
}

const urls = fs
  .readFileSync(path.join(root, 'scripts/old-urls.txt'), 'utf8')
  .split('\n')
  .filter((l) => l && !l.startsWith('#'));

let failed = 0;
for (const url of urls) {
  const r = match(url);
  let result;
  if (r) {
    const to = r.to;
    const ok = /^https?:/.test(to) || exists(to);
    result = `${ok ? 'ok  ' : 'FAIL'} ${url} -> ${r.status}${r.force ? '!' : ''} ${to}`;
    if (!ok || r.status !== 301) failed++;
  } else {
    const ok = exists(url);
    result = `${ok ? 'ok  ' : 'FAIL'} ${url} (served directly)`;
    if (!ok) failed++;
  }
  console.log(result);
}
console.log(`\n${urls.length - failed}/${urls.length} old URLs resolve.`);
process.exit(failed ? 1 : 0);
