import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG, getEntry, toCard } from "@/lib/catalog";
import { yearsLabel } from "@/data/models";
import { Gallery } from "@/components/Gallery";
import { CarCard } from "@/components/CarCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getEntry(slug);
  if (!found) return {};
  const { entry } = found;
  return {
    title: `${entry.name}${entry.code ? ` (${entry.code})` : ""}`,
    description: entry.summary,
    openGraph: entry.images[0] ? { images: [entry.images[0].src] } : undefined,
  };
}

export default async function ModelPage({ params }: PageProps<"/models/[slug]">) {
  const { slug } = await params;
  const found = getEntry(slug);
  if (!found) notFound();
  const { entry, prev, next } = found;

  const related = CATALOG.filter(
    (m) => m.slug !== entry.slug && (m.category === entry.category || m.eraId === entry.eraId),
  )
    .sort((a, b) => Math.abs(a.start - entry.start) - Math.abs(b.start - entry.start))
    .slice(0, 4);

  const facts: [string, string][] = [
    ["Production", yearsLabel(entry)],
    ["Era", entry.eraName],
    ["Category", entry.category],
    ...(entry.code ? [["Chassis code", entry.code] as [string, string]] : []),
    ["Status", entry.end === null ? "In production" : "Discontinued"],
  ];

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Models</Link>
        <span className="mx-2">/</span>
        <Link href={`/timeline#${entry.eraId}`} className="hover:text-foreground">{entry.eraName}</Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <Gallery images={entry.images} name={entry.name} />

        <div>
          <p className="font-mono text-sm text-accent">{yearsLabel(entry)}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{entry.name}</h1>
          {entry.code && <p className="mt-2 font-mono text-muted">{entry.code}</p>}
          <p className="mt-6 text-lg leading-relaxed">{entry.summary}</p>

          <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          {entry.extract && (
            <section className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">From Wikipedia</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {entry.extract.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={entry.wikiUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-accent underline"
              >
                Read the full article →
              </a>
            </section>
          )}
        </div>
      </div>

      <nav className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Chronological navigation">
        {prev ? (
          <Link href={`/models/${prev.slug}`} className="rounded-2xl border border-line p-4 hover:border-foreground/40">
            <span className="text-xs text-muted">← Earlier · {prev.start}</span>
            <span className="mt-1 block font-medium">{prev.name} {prev.code && !prev.name.includes(prev.code) ? prev.code : ""}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link href={`/models/${next.slug}`} className="rounded-2xl border border-line p-4 text-right hover:border-foreground/40">
            <span className="text-xs text-muted">Later · {next.start} →</span>
            <span className="mt-1 block font-medium">{next.name} {next.code && !next.name.includes(next.code) ? next.code : ""}</span>
          </Link>
        )}
      </nav>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl">Related models</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((m) => (
              <CarCard key={m.slug} car={toCard(m)} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
