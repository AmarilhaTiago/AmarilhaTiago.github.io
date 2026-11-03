import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

/** Builds the site into its own folder so test files never race on `dist/`. */
export function buildSite(name: string): string {
  const outDir = join('.test-dist', name);
  rmSync(outDir, { recursive: true, force: true });
  execSync(`npx astro build --outDir ${outDir}`, { stdio: 'pipe' });
  return outDir;
}

export const readHtml = (outDir: string, page = 'index.html') =>
  readFileSync(join(outDir, page), 'utf8');

export function readCss(outDir: string): string {
  const dir = join(outDir, '_astro');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(join(dir, f), 'utf8'))
    .join('\n');
}
