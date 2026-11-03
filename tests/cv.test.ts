import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { cvLink } from '../src/data/cv';

const PT_HREF = '/cv/curriculo-tiago-amarilha-pt.pdf';

describe('cvLink', () => {
  it('AC1: pt points to the published PDF, which exists and is a PDF', () => {
    expect(cvLink('pt')).toEqual({ href: PT_HREF, suffix: '' });
    const file = `public${PT_HREF}`;
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file).subarray(0, 4).toString()).toBe('%PDF');
  });

  it('AC2: en falls back to the PT file with a (PT) suffix', () => {
    expect(cvLink('en')).toEqual({ href: PT_HREF, suffix: ' (PT)' });
  });
});
