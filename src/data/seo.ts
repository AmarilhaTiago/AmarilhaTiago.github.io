import { profile } from './profile';
import { profileEn } from './profile.en';
import type { Profile } from './sourced';

/** SEO texts, derived from profile data so nothing new is stated here. */
function seo(p: Profile, tail: string, locale: string) {
  const [role, lead] = p.headline.value.split(' · ');
  return {
    title: `${p.name.value} · ${role} · ${lead}`,
    description: `${p.name.value}, ${p.headline.value}. ${tail}`,
    locale,
  };
}

export const seoPt = seo(profile, 'Projetos, experiência e currículo.', 'pt_BR');
export const seoEn = seo(profileEn, 'Projects, experience and résumé.', 'en_US');
