import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { cvLink } from '../src/data/cv';
import { formatPeriod } from '../src/data/format';
import { profile } from '../src/data/profile';
import { profileEn } from '../src/data/profile.en';
import { seoEn } from '../src/data/seo';
import { en } from '../src/i18n/en';
import cv from './fixtures/cv-bullets.json';
import { buildSite, cvAnchors, readHtml } from './helpers/build';

const SITE = 'https://amarilhatiago.github.io';
let out = '';
let ptHtml = '';
let enHtml = '';

beforeAll(() => {
  out = buildSite('i18n');
  ptHtml = readHtml(out);
  enHtml = readHtml(out, 'en/index.html');
}, 120_000);

describe('English page', () => {
  it('AC1: renders every block with lang="en" and the English dictionary', () => {
    expect(enHtml).toContain('<html lang="en"');
    expect(enHtml).toContain(en.nav.copyLink);
    expect(enHtml).toContain(profileEn.name.value);
    expect(enHtml).toContain(profileEn.headline.value);
    expect(enHtml).toContain(profileEn.pcdBadge.value);
    expect(enHtml).not.toContain('♿');
    expect(enHtml).toContain(en.hero.viewProjects);
    // The HTML escapes the apostrophe in "I've".
    expect(enHtml).toContain(profileEn.about.value.replace(/'/g, '&#39;'));
    for (const id of Object.values(en.anchors)) expect(enHtml).toContain(`id="${id}"`);
    for (const job of profileEn.experience) {
      expect(enHtml).toContain(job.role.value);
      expect(enHtml).toContain(formatPeriod(job.period.value, en.period));
    }
    expect(enHtml).toContain(`href="mailto:${profileEn.contact.email.value}"`);
    expect(enHtml).toContain(en.footer);
  });

  it('AC1: shows the English project cards in order, with the status labels', () => {
    const titles = ['LLM-powered PR Reviewer', 'Job Radar', 'FinCtrl'];
    const pos = titles.map((t) => enHtml.indexOf(t));
    expect(pos.every((p) => p > -1)).toBe(true);
    expect([...pos].sort((a, b) => a - b)).toEqual(pos);
    expect(enHtml).toContain(`>${en.status.ready}<`);
    expect(enHtml).toContain(`>${en.status.building}<`);
    expect(enHtml).not.toContain('Revisor de PR com LLM');
  });

  it('keeps the CV button on the Portuguese file, labelled (PT)', () => {
    const cv = cvLink('en');
    expect(enHtml).toContain(`href="${cv.href}"`);
    expect(enHtml).toContain(`${en.hero.downloadCv}${cv.suffix}`);
  });

  it('CV links (card #16): open in a new tab, safely, and announce it in English', () => {
    const tags = cvAnchors(enHtml);
    expect(tags).toHaveLength(3);
    for (const tag of tags) {
      expect(tag).toContain('target="_blank"');
      expect(tag).toMatch(/rel="[^"]*noopener[^"]*"/);
      expect(tag).toContain(en.nav.newTab);
    }
  });

  it('card #17 AC3: the English experience shows the translated bullets and the same stack tags', () => {
    const esc = (s: string) => s.replace(/'/g, '&#39;');
    const section = enHtml.slice(enHtml.indexOf('id="experience"'), enHtml.indexOf('id="links"'));
    for (const company of ['Bello Card', 'HaruCode', 'FAPEC', 'MaisCode'] as const) {
      const job = profileEn.experience.find((e) => e.company.value === company)!;
      expect(job.bullets!.value).toHaveLength(cv[company].bullets.length);
      job.bullets!.value.forEach((b) => expect(section, b).toContain(esc(b)));
      cv[company].stack.forEach((tag) => expect(section, tag).toContain(`>${tag}<`));
    }
    expect(section).not.toContain(cv['Bello Card'].bullets[0]);
  });

  it('the Portuguese page does not show English content', () => {
    expect(ptHtml).not.toContain(profileEn.about.value);
    expect(ptHtml).not.toContain('LLM-powered PR Reviewer');
  });
});

describe('language selector and alternates', () => {
  it('AC2: pt leads to / and en to /en/, with aria-current on the current one', () => {
    expect(ptHtml).toMatch(/<a[^>]*href="\/en\/"[^>]*>\s*en\s*<\/a>/);
    expect(ptHtml).toMatch(/<a[^>]*href="\/"[^>]*aria-current="true"[^>]*>\s*pt\s*<\/a>/);
    expect(enHtml).toMatch(/<a[^>]*href="\/"[^>]*>\s*pt\s*<\/a>/);
    expect(enHtml).toMatch(/<a[^>]*href="\/en\/"[^>]*aria-current="true"[^>]*>\s*en\s*<\/a>/);
  });

  it('AC3: each page has hreflang alternates and its own canonical and locale', () => {
    for (const html of [ptHtml, enHtml]) {
      expect(html).toContain(`<link rel="alternate" hreflang="pt-BR" href="${SITE}/">`);
      expect(html).toContain(`<link rel="alternate" hreflang="en" href="${SITE}/en/">`);
      expect(html).toContain(`<link rel="alternate" hreflang="x-default" href="${SITE}/">`);
    }
    expect(ptHtml).toContain(`<link rel="canonical" href="${SITE}/">`);
    expect(enHtml).toContain(`<link rel="canonical" href="${SITE}/en/">`);
    expect(enHtml).toContain('<meta property="og:locale" content="en_US"');
    expect(enHtml).toContain(`<title>${seoEn.title}</title>`);
    expect(enHtml).toContain(`content="${seoEn.description}"`);
  });

  it('AC3: the sitemap lists both URLs', () => {
    const sitemap = readFileSync(join(out, 'sitemap-0.xml'), 'utf8');
    expect(sitemap).toContain(`<loc>${SITE}/</loc>`);
    expect(sitemap).toContain(`<loc>${SITE}/en/</loc>`);
    expect(sitemap).toContain('hreflang="en-US"');
  });

  it('AC4: SEO texts in English have no medical terms, phone or e-mail', () => {
    const text = Object.values(seoEn).join('\n');
    expect(text).not.toMatch(/\bCID\b|G80|diagn[óo]stic|@|\d{4,}-?\d{4}/i);
  });

  it('AC6: the copy-link script copies the current URL', () => {
    expect(enHtml).toContain('location.href');
    expect(enHtml).toContain(`data-copied="${en.nav.copied}"`);
  });
});

describe('collection per language (builds with temporary files)', () => {
  const dirs = ['src/content/projects/pt', 'src/content/projects/en'];
  const clean = () =>
    dirs.filter(existsSync).forEach((d) =>
      readdirSync(d)
        .filter((f) => f.startsWith('zz-test-'))
        .forEach((f) => rmSync(join(d, f))),
    );
  const md = (title: string) =>
    `---\ntitle: ${title}\nsummary: Temporary entry.\nstack: [Test]\nstatus: em construção\norder: 98\n---\n`;
  afterAll(clean);

  it('AC5: a file in en/ shows only on /en/, and one in pt/ only on /', () => {
    mkdirSync(dirs[1], { recursive: true });
    writeFileSync(join(dirs[0], 'zz-test-only-pt.md'), md('Only Portuguese Entry'));
    writeFileSync(join(dirs[1], 'zz-test-only-en.md'), md('Only English Entry'));
    try {
      const built = buildSite('i18n-collection');
      const ptPage = readHtml(built);
      const enPage = readHtml(built, 'en/index.html');
      expect(ptPage).toContain('Only Portuguese Entry');
      expect(ptPage).not.toContain('Only English Entry');
      expect(enPage).toContain('Only English Entry');
      expect(enPage).not.toContain('Only Portuguese Entry');
    } finally {
      clean();
    }
  }, 120_000);
});

describe('profiles are not mixed', () => {
  it('the English about text differs from the Portuguese one', () => {
    expect(profileEn.about.value).not.toBe(profile.about.value);
  });
});
