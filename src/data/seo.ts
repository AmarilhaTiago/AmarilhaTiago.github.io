import { profile } from './profile';

const [role, lead] = profile.headline.value.split(' · ');

/** SEO texts, derived from profile data so nothing new is stated here. */
export const seoPt = {
  title: `${profile.name.value} · ${role} · ${lead}`,
  description: `${profile.name.value}, ${profile.headline.value}. Projetos, experiência e currículo.`,
  locale: 'pt_BR',
};
