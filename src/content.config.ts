import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './content/schema';

// One folder per language (pt/, en/); entry ids start with the language, e.g. "pt/pr-reviewer".
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: projectSchema,
});

export const collections = { projects };
