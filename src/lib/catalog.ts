import scraped from "@/data/images.json";
import { MODELS, type CarModel, eraOf } from "@/data/models";

export type CarImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  source: string;
};

type Scraped = {
  wikiTitle: string;
  wikiUrl: string;
  extract: string;
  images: CarImage[];
};

export type CatalogEntry = CarModel & {
  eraId: string;
  eraName: string;
  images: CarImage[];
  extract: string;
  wikiUrl: string;
};

const data = scraped as Record<string, Scraped | undefined>;

export const CATALOG: CatalogEntry[] = MODELS.map((m) => {
  const era = eraOf(m);
  const s = data[m.slug];
  return {
    ...m,
    eraId: era.id,
    eraName: era.name,
    images: s?.images ?? [],
    extract: s?.extract ?? "",
    wikiUrl: s?.wikiUrl ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(m.wiki.replace(/ /g, "_"))}`,
  };
});

export function getEntry(slug: string) {
  const i = CATALOG.findIndex((m) => m.slug === slug);
  if (i === -1) return null;
  return { entry: CATALOG[i], prev: CATALOG[i - 1] ?? null, next: CATALOG[i + 1] ?? null };
}

/** Card-friendly subset, so client components don't receive long extracts. */
export type CardEntry = Pick<
  CatalogEntry,
  "slug" | "name" | "code" | "start" | "end" | "category" | "eraId" | "summary"
> & { image: CarImage | null };

export const toCard = (m: CatalogEntry): CardEntry => ({
  slug: m.slug,
  name: m.name,
  code: m.code,
  start: m.start,
  end: m.end,
  category: m.category,
  eraId: m.eraId,
  summary: m.summary,
  image: m.images[0] ?? null,
});
