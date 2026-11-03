import { beforeAll, describe, expect, it } from 'vitest';
import { buildSite, readHtml } from './helpers/build';

const pages = [
  { name: 'pt', file: 'index.html', skip: 'Pular para o conteúdo' },
  { name: 'en', file: 'en/index.html', skip: 'Skip to content' },
];
const html: Record<string, string> = {};

beforeAll(() => {
  const out = buildSite('a11y');
  for (const p of pages) html[p.name] = readHtml(out, p.file);
}, 120_000);

const headingLevels = (h: string) => [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));

describe.each(pages)('accessibility structure ($name)', ({ name, skip }) => {
  it('AC5: a single h1 and headings that never skip a level', () => {
    const levels = headingLevels(html[name]);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, i) => {
      expect(level - levels[i]).toBeLessThanOrEqual(1);
    });
  });

  it('AC5: header, main, footer and a labelled nav landmark exist', () => {
    expect(html[name]).toContain('<header');
    expect(html[name]).toContain('<main');
    expect(html[name]).toContain('<footer');
    expect(html[name]).toMatch(/<nav[^>]*aria-label="[^"]+"/);
  });

  it('AC2: a skip link comes first and targets the main content', () => {
    expect(html[name]).toMatch(new RegExp(`<a[^>]*href="#top"[^>]*>\\s*${skip}\\s*</a>`));
    expect(html[name].indexOf(skip)).toBeLessThan(html[name].indexOf('<header'));
    expect(html[name]).toContain('id="top"');
  });
});
