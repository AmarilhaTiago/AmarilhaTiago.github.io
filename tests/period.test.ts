import { describe, expect, it } from 'vitest';
import { formatPeriod } from '../src/data/format';
import { pt } from '../src/i18n/pt';

describe('formatPeriod', () => {
  it('shows "atual" for an ongoing period', () => {
    expect(formatPeriod({ start: '2026-05', end: null }, pt.period)).toBe('mai/2026 – atual');
  });

  it('formats a closed period', () => {
    expect(formatPeriod({ start: '2023-08', end: '2026-05' }, pt.period)).toBe(
      'ago/2023 – mai/2026',
    );
  });

  it('handles the first and last month and a year change', () => {
    expect(formatPeriod({ start: '2025-12', end: '2026-01' }, pt.period)).toBe(
      'dez/2025 – jan/2026',
    );
  });

  it('handles a leading-zero month', () => {
    expect(formatPeriod({ start: '2022-05', end: '2023-04' }, pt.period)).toBe(
      'mai/2022 – abr/2023',
    );
  });
});
