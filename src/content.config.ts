import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One markdown file per project in src/content/projects/.
// Add a new project by dropping in a new .md file — the homepage picks it up.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    // "Working" | "In progress" | "Scaffold" | etc. — rendered as a badge.
    status: z.string(),
    // Optional public source link. Omit to show the card without a "View source" link.
    repo: z.string().url().optional(),
    // Lower numbers sort first on the homepage.
    order: z.number().default(100),
  }),
});

export const collections = { projects };
