import type { Period } from './sourced';

export interface PeriodDict {
  present: string;
  /** Between month and year: "/" in Portuguese (mai/2026), a space in English (May 2026). */
  sep: string;
  months: readonly string[];
}

const month = (yearMonth: string, dict: PeriodDict) => {
  const [year, m] = yearMonth.split('-');
  return `${dict.months[Number(m) - 1]}${dict.sep}${year}`;
};

/** "2026-05" / null -> "mai/2026 – atual" */
export function formatPeriod(period: Period, dict: PeriodDict): string {
  const end = period.end ? month(period.end, dict) : dict.present;
  return `${month(period.start, dict)} – ${end}`;
}
