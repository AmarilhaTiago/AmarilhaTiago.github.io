import type { Lang } from '../data/cv';
import { profile } from '../data/profile';
import { profileEn } from '../data/profile.en';
import { seoEn, seoPt } from '../data/seo';
import { en } from './en';
import { pt } from './pt';

export type { Lang };

const locales = {
  pt: { dict: pt, profile, seo: seoPt, home: '/' },
  en: { dict: en, profile: profileEn, seo: seoEn, home: '/en/' },
} as const;

/** Dictionary, profile data and SEO texts of a language. */
export const getLocale = (lang: Lang) => locales[lang];
