import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each hotel is a folder in src/content/hotels/<slug>/ containing an info.md
// plus its photos. The folder name becomes the URL: /hotels/<slug>/
const hotels = defineCollection({
  loader: glob({
    pattern: '*/info.md',
    base: './src/content/hotels',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      location: z.string(),
      cover: image(),
      year: z.number().optional(),
      // Lower numbers appear first on the home page.
      order: z.number().default(100),
      // Hide a hotel without deleting it.
      draft: z.boolean().default(false),
    }),
});

export const collections = { hotels };
