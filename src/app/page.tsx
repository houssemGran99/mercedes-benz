import Image from "next/image";
import Link from "next/link";
import { CATALOG, toCard } from "@/lib/catalog";
import { CATEGORIES, ERAS } from "@/data/models";
import { Explorer } from "@/components/Explorer";

const HERO_SLUG = "mercedes-benz-300-sl-gullwing-w198-1954";

export default function Home() {
  const hero = CATALOG.find((m) => m.slug === HERO_SLUG)?.images[0] ?? CATALOG.find((m) => m.images.length)?.images[0];
  const first = CATALOG[0].start;
  const years = new Date().getFullYear() - first;
  const photos = CATALOG.reduce((n, m) => n + m.images.length, 0);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-black text-white">
        {hero && (
          <Image
            src={hero.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-40">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/70">
            {first} — today
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] sm:text-7xl">
            {years} years of Mercedes-Benz
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            From the first petrol car to all-electric flagships: explore the models that
            defined the automobile, era by era.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#models" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
              Browse all models
            </a>
            <Link href="/timeline" className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium hover:bg-white/10">
              View the timeline
            </Link>
          </div>
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-6">
            {[
              [CATALOG.length, "models"],
              [ERAS.length, "eras"],
              [photos, "photos"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wider text-white/60">{label}</dt>
                <dd className="font-display text-3xl">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Explorer
        cars={CATALOG.map(toCard)}
        eras={ERAS.map((e) => ({ id: e.id, label: e.name }))}
        categories={CATEGORIES}
      />
    </>
  );
}
