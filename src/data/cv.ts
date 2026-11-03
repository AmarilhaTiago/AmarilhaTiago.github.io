export type Lang = 'pt' | 'en';

export interface CvLink {
  href: string;
  /** Appended to the button label, e.g. " (PT)" when the English page serves the Portuguese file. */
  suffix: string;
}

const PT_PDF = '/cv/curriculo-tiago-amarilha-pt.pdf';

// No English PDF yet (spec §6): the EN page serves the PT file and says so.
export function cvLink(lang: Lang): CvLink {
  return lang === 'pt' ? { href: PT_PDF, suffix: '' } : { href: PT_PDF, suffix: ' (PT)' };
}
