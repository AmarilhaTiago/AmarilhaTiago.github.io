import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readme = readFileSync('README.md', 'utf8');
const headings = [...readme.matchAll(/^(#{1,2}) (.+)$/gm)].map((m) => ({ level: m[1].length, text: m[2] }));

// The 9 items of the README template (00-roadmap): item 1 is the title plus one sentence.
const expected = [
  /^screenshots?$/i,
  /^why it exists$/i,
  /^how it works$/i,
  /^results$/i,
  /^usage$/i,
  /^engineering decisions/i,
  /^next steps$/i,
  /resumo em português/i,
];

describe('README', () => {
  it('AC1: starts with the project title and has the 8 other template sections in order', () => {
    expect(headings[0].level).toBe(1);
    const sections = headings.filter((h) => h.level === 2).map((h) => h.text);
    expect(sections).toHaveLength(expected.length);
    expected.forEach((pattern, i) => expect(sections[i]).toMatch(pattern));
  });

  it('AC1: item 1 has a one-sentence description right under the title', () => {
    const afterTitle = readme.split('\n').slice(1).find((l) => l.trim() !== '');
    expect(afterTitle?.length ?? 0).toBeGreaterThan(40);
    expect(afterTitle).not.toMatch(/^#/);
  });

  it('AC2: the screenshots it references exist in the repo (desktop and 360 px)', () => {
    const images = [...readme.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
    expect(images.some((p) => p.includes('desktop'))).toBe(true);
    expect(images.some((p) => p.includes('360'))).toBe(true);
    images.forEach((p) => expect(existsSync(p), p).toBe(true));
  });

  it('AC3: the Lighthouse numbers match the committed report summary', () => {
    const summary = JSON.parse(readFileSync('docs/cards/014-a11y-lighthouse/lighthouse-summary.json', 'utf8'));
    for (const mode of ['mobile', 'desktop']) {
      const row = readme.split('\n').find((l) => l.toLowerCase().startsWith(`| ${mode}`));
      expect(row, `${mode} row`).toBeDefined();
      const cells = row!.split('|').map((c) => c.trim());
      const scores = [
        summary[mode].performance,
        summary[mode].accessibility,
        summary[mode]['best-practices'],
        summary[mode].seo,
      ].map(String);
      expect(cells.slice(2, 6)).toEqual(scores);
    }
    expect(readme).toContain(summary.measuredAt);
  });

  it('has no personal contact data', () => {
    expect(readme).not.toMatch(/@gmail|99621|\d{4,5}-\d{4}/);
  });
});
