# Mercedes-Benz Through Time

A Next.js app that walks through Mercedes-Benz history, from the 1885 Daimler
Reitwagen and 1886 Benz Patent-Motorwagen to today's electric EQ cars and the new CLA.

- **Home** (`/`): hero, stats, and a searchable and filterable grid (era, category, sort).
- **Timeline** (`/timeline`): all models grouped into six eras.
- **Model pages** (`/models/[slug]`): photo gallery with lightbox, key facts, a Wikipedia
  intro, earlier/later navigation, and related models. All pages are statically generated.

## Getting started

```bash
npm install
npm run scrape   # download photos + descriptions (already done if public/cars exists)
npm run dev      # http://localhost:3000
```

## How the images are scraped

`scripts/scrape-images.mjs` reads the model list in `src/data/models.ts`. For each model it
uses the Wikipedia/Wikimedia Commons API to do the following:

1. Resolve the model's Wikipedia article (following redirects, or falling back to search).
2. List every image in the article, with its size, MIME type and license metadata.
3. Keep only landscape JPEG photos at least 700px wide whose file names mention the brand or model,
   dropping logos, diagrams, engine and interior shots.
4. Download up to 6 photos at 1280px into `public/cars/<slug>/`.
5. Save author, license and source page for each photo, plus the article intro, to
   `src/data/images.json`.

The site serves the images itself (no hotlinking), and every photo on a model page shows its author and license.

```bash
npm run scrape                 # only models that don't have photos yet
npm run scrape -- --force      # re-scrape everything
npm run scrape -- <slug> ...   # re-scrape specific models
```

## Adding a model

Add an entry to `raw` in `src/data/models.ts` (name, years, category, Wikipedia article
title, summary), then run `npm run scrape`.

## Legal

This is a non-commercial fan project and is not affiliated with Mercedes-Benz Group AG.
Photos come from Wikimedia Commons under their individual free licenses (mostly CC BY-SA),
which require attribution. The credits on each model page provide that attribution.
