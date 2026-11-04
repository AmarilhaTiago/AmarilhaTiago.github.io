/**
 * Portuguese facts for the site. Components read only from here (and from src/data/profile.en.ts for English).
 * Sources: see src/data/sourced.ts.
 */
import { src, type Profile } from './sourced';

export type { Contact, Experience, Period, Profile, Source, Sourced } from './sourced';

export const profile: Profile = {
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
      bullets: src([
        "Tech Lead de um time de 3 pessoas, com um desenvolvedor júnior e uma analista: responsável pelas decisões técnicas e estruturais do projeto (banco de dados, backend em PHP puro e frontend) e pela decisão final nas definições do time.",
        "Planejamento com a analista: levantamento de requisitos, proposta de soluções, criação dos cards, definição de prazos e delegação de tarefas; organizo e conduzo a weekly semanal, acumulando o papel de Scrum Master.",
        "Responsável pela revisão de código do time, apoiada por uma pipeline de revisão com LLMs que defini.",
        "Uso de IA como ferramenta de produtividade, sem substituir o trabalho do desenvolvedor: apoio na implementação do CI/CD e documentação da aplicação legada existente antes da minha entrada.",
        "Alterações de infraestrutura no servidor dentro do escopo do projeto, e desenvolvimento de funcionalidades da plataforma Plus Saúde."
      ], 'curriculo'),
      stack: src([
        "PHP",
        "JavaScript",
        "jQuery",
        "PostgreSQL",
        "CI/CD",
        "Scrum/Kanban"
      ], 'curriculo'),
    },
    {
      company: src('HaruCode', 'curriculo', 'linkedin', 'spec'),
      role: src('Desenvolvedor Full Stack', 'curriculo', 'linkedin', 'spec'),
      period: src({ start: '2025-12', end: '2026-05' }, 'curriculo', 'linkedin', 'spec'),
      bullets: src([
        "Desenvolvimento full stack de projetos reais para clientes, com Laravel no backend e React no frontend, da modelagem de dados à interface.",
        "Entrega de aplicações do zero, traduzindo regras de negócio em soluções limpas."
      ], 'curriculo'),
      stack: src([
        "Laravel",
        "React",
        "PHP",
        "JavaScript",
        "Java",
        "MySQL"
      ], 'curriculo'),
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
      bullets: src([
        "Desenvolvi e mantive cerca de 3 sistemas internos e externos da maior banca de concursos do Mato Grosso do Sul, plataformas que já processaram mais de 1 milhão de inscrições.",
        "Criei soluções do zero em PHP e Laravel, adaptando a arquitetura a regras de negócio de alta complexidade e sigilo (sistemas restritos).",
        "Apliquei IA generativa no desenvolvimento e em scripts de automação em Python, reduzindo tarefas manuais da equipe.",
        "Otimizei consultas em bancos de dados MySQL e dei suporte à infraestrutura das aplicações."
      ], 'curriculo'),
      stack: src([
        "PHP",
        "Laravel",
        "Python",
        "JavaScript",
        "Java",
        "MySQL"
      ], 'curriculo'),
    },
    {
      company: src('MaisCode', 'curriculo', 'linkedin', 'spec'),
      role: src('Desenvolvedor Web', 'curriculo', 'spec'),
      period: src({ start: '2022-05', end: '2023-04' }, 'curriculo', 'linkedin', 'spec'),
      bullets: src([
        "Desenvolvimento e manutenção de aplicações web em PHP e Laravel, do backend ao frontend com JavaScript.",
        "Implementação de novas funcionalidades e correção de bugs em sistemas em produção."
      ], 'curriculo'),
      stack: src([
        "PHP",
        "Laravel",
        "JavaScript",
        "MySQL"
      ], 'curriculo'),
    },
  ],
};
