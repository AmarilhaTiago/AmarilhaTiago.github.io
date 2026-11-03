import { z } from 'astro/zod';

/** One Markdown file per project in src/content/projects/pt/ (spec §3). */
export const projectSchema = z.object({
  title: z.string().min(1),
  /** One sentence: the problem it solves. */
  summary: z.string().min(1),
  /** 2 to 3 bullets of what was done. */
  highlights: z.array(z.string()).max(3).default([]),
  metric: z.string().optional(),
  stack: z.array(z.string()).min(1),
  repo: z.url().optional(),
  demo: z.url().optional(),
  status: z.enum(['pronto', 'em construção']),
  order: z.number(),
});

export type Project = z.infer<typeof projectSchema>;
