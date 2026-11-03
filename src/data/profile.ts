/**
 * Single source of factual data for the site. Components read only from here.
 * Every datum is wrapped by `src(value, ...sources)`, so its origin is part of the type.
 */

export type Source = 'curriculo' | 'linkedin' | 'github' | 'spec' | 'tiago';

export interface Sourced<T> {
  value: T;
  source: Source[];
}

const src = <T>(value: T, ...source: [Source, ...Source[]]): Sourced<T> => ({ value, source });

export interface Period {
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null while ongoing */
  end: string | null;
}

export interface Experience {
  company: Sourced<string>;
  role: Sourced<string>;
  period: Sourced<Period>;
  note?: Sourced<string>;
}

export const profile = {
  name: src('Tiago Amarilha', 'spec'),
  fullName: src('Tiago Amarilha Rodrigues', 'curriculo', 'linkedin'),
  headline: src('Desenvolvedor Full Stack · Tech Lead · IA aplicada', 'spec'),
  location: src('Campo Grande/MS · aberto a remoto', 'spec', 'linkedin'),
  // Badge without the wheelchair emoji: decision by Tiago (PRD P7). No medical detail, ever.
  pcdBadge: src('PCD · disponível para vagas exclusivas e afirmativas', 'spec', 'tiago'),
  about: src(
    'Desenvolvedor Full Stack e Tech Lead com mais de 4 anos de experiência. Lidero um time pequeno, sou responsável pelas decisões técnicas e pelas revisões de código, e uso IA generativa para acelerar o trabalho de engenharia: de uma pipeline de revisão de código com LLMs à documentação de sistemas legados. Já construí e mantive plataformas que processaram mais de 1 milhão de inscrições em concursos. Bacharelando em Ciência da Computação na UFMS.',
    'spec',
  ),
  contact: {
    email: src('amarilhatiago@gmail.com', 'curriculo', 'linkedin', 'tiago'),
    whatsappDisplay: src('(67) 99621-7362', 'curriculo', 'linkedin', 'tiago'),
    whatsappUrl: src('https://wa.me/5567996217362', 'curriculo', 'tiago'),
    github: src('https://github.com/AmarilhaTiago', 'curriculo', 'github'),
    // URL from the LinkedIn export; the CV carries a different one (PRD P4).
    linkedin: src('https://www.linkedin.com/in/tiago-amarilha-rodrigues-a7a6b31b8', 'linkedin', 'tiago'),
  },
  // Most recent start first (PRD decision Q9).
  experience: [
    {
      company: src('Bello Card', 'curriculo', 'spec'),
      role: src('Desenvolvedor Full Stack Pleno · Tech Lead', 'curriculo', 'spec'),
      period: src({ start: '2026-05', end: null }, 'curriculo', 'spec', 'linkedin'),
    },
    {
      company: src('HaruCode', 'curriculo', 'linkedin', 'spec'),
      role: src('Desenvolvedor Full Stack', 'curriculo', 'linkedin', 'spec'),
      period: src({ start: '2025-12', end: '2026-05' }, 'curriculo', 'linkedin', 'spec'),
    },
    {
      company: src('Mega Júnior', 'linkedin', 'tiago'),
      role: src('Desenvolvedor de aplicativos móveis · Analista de Requisitos', 'linkedin'),
      period: src({ start: '2024-08', end: '2026-05' }, 'linkedin'),
      note: src(
        'Atuação nas diretorias de marketing e de produtos, com gestão de prazos e responsabilidades; mentoria de stacks e tecnologias para desenvolvedores novos na empresa.',
        'tiago',
      ),
    },
    {
      company: src('FAPEC', 'curriculo', 'spec'),
      role: src('Estagiário → Desenvolvedor Full Stack', 'curriculo', 'spec'),
      period: src({ start: '2023-08', end: '2026-05' }, 'curriculo', 'spec', 'linkedin'),
    },
    {
      company: src('MaisCode', 'curriculo', 'linkedin', 'spec'),
      role: src('Desenvolvedor Web', 'curriculo', 'spec'),
      period: src({ start: '2022-05', end: '2023-04' }, 'curriculo', 'linkedin', 'spec'),
    },
  ] satisfies Experience[],
};
