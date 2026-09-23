import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CATALOG } from "@/lib/catalog";
import { ERAS, yearsLabel } from "@/data/models";

export const metadata: Metadata = {
  title: "Timeline",
  description: "The history of Mercedes-Benz, from 1885 to today, era by era.",
};

const ERA_INTRO: Record<string, string> = {
  "post-war":
    "The company rebuilds from rubble. The Gullwing, the safety cell and the first S-Class forerunners follow.",
  engineering:
    "The S-Class name, ABS, airbags and the unbreakable W123 build a reputation for engineering quality.",
  expansion:
    "Mercedes moves into compacts, SUVs, roadsters and vans, and works with McLaren on the SLR.",
  modern:
    "AMG becomes a sub-brand, Formula One titles pile up, and the EQ range brings the star into the electric age.",
};

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Timeline</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {CATALOG.length} milestone models, from the first petrol-powered vehicle to today&apos;s
        software-defined electric cars.
      </p>

      <nav className="sticky top-[57px] z-30 -mx-4 mt-8 flex gap-2 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        {ERAS.map((e) => (
          <a key={e.id} href={`#${e.id}`} className="shrink-0 rounded-full border border-line px-3 py-1 text-sm hover:border-foreground/40">
            {e.from}
          </a>
        ))}
      </nav>

      {ERAS.map((era) => {
        const models = CATALOG.filter((m) => m.eraId === era.id);
        return (
          <section key={era.id} id={era.id} className="mt-12 scroll-mt-32">
            <p className="font-mono text-sm text-accent">
              {era.from} – {era.to > 3000 ? "today" : era.to}
            </p>
            <h2 className="mt-1 font-display text-3xl">{era.name}</h2>
            <p className="mt-2 max-w-2xl text-muted">{ERA_INTRO[era.id]}</p>

            <ol className="relative mt-8 border-l border-line">
              {models.map((m) => (
                <li key={m.slug} className="relative pb-8 pl-6 sm:pl-8">
                  <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent ring-4 ring-background" />
                  <Link href={`/models/${m.slug}`} className="group flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-line sm:w-56">
                      {m.images[0] && (
                        <Image
                          src={m.images[0].src}
                          alt={m.name}
                          fill
                          sizes="(min-width: 640px) 224px, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-sm text-muted">{yearsLabel(m)}</p>
                      <h3 className="text-lg font-semibold group-hover:text-accent">
                        {m.name}
                        {m.code && !m.name.includes(m.code) && (
                          <span className="ml-2 font-mono text-sm font-normal text-muted">{m.code}</span>
                        )}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{m.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
