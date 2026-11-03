// Runs Lighthouse (mobile and desktop) against the built site in dist/ and writes the reports.
// Usage: npm run build && node scripts/lighthouse.mjs [outDir]
// Needs a Chromium-based browser: set CHROME_PATH or it uses the Edge that ships with Windows.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { extname, join, resolve } from 'node:path';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const ROOT = resolve('dist');
const OUT = process.argv[2] ?? 'docs/cards/014-a11y-lighthouse';
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const THRESHOLD = 95;
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = http
  .createServer((req, res) => {
    let path = decodeURIComponent(req.url.split('?')[0]);
    if (path.endsWith('/')) path += 'index.html';
    const file = join(ROOT, path);
    if (!file.startsWith(ROOT) || !existsSync(file)) {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  })
  .listen(4398);

const chrome = await launch({ chromePath: CHROME, chromeFlags: ['--headless=new', '--disable-gpu'] });
mkdirSync(OUT, { recursive: true });
const summary = {};
let failed = false;

for (const mode of ['mobile', 'desktop']) {
  const result = await lighthouse(
    'http://localhost:4398/',
    { port: chrome.port, onlyCategories: CATEGORIES, output: 'json', logLevel: 'error' },
    mode === 'desktop' ? desktopConfig : undefined,
  );
  const { lhr } = result;
  writeFileSync(join(OUT, `lighthouse-${mode}.json`), JSON.stringify(lhr, null, 2));
  summary[mode] = Object.fromEntries(CATEGORIES.map((c) => [c, Math.round(lhr.categories[c].score * 100)]));
  for (const [category, score] of Object.entries(summary[mode])) {
    if (score < THRESHOLD) failed = true;
    const bad = lhr.categories[category].auditRefs
      .map((ref) => lhr.audits[ref.id])
      .filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative')
      .map((a) => a.id);
    if (score < 100) console.log(`${mode} ${category}: ${score}  <- ${bad.join(', ')}`);
  }
}

summary.measuredAt = new Date().toISOString().slice(0, 10);
summary.lighthouseVersion = (await import('lighthouse/package.json', { with: { type: 'json' } })).default.version;
writeFileSync(join(OUT, 'lighthouse-summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));

await chrome.kill();
server.close();
process.exit(failed ? 1 : 0);
