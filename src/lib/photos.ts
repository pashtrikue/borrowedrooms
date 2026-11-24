import type { ImageMetadata } from 'astro';

// Everything inside a hotel folder is picked up automatically.
// Photos: any image file. Videos: .mp4 files, each with an optional poster
// image named like the video, e.g. 02.mp4 + 02.poster.jpg.
const images = import.meta.glob<{ default: ImageMetadata }>(
  [
    '/src/content/hotels/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
    '!/src/content/hotels/*/*.poster.*',
  ],
  { eager: true },
);
const posters = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/hotels/*/*.poster.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  { eager: true },
);
const videos = import.meta.glob<string>('/src/content/hotels/*/*.{mp4,MP4}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export type Media =
  | { kind: 'image'; file: string; image: ImageMetadata }
  | { kind: 'video'; file: string; src: string; poster?: ImageMetadata };

const folder = (path: string) => path.split('/').at(-2);
const name = (path: string) => path.split('/').at(-1)!;
const stem = (file: string) => file.replace(/\.[^.]+$/, '');

/** Photos and videos for one hotel folder, in filename order (01, 02, ...). */
export function mediaFor(slug: string): Media[] {
  const items: Media[] = [];
  for (const [path, mod] of Object.entries(images)) {
    if (folder(path) === slug) items.push({ kind: 'image', file: name(path), image: mod.default });
  }
  for (const [path, src] of Object.entries(videos)) {
    if (folder(path) !== slug) continue;
    const file = name(path);
    const poster = Object.entries(posters).find(
      ([p]) => folder(p) === slug && stem(stem(name(p))) === stem(file),
    )?.[1].default;
    items.push({ kind: 'video', file, src, poster });
  }
  return items.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
}

/** e.g. "4 photos · 3 videos" */
export function mediaSummary(items: Media[]): string {
  const p = items.filter((m) => m.kind === 'image').length;
  const v = items.length - p;
  const part = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  return [p && part(p, 'photo'), v && part(v, 'video')].filter(Boolean).join(' · ');
}
