/** Every factual datum is wrapped by `src(value, ...sources)`, so its origin is part of the type. */

export type Source = 'curriculo' | 'linkedin' | 'github' | 'spec' | 'tiago';

export interface Sourced<T> {
  value: T;
  source: Source[];
}

export const src = <T>(value: T, ...source: [Source, ...Source[]]): Sourced<T> => ({ value, source });

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
  /** Topics of the role, as in the CV. */
  bullets?: Sourced<string[]>;
  /** Technology tags of the role, as in the CV. */
  stack?: Sourced<string[]>;
}

export interface Contact {
  email: Sourced<string>;
  whatsappDisplay: Sourced<string>;
  whatsappUrl: Sourced<string>;
  github: Sourced<string>;
  linkedin: Sourced<string>;
}

export interface Profile {
  name: Sourced<string>;
  fullName: Sourced<string>;
  headline: Sourced<string>;
  location: Sourced<string>;
  pcdBadge: Sourced<string>;
  about: Sourced<string>;
  contact: Contact;
  /** Most recent start first. */
  experience: Experience[];
}
