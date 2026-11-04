import { describe, expect, it } from 'vitest';
import { en } from '../src/i18n/en';
import { pt } from '../src/i18n/pt';
import { profile } from '../src/data/profile';
import { profileEn } from '../src/data/profile.en';
import cv from './fixtures/cv-bullets.json';

const SOURCES = ['curriculo', 'linkedin', 'github', 'spec', 'tiago'];

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isSourced = (v: unknown): v is { value: unknown; source: string[] } =>
  isObject(v) && 'value' in v && 'source' in v;

/** Returns the path of every primitive that is not wrapped in a Sourced value. */
function unsourced(node: unknown, path = 'profile'): string[] {
  if (isSourced(node)) {
    const ok =
      Array.isArray(node.source) &&
      node.source.length > 0 &&
      node.source.every((s) => SOURCES.includes(s));
    return ok ? [] : [`${path} (invalid source)`];
  }
  if (Array.isArray(node)) return node.flatMap((n, i) => unsourced(n, `${path}[${i}]`));
  if (isObject(node)) return Object.entries(node).flatMap(([k, v]) => unsourced(v, `${path}.${k}`));
  return [path];
}

/** Every string anywhere in the structure, so no field can hide a forbidden term. */
function strings(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(strings);
  if (isObject(node)) return Object.values(node).flatMap(strings);
  return [];
}

const cases = [
  { lang: 'pt', data: profile, dict: pt, badge: 'PCD · disponível para vagas exclusivas e afirmativas' },
  {
    lang: 'en',
    data: profileEn,
    dict: en,
    badge: 'Person with disability · open to inclusive and PwD-dedicated roles',
  },
];

describe.each(cases)('profile data ($lang)', ({ lang, data, dict, badge }) => {
  it('AC1: every factual datum carries a valid source', () => {
    expect(unsourced(data)).toEqual([]);
  });

  it('AC2: no medical details in profile or dictionary', () => {
    const forbidden = /\bCID\b|G80|diagn[óo]stic/i;
    const offenders = [...strings(data), ...strings(dict)].filter((s) => forbidden.test(s));
    expect(offenders).toEqual([]);
  });

  it('the PCD badge matches the approved text and has no emoji', () => {
    expect(data.pcdBadge.value).toBe(badge);
    expect(data.pcdBadge.value).not.toMatch(/♿/);
  });

  it('experience has the 5 approved entries, most recent start first', () => {
    expect(data.experience.map((e) => e.company.value)).toEqual([
      'Bello Card',
      'HaruCode',
      'Mega Júnior',
      'FAPEC',
      'MaisCode',
    ]);
    const starts = data.experience.map((e) => e.period.value.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it('Mega Júnior description is sourced to Tiago, role and dates to LinkedIn', () => {
    const mega = data.experience.find((e) => e.company.value === 'Mega Júnior');
    expect(mega?.note?.source).toContain('tiago');
    expect(mega?.role.source).toContain('linkedin');
    expect(mega?.period.source).toContain('linkedin');
  });

  it('contact links are built from the approved data', () => {
    expect(data.contact.whatsappUrl.value).toBe('https://wa.me/5567996217362');
    expect(data.contact.email.value).toBe('amarilhatiago@gmail.com');
  });

  it('AC1-AC3: bullets and stack follow the CV (same text in pt, same count and tags in en)', () => {
    for (const company of ['Bello Card', 'HaruCode', 'FAPEC', 'MaisCode'] as const) {
      const job = data.experience.find((e) => e.company.value === company)!;
      const ref = cv[company];
      expect(job.bullets?.value, company).toHaveLength(ref.bullets.length);
      expect(job.stack?.value, company).toEqual(ref.stack);
      expect(job.bullets?.source).toContain('curriculo');
      expect(job.stack?.source).toContain('curriculo');
      if (lang === 'pt') expect(job.bullets?.value, company).toEqual(ref.bullets);
      else job.bullets!.value.forEach((b, i) => expect(b).not.toBe(ref.bullets[i]));
    }
  });

  it('AC4: Mega Júnior keeps only its description, no list and no stack', () => {
    const mega = data.experience.find((e) => e.company.value === 'Mega Júnior')!;
    expect(mega.note).toBeDefined();
    expect(mega.bullets).toBeUndefined();
    expect(mega.stack).toBeUndefined();
  });
});

describe('both languages', () => {
  it('state the same facts: same periods and same contacts', () => {
    expect(profileEn.experience.map((e) => e.period.value)).toEqual(
      profile.experience.map((e) => e.period.value),
    );
    expect(profileEn.contact).toEqual(profile.contact);
  });
});
