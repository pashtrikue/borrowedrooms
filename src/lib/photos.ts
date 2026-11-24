import type { ImageMetadata } from 'astro';

// Every image inside a hotel folder is picked up automatically.
const all = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/hotels/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

/** Photos for one hotel folder, sorted by filename (01.jpg, 02.jpg, ...). */
export function photosFor(slug: string): { file: string; image: ImageMetadata }[] {
  return Object.entries(all)
    .filter(([path]) => path.split('/').at(-2) === slug)
    .map(([path, mod]) => ({ file: path.split('/').at(-1)!, image: mod.default }))
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
}
