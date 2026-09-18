// Scrapes freely-licensed photos (and a short description) for every model
// from Wikipedia / Wikimedia Commons, downloads them into public/cars/<slug>/
// and writes attribution metadata to src/data/images.json.
//
// Usage:  npm run scrape             (skips models already scraped)
//         npm run scrape -- --force  (re-scrape everything)
//         npm run scrape -- <slug>   (only the given model(s))

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { MODELS } from "../src/data/models.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "cars");
const DATA_FILE = path.join(ROOT, "src", "data", "images.json");
const MAX_IMAGES = 6;
const MIN_WIDTH = 700;
const THUMB_WIDTH = 1280;
const API = "https://en.wikipedia.org/w/api.php";
// Wikimedia asks every client to identify itself with a descriptive User-Agent.
const HEADERS = {
  "User-Agent": "MercedesHistoryExplorer/1.0 (educational, non-commercial Next.js project)",
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

// Files that are never photos of the car itself.
const JUNK = /logo|icon|emblem|flag|badge|symbol|map|diagram|chart|signature|commons-|wiki|question_book|edit-clear|ambox|portal|disambig|crystal|nuvola|stub|engine|interior|cockpit|dashboard|seat|wheel|steering|trunk/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Honour Retry-After when Wikimedia rate-limits us, else back off exponentially. */
function retryDelay(res, attempt) {
  const after = Number(res.headers.get("retry-after"));
  return (after > 0 ? after * 1000 : 0) + 2000 * 2 ** attempt;
}

async function getJSON(params, attempt = 0) {
  const url = `${API}?${new URLSearchParams({ format: "json", formatversion: "2", origin: "*", ...params })}`;
  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 429 && attempt < 6) {
    await sleep(retryDelay(res, attempt));
    return getJSON(params, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function download(url, dest, attempt = 0) {
  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 429 && attempt < 6) {
    await sleep(retryDelay(res, attempt));
    return download(url, dest, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

const stripHtml = (s = "") =>
  s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function relevanceTerms(model) {
  const words = `${model.name} ${model.code ?? ""} ${model.wiki}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !["the", "and", "class", "benz", "mercedes"].includes(w));
  return [...new Set(["mercedes", "benz", "daimler", "maybach", "amg", ...words])];
}

/** Resolve the article (following redirects), falling back to a search. */
async function resolvePage(title) {
  const q = await getJSON({
    action: "query",
    titles: title,
    redirects: "1",
    prop: "extracts|pageimages|info",
    exintro: "1",
    explaintext: "1",
    exsentences: "5",
    piprop: "name",
    inprop: "url",
  });
  let page = q.query.pages[0];
  if (page.missing) {
    const s = await getJSON({ action: "query", list: "search", srsearch: title, srlimit: "1" });
    const hit = s.query.search[0];
    if (!hit) return null;
    console.log(`   ↳ "${title}" not found, using search hit "${hit.title}"`);
    return resolvePage(hit.title);
  }
  return page;
}

async function scrapeModel(model) {
  const page = await resolvePage(model.wiki);
  if (!page) throw new Error("article not found");

  // All images used in the article, with Commons metadata.
  const q = await getJSON({
    action: "query",
    generator: "images",
    titles: page.title,
    gimlimit: "max",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: String(THUMB_WIDTH),
  });

  const candidates = (q.query?.pages ?? [])
    .filter((p) => p.imageinfo?.[0])
    .map((p) => ({ title: p.title, info: p.imageinfo[0] }))
    .filter(({ title, info }) =>
      ["image/jpeg", "image/webp"].includes(info.mime) &&
      info.width >= MIN_WIDTH &&
      info.width >= info.height && // landscape shots of cars
      !JUNK.test(title),
    );

  // Keep the article's lead image plus any image whose file name mentions the
  // brand or the model, so photos of unrelated things in the article are skipped.
  const lead = page.pageimage && `File:${page.pageimage}`.replace(/_/g, " ");
  const keywords = relevanceTerms(model);
  const relevant = candidates
    .filter((c) => c.title === lead || keywords.some((k) => c.title.toLowerCase().includes(k)))
    .sort((a, b) => (b.title === lead) - (a.title === lead));

  const dir = path.join(OUT_DIR, model.slug);
  await mkdir(dir, { recursive: true });

  const images = [];
  for (const { title, info } of relevant.slice(0, MAX_IMAGES)) {
    const meta = info.extmetadata ?? {};
    const scale = Math.min(1, THUMB_WIDTH / info.width);
    const file = `${images.length + 1}.jpg`;
    try {
      await download(info.thumburl ?? info.url, path.join(dir, file));
    } catch (e) {
      console.warn(`   ! ${title}: ${e.message}`);
      continue;
    }
    images.push({
      src: `/cars/${model.slug}/${file}`,
      width: info.thumbwidth ?? Math.round(info.width * scale),
      height: info.thumbheight ?? Math.round(info.height * scale),
      alt: stripHtml(meta.ImageDescription?.value).slice(0, 200) || model.name,
      author: stripHtml(meta.Artist?.value) || "Unknown",
      license: stripHtml(meta.LicenseShortName?.value) || "See source",
      licenseUrl: meta.LicenseUrl?.value ?? null,
      source: info.descriptionurl,
    });
    await sleep(250);
  }

  return {
    wikiTitle: page.title,
    wikiUrl: page.fullurl,
    extract: page.extract ?? "",
    images,
  };
}

async function main() {
  const data = existsSync(DATA_FILE) ? JSON.parse(await readFile(DATA_FILE, "utf8")) : {};
  const targets = MODELS.filter((m) =>
    only.length ? only.includes(m.slug) : force || !data[m.slug]?.images?.length,
  );
  console.log(`Scraping ${targets.length} of ${MODELS.length} models…`);

  let ok = 0;
  for (const [i, model] of targets.entries()) {
    process.stdout.write(`[${i + 1}/${targets.length}] ${model.slug} `);
    try {
      data[model.slug] = await scrapeModel(model);
      console.log(`✓ ${data[model.slug].images.length} images`);
      ok++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
    // Save as we go so an interrupted run keeps its progress.
    await writeFile(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
    await sleep(400);
  }
  const empty = MODELS.filter((m) => !data[m.slug]?.images?.length).map((m) => m.slug);
  console.log(`\nDone: ${ok}/${targets.length} succeeded.`);
  if (empty.length) console.log(`Models without images: ${empty.join(", ")}`);
}

main();
