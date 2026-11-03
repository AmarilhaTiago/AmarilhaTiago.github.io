import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { projectSchema } from '../src/content/schema';
import { buildSite, readHtml } from './helpers/build';

const DIR = 'src/content/projects/pt';
const FAKE = join(DIR, 'zz-test-fake.md');

const valid = {
  title: 'Projeto',
  summary: 'Resumo.',
  highlights: ['a', 'b'],
  metric: 'm',
  stack: ['Python'],
  repo: 'https://github.com/x/y',
  status: 'pronto',
  order: 1,
};

const fakeMd = (extra = '') => `---
title: Projeto Falso de Teste
summary: Resumo do projeto falso.
stack: [Falso]
status: em construção
order: 99
${extra}---
`;

const cleanup = () => readdirSync(DIR).filter((f) => f.startsWith('zz-test-')).forEach((f) => rmSync(join(DIR, f)));

describe('projectSchema', () => {
  it('accepts a full entry and a minimal one', () => {
    expect(projectSchema.safeParse(valid).success).toBe(true);
    const { metric, repo, highlights, ...minimal } = valid;
    expect(projectSchema.safeParse(minimal).success).toBe(true);
  });

  it('AC3: rejects missing title, unknown status, non-numeric order and too many highlights', () => {
    const { title, ...noTitle } = valid;
    expect(projectSchema.safeParse(noTitle).success).toBe(false);
    expect(projectSchema.safeParse({ ...valid, status: 'draft' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...valid, order: 'um' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...valid, highlights: ['1', '2', '3', '4'] }).success).toBe(false);
  });
});

describe('projects section (real content)', () => {
  let html = '';
  beforeAll(() => {
    cleanup();
    html = readHtml(buildSite('projects'));
  }, 120_000);

  it('AC1: three cards in order, inside #projetos', () => {
    expect(html).toContain('id="projetos"');
    const titles = ['Revisor de PR com LLM', 'Radar de Vagas', 'FinCtrl'];
    const pos = titles.map((t) => html.indexOf(t));
    expect(pos.every((p) => p > -1)).toBe(true);
    expect([...pos].sort((a, b) => a - b)).toEqual(pos);
    expect(html).toContain('Evals (16 casos): recall 92–100% · precisão 86–87% com gpt-oss-120b · US$ 0');
  });

  it('AC4: shows "pronto" once and "em construção" twice', () => {
    const count = (s: string) => html.split(`>${s}<`).length - 1;
    expect(count('pronto')).toBe(1);
    expect(count('em construção')).toBe(2);
  });

  it('AC5: repo links only where a repo exists, and no empty hrefs', () => {
    expect(html).toContain('href="https://github.com/AmarilhaTiago/pr-reviewer"');
    expect(html).toContain('href="https://github.com/AmarilhaTiago/finctrl"');
    expect(html).not.toContain('radar-vagas');
    expect(html).not.toMatch(/href=""|href="undefined"/);
  });
});

describe('collection behaviour (builds with temporary files)', () => {
  afterAll(cleanup);

  it('AC2: a new .md appears on the page without touching code', () => {
    writeFileSync(FAKE, fakeMd());
    try {
      expect(readHtml(buildSite('fake'))).toContain('Projeto Falso de Teste');
    } finally {
      cleanup();
    }
    expect(existsSync(FAKE)).toBe(false);
  }, 120_000);

  it('AC3: an invalid .md fails the build', () => {
    writeFileSync(FAKE, fakeMd().replace('status: em construção', 'status: rascunho'));
    try {
      expect(() => buildSite('invalid')).toThrow();
    } finally {
      cleanup();
    }
  }, 120_000);
});
