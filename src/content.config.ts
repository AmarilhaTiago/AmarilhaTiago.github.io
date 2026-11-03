import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './content/schema';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects/pt', pattern: '**/*.md' }),
  schema: projectSchema,
});

export const collections = { projects };
