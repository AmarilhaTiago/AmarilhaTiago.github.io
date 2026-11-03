import { beforeAll, describe, expect, it } from 'vitest';
import { cvLink } from '../src/data/cv';
import { formatPeriod } from '../src/data/format';
import { profile } from '../src/data/profile';
import { pt } from '../src/i18n/pt';
import { buildSite, readHtml } from './helpers/build';

let html = '';

beforeAll(() => {
  html = readHtml(buildSite('sections'));
}, 120_000);

describe('sections', () => {
  it('AC1: About shows the reviewed text', () => {
    expect(html).toContain('id="sobre"');
    expect(html).toContain(profile.about.value);
  });

  it('AC2: Experience lists the 5 entries in order with formatted periods', () => {
    expect(html).toContain('id="experiencia"');
    const positions = profile.experience.map((e) => html.indexOf(e.company.value));
    expect(positions.every((p) => p > -1)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    for (const e of profile.experience) {
      expect(html).toContain(e.role.value);
      expect(html).toContain(formatPeriod(e.period.value, pt.period));
    }
  });

  it('AC2: only Mega Júnior has a description', () => {
    const notes = profile.experience.flatMap((e) => (e.note ? [e.note.value] : []));
    expect(notes).toHaveLength(1);
    expect(html.split(notes[0]).length - 1).toBe(1);
  });

  it('AC3: Links has GitHub, LinkedIn, e-mail, WhatsApp and the CV', () => {
    const { contact } = profile;
    expect(html).toContain('id="links"');
    expect(html).toContain(`href="${contact.github.value}"`);
    expect(html).toContain(`href="${contact.linkedin.value}"`);
    expect(html).toContain(`href="mailto:${contact.email.value}"`);
    expect(html).toContain(`href="${contact.whatsappUrl.value}"`);
    expect(html).toContain(contact.whatsappDisplay.value);
    expect(html).toContain(`href="${cvLink('pt').href}"`);
    expect(html).toContain(`EN${cvLink('en').suffix}`);
  });
});
