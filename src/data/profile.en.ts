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
    },
    {
      company: profile.experience[1].company,
      role: src('Full Stack Developer', 'curriculo', 'linkedin', 'spec'),
      period: profile.experience[1].period,
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
    },
    {
      company: profile.experience[4].company,
      role: src('Web Developer', 'curriculo', 'spec'),
      period: profile.experience[4].period,
    },
  ],
};
