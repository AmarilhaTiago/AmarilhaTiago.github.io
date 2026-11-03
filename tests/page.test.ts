import { beforeAll, describe, expect, it } from 'vitest';
import { cvLink } from '../src/data/cv';
import { profile } from '../src/data/profile';
import { pt } from '../src/i18n/pt';
import { buildSite, readCss, readHtml } from './helpers/build';

let html = '';
let css = '';

beforeAll(() => {
  const out = buildSite('page');
  html = readHtml(out);
  css = readCss(out);
}, 120_000);

const anchorWithText = (text: string) =>
  new RegExp(`<a[^>]*href="([^"]*)"[^>]*>\s*${text}\s*</a>`);

describe('page shell', () => {
  it('uses the Portuguese language tag', () => {
    expect(html).toContain('<html lang="pt-BR"');
  });

  it('AC1: header has ~/tiago, copy link button and the pt | en selector', () => {
    expect(html).toContain('~/tiago');
    expect(html).toContain(pt.nav.copyLink);
    expect(html).toMatch(new RegExp(`<nav[^>]*aria-label="${pt.nav.language}"`));
    expect(html).toMatch(/aria-current="true"[^>]*>\s*pt\s*</);
    expect(html).toMatch(/>\s*en\s*</);
  });

  it('AC2: hero shows name, headline, location and the PCD badge without emoji', () => {
    expect(html).toContain(profile.name.value);
    expect(html).toContain(profile.headline.value);
    expect(html).toContain(profile.location.value);
    expect(html).toContain(profile.pcdBadge.value);
    expect(html).not.toContain('♿');
  });

  it('AC2: hero buttons point to the projects anchor and the CV file', () => {
    expect(html.match(anchorWithText(pt.hero.viewProjects))?.[1]).toBe('#projetos');
    expect(html.match(anchorWithText(pt.hero.downloadCv))?.[1]).toBe(cvLink('pt').href);
  });

  it('AC4: motion is switched off for prefers-reduced-motion', () => {
    expect(css).toContain('prefers-reduced-motion');
  });

  it('AC5: footer shows the copyright line', () => {
    expect(html).toContain(pt.footer);
  });
});
