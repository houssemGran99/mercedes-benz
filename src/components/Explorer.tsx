"use client";

import { useMemo, useState } from "react";
import type { CardEntry } from "@/lib/catalog";
import { CarCard } from "./CarCard";

type Option = { id: string; label: string };

export function Explorer({
  cars,
  eras,
  categories,
}: {
  cars: CardEntry[];
  eras: Option[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"oldest" | "newest">("oldest");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = cars.filter(
      (c) =>
        (era === "all" || c.eraId === era) &&
        (category === "all" || c.category === category) &&
        (!q ||
          `${c.name} ${c.code ?? ""} ${c.start} ${c.category} ${c.summary}`
            .toLowerCase()
            .includes(q)),
    );
    return sort === "newest" ? [...list].reverse() : list;
  }, [cars, query, era, category, sort]);

  const reset = () => {
    setQuery("");
    setEra("all");
    setCategory("all");
  };

  return (
    <section id="models" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">Explore the models</h2>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            Showing {results.length} of {cars.length} models
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: SL, W123, 1954, electric…"
            aria-label="Search models"
            className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent sm:w-72"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "oldest" | "newest")}
            aria-label="Sort order"
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="oldest">Oldest first</option>
            <option value="newest">Newest first</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Era">
        {[{ id: "all", label: "All eras" }, ...eras].map((e) => (
          <button
            key={e.id}
            role="tab"
            aria-selected={era === e.id}
            onClick={() => setEra(e.id)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
              era === e.id
                ? "border-foreground bg-foreground text-background"
                : "border-line hover:border-foreground/40"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      {results.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {results.map((car, i) => (
            <CarCard key={car.slug} car={car} preload={i < 4} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          No models match these filters.{" "}
          <button onClick={reset} className="text-accent underline">
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
