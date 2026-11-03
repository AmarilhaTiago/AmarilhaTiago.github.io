import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { seoPt } from '../src/data/seo';
import { buildSite, readHtml } from './helpers/build';

const SITE = 'https://amarilhatiago.github.io';
let out = '';
let html = '';

beforeAll(() => {
  out = buildSite('seo');
  html = readHtml(out);
}, 120_000);

const meta = (attr: 'name' | 'property', key: string) =>
  html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1];

describe('seo metadata', () => {
  it('AC1: title, description, canonical, Open Graph and Twitter card', () => {
    expect(html).toContain(`<title>${seoPt.title}</title>`);
    expect(meta('name', 'description')).toBe(seoPt.description);
    expect(html).toContain(`<link rel="canonical" href="${SITE}/">`);
    expect(meta('property', 'og:title')).toBe(seoPt.title);
    expect(meta('property', 'og:description')).toBe(seoPt.description);
    expect(meta('property', 'og:type')).toBe('website');
    expect(meta('property', 'og:url')).toBe(`${SITE}/`);
    expect(meta('property', 'og:locale')).toBe('pt_BR');
    expect(meta('property', 'og:image')).toBe(`${SITE}/og.png`);
    expect(meta('name', 'twitter:card')).toBe('summary_large_image');
  });

  it('AC2: the OG image is a 1200x630 PNG', () => {
    const png = readFileSync('public/og.png');
    expect(png.subarray(1, 4).toString()).toBe('PNG');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  it('AC3: sitemap and robots.txt are generated', () => {
    const index = readFileSync(join(out, 'sitemap-index.xml'), 'utf8');
    expect(index).toContain(`${SITE}/sitemap-0.xml`);
    expect(readFileSync(join(out, 'sitemap-0.xml'), 'utf8')).toContain(`<loc>${SITE}/</loc>`);
    const robots = readFileSync(join(out, 'robots.txt'), 'utf8');
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
  });

  it('AC4: own favicon (SVG with the accent color, ICO container)', () => {
    expect(existsSync(join(out, 'favicon.svg'))).toBe(true);
    expect(readFileSync('public/favicon.svg', 'utf8').toLowerCase()).toContain('#ff5c39');
    const ico = readFileSync('public/favicon.ico');
    expect([...ico.subarray(0, 4)]).toEqual([0, 0, 1, 0]);
    expect(html).toContain('href="/favicon.svg"');
  });

  it('AC5: SEO texts have no medical terms, phone or e-mail', () => {
    const text = Object.values(seoPt).join('\n');
    expect(text).not.toMatch(/\bCID\b|G80|diagn[óo]stic/i);
    expect(text).not.toMatch(/@|\d{4,}-?\d{4}/);
  });
});
