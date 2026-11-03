// Generates public/og.png (1200x630), public/favicon.svg and public/favicon.ico with headless Edge.
// Not part of the build: run `node scripts/generate-og.mjs` after changing the design, then commit the outputs.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const EDGE = process.env.CHROME_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BG = '#0a0a0a';
const ACCENT = '#ff5c39';
const FG = '#e7e7ea';
const MUTED = '#a1a1aa';

const tmp = mkdtempSync(join(tmpdir(), 'og-'));
const font = (pkg, pattern) => {
  const dir = join('node_modules', pkg, 'files');
  return pathToFileURL(join(dir, readdirSync(dir).find((f) => pattern.test(f)))).href;
};
const interUrl = font('@fontsource-variable/inter', /^inter-latin-wght-normal\.woff2$/);
const monoUrl = font('@fontsource-variable/jetbrains-mono', /^jetbrains-mono-latin-wght-normal\.woff2$/);

function shot(html, out, width, height) {
  const file = join(tmp, `${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(file, html);
  const target = resolve(out); // Edge needs an absolute path
  execFileSync(EDGE, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--screenshot=${target}`,
    `--window-size=${width},${height}`,
    pathToFileURL(file).href,
  ]);
  if (!existsSync(target)) throw new Error(`screenshot was not written: ${target}`);
}

const og = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("${interUrl}");font-weight:100 900}
@font-face{font-family:Mono;src:url("${monoUrl}");font-weight:100 800}
html,body{margin:0;width:1200px;height:630px;background:${BG};overflow:hidden}
.box{box-sizing:border-box;width:1200px;height:630px;padding:84px 96px;display:flex;flex-direction:column;justify-content:center;border-left:12px solid ${ACCENT}}
.p{font:700 36px Mono;color:${ACCENT};margin:0 0 28px}
h1{font:700 104px/1.05 Inter;color:${FG};margin:0 0 24px;letter-spacing:-2px}
.s{font:500 30px Mono;color:${FG};margin:0 0 12px}
.l{font:400 30px Inter;color:${MUTED};margin:0}
</style><div class="box"><p class="p">~/tiago</p><h1>Tiago Amarilha</h1>
<p class="s">Desenvolvedor Full Stack · Tech Lead · IA aplicada</p><p class="l">Campo Grande/MS · aberto a remoto</p></div>`;
shot(og, 'public/og.png', 1200, 630);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${BG}"/><text x="32" y="43" text-anchor="middle" font-family="Consolas, Menlo, monospace" font-weight="700" font-size="30" fill="${ACCENT}">~/</text></svg>\n`;
writeFileSync('public/favicon.svg', svg);

// ICO container holding one 48x48 PNG (supported by all current browsers).
const png48 = join(tmp, 'icon48.png');
shot(`<!doctype html><style>html,body{margin:0;background:${BG}}svg{width:48px;height:48px;display:block}</style>${svg}`, png48, 48, 48);
const png = readFileSync(png48);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 48;
header[7] = 48;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([header, png]));
console.log('generated og.png, favicon.svg and favicon.ico');
