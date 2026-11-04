/**
 * English facts for the site. Texts marked "spec" are the reviewed English texts of the spec (§4).
 * Texts marked "translation" are Claude's translations of the Portuguese data, pending Tiago's review.
 * Dates, contacts and companies are the same facts as in src/data/profile.ts.
 */
import { profile } from './profile';
import { src, type Profile } from './sourced';

export const profileEn: Profile = {
  name: profile.name,
  fullName: profile.fullName,
  // translation
  headline: src('Full Stack Developer · Tech Lead · Applied AI', 'spec'),
  // translation
  location: src('Campo Grande/MS, Brazil · open to remote', 'spec', 'linkedin'),
  // Spec text without the wheelchair emoji (PRD P7). No medical detail, ever.
  pcdBadge: src('Person with disability · open to inclusive and PwD-dedicated roles', 'spec', 'tiago'),
  about: src(
    "Full Stack Developer and Tech Lead with 4+ years of experience. I lead a small team, own technical decisions and code reviews, and use generative AI to speed up engineering work, from an LLM-powered code review pipeline to documenting legacy systems. I've built and maintained platforms that processed over 1 million public-exam registrations. Computer Science student at UFMS (Brazil).",
    'spec',
  ),
  contact: profile.contact,
  experience: [
    {
      company: profile.experience[0].company,
      role: src('Mid-level Full Stack Developer · Tech Lead', 'curriculo', 'spec'),
      period: profile.experience[0].period,
      // translation of the CV topics
      bullets: src([
        "Tech Lead of a 3-person team (a junior developer and an analyst): responsible for the project's technical and structural decisions (database, plain PHP backend and frontend) and for the final call on team definitions.",
        "Planning with the analyst: requirements gathering, solution proposals, card creation, deadline setting and task delegation; I run the weekly meeting, also acting as Scrum Master.",
        "Responsible for the team's code review, supported by an LLM review pipeline that I defined.",
        "AI used as a productivity tool, without replacing the developer's work: support for implementing CI/CD and for documenting the legacy application that existed before I joined.",
        "Server infrastructure changes within the project's scope, and development of features for the Plus Saúde platform."
      ], 'curriculo'),
      stack: profile.experience[0].stack,
    },
    {
      company: profile.experience[1].company,
      role: src('Full Stack Developer', 'curriculo', 'linkedin', 'spec'),
      period: profile.experience[1].period,
      // translation of the CV topics
      bullets: src([
        "Full stack development of real client projects, with Laravel on the backend and React on the frontend, from data modeling to the interface.",
        "Delivered applications from scratch, turning business rules into clean solutions."
      ], 'curriculo'),
      stack: profile.experience[1].stack,
    },
    {
      company: profile.experience[2].company,
      // translation
      role: src('Mobile App Developer · Requirements Analyst', 'linkedin'),
      period: profile.experience[2].period,
      // translation
      note: src(
        'Worked on the marketing and product boards, managing deadlines and responsibilities; mentored new developers at the company on stacks and technologies.',
        'tiago',
      ),
    },
    {
      company: profile.experience[3].company,
      role: src('Intern → Full Stack Developer', 'curriculo', 'spec'),
      period: profile.experience[3].period,
      // translation of the CV topics
      bullets: src([
        "Developed and maintained about 3 internal and external systems of the largest public-exam board in Mato Grosso do Sul, platforms that have processed over 1 million registrations.",
        "Built solutions from scratch in PHP and Laravel, adapting the architecture to highly complex, confidential business rules (restricted systems).",
        "Applied generative AI in development and in Python automation scripts, reducing the team's manual tasks.",
        "Optimized MySQL database queries and supported the applications' infrastructure."
      ], 'curriculo'),
      stack: profile.experience[3].stack,
    },
    {
      company: profile.experience[4].company,
      role: src('Web Developer', 'curriculo', 'spec'),
      period: profile.experience[4].period,
      // translation of the CV topics
      bullets: src([
        "Development and maintenance of web applications in PHP and Laravel, from backend to frontend with JavaScript.",
        "Implemented new features and fixed bugs in production systems."
      ], 'curriculo'),
      stack: profile.experience[4].stack,
    },
  ],
};
