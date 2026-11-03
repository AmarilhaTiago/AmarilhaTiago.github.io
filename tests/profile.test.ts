import { describe, expect, it } from 'vitest';
import { pt } from '../src/i18n/pt';
import { profile } from '../src/data/profile';

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

describe('profile data', () => {
  it('AC1: every factual datum carries a valid source', () => {
    expect(unsourced(profile)).toEqual([]);
  });

  it('AC2: no medical details in profile or dictionary', () => {
    const forbidden = /\bCID\b|G80|diagn[óo]stic/i;
    const offenders = [...strings(profile), ...strings(pt)].filter((s) => forbidden.test(s));
    expect(offenders).toEqual([]);
  });

  it('the PCD badge has no emoji', () => {
    expect(profile.pcdBadge.value).toBe('PCD · disponível para vagas exclusivas e afirmativas');
    expect(profile.pcdBadge.value).not.toMatch(/♿/);
  });

  it('experience has the 5 approved entries, most recent start first', () => {
    expect(profile.experience.map((e) => e.company.value)).toEqual([
      'Bello Card',
      'HaruCode',
      'Mega Júnior',
      'FAPEC',
      'MaisCode',
    ]);
    const starts = profile.experience.map((e) => e.period.value.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it('Mega Júnior description is sourced to Tiago, role and dates to LinkedIn', () => {
    const mega = profile.experience.find((e) => e.company.value === 'Mega Júnior');
    expect(mega?.note?.source).toContain('tiago');
    expect(mega?.role.source).toContain('linkedin');
    expect(mega?.period.source).toContain('linkedin');
  });

  it('contact links are built from the approved data', () => {
    expect(profile.contact.whatsappUrl.value).toBe('https://wa.me/5567996217362');
    expect(profile.contact.email.value).toBe('amarilhatiago@gmail.com');
  });
});
