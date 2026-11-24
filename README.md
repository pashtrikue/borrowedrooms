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

You can upload full-size photos. The build resizes and compresses them automatically.

The three hotels in the repo use **placeholder images**. Delete those folders once you've added your own.

## Deploy

Run `npm run build` to produce a static site in `dist/`. To host it for free:

- **Netlify** or **Vercel:** import this GitHub repo. They detect Astro automatically.
- Then set your real domain in `astro.config.mjs` (`site:`).
