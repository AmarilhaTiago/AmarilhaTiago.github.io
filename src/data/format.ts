import type { Period } from './profile';

export interface PeriodDict {
  present: string;
  months: readonly string[];
}

const month = (yearMonth: string, dict: PeriodDict) => {
  const [year, m] = yearMonth.split('-');
  return `${dict.months[Number(m) - 1]}/${year}`;
};

/** "2026-05" / null -> "mai/2026 – atual" */
export function formatPeriod(period: Period, dict: PeriodDict): string {
  const end = period.end ? month(period.end, dict) : dict.present;
  return `${month(period.start, dict)} – ${end}`;
}
