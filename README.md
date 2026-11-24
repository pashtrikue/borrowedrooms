# Borrowed Rooms

A hotel photography portfolio. The home page shows every hotel. Click one to open its gallery, then click any photo to view it full screen (use the arrow keys or swipe to move between photos).

Built with [Astro](https://astro.build) as a static site, so there's no database or server to look after.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Make it yours

- **Name, tagline, email:** edit `src/site.config.ts`
- **About page text:** edit `src/pages/about.astro`
- **Colours and fonts:** edit the `:root` variables at the bottom of `src/layouts/Base.astro`

## Add a hotel

1. Create a folder in `src/content/hotels/`. Its name becomes the URL, e.g. `hotel-le-marais-paris` → `/hotels/hotel-le-marais-paris/`.
2. Put the photos in it (`.jpg`, `.png`, `.webp` or `.avif`). They appear **in filename order**, so name them `01.jpg`, `02.jpg`, …
3. Add an `info.md`:

   ```md
   ---
   name: Hotel Le Marais
   location: Paris, France
   cover: ./01.jpg      # photo used on the home page
   year: 2026           # optional
   order: 4             # optional – lower numbers show first on the home page
   draft: false         # optional – true hides the hotel
   ---
   A short description of the hotel or the shoot.
   ```

### Videos

Short clips work well. They play silently on a loop in the gallery and open with controls in the full-screen viewer.

- Videos must be **`.mp4` (H.264)**. iPhone `.MOV` files usually use HEVC, which Chrome and Firefox can't play, so convert them first:

  ```bash
  ffmpeg -i IMG_1234.MOV -an -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart 05.mp4
  ffmpeg -i 05.mp4 -frames:v 1 05.poster.jpg
  ```

- Name the video by its position, e.g. `05.mp4`, alongside an optional still frame `05.poster.jpg`. The still shows while the video loads.

You can upload full-size photos. The build resizes and compresses them automatically.

The hotels in the repo currently use **placeholder images**. Delete those folders once you've added your own.

## Deploy

Live at **https://borrowedrooms.vercel.app**

The site is hosted on **Vercel** and rebuilds automatically every time `main` changes, including uploads made on GitHub.
It usually goes live 1–2 minutes after a change.

If you add your own domain, update `site:` in `astro.config.mjs`.
