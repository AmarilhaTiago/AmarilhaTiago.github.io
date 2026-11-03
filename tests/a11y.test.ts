import { beforeAll, describe, expect, it } from 'vitest';
import { buildSite, readHtml } from './helpers/build';

let html = '';

beforeAll(() => {
  html = readHtml(buildSite('a11y'));
}, 120_000);

const headingLevels = () =>
  [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));

describe('accessibility structure', () => {
  it('AC5: a single h1 and headings that never skip a level', () => {
    const levels = headingLevels();
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, i) => {
      expect(level - levels[i]).toBeLessThanOrEqual(1);
    });
  });

  it('AC5: header, main, footer and a labelled nav landmark exist', () => {
    expect(html).toContain('<header');
    expect(html).toContain('<main');
    expect(html).toContain('<footer');
    expect(html).toMatch(/<nav[^>]*aria-label="[^"]+"/);
  });

  it('AC2: a skip link is the first focusable element and targets the main content', () => {
    const firstLink = html.match(/<a[^>]*href="([^"]*)"[^>]*>/)?.[1];
    expect(firstLink).toBe('#top');
    expect(html).toMatch(/<a[^>]*href="#top"[^>]*>\s*Pular para o conteúdo\s*<\/a>/);
    expect(html.indexOf('Pular para o conteúdo')).toBeLessThan(html.indexOf('<header'));
    expect(html).toContain('id="top"');
  });
});
