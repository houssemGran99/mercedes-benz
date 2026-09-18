import Image from "next/image";
import Link from "next/link";
import type { CardEntry } from "@/lib/catalog";
import { yearsLabel } from "@/data/models";

export function CarCard({ car, preload = false }: { car: CardEntry; preload?: boolean }) {
  return (
    <Link
      href={`/models/${car.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-line">
        {car.image ? (
          <Image
            src={car.image.src}
            alt={car.name}
            fill
            preload={preload}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">No photo yet</div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-xs text-white backdrop-blur">
          {yearsLabel(car)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">{car.category}</p>
        <h3 className="font-semibold leading-snug">
          {car.name}
          {car.code && !car.name.includes(car.code) && (
            <span className="ml-1.5 font-mono text-sm font-normal text-muted">{car.code}</span>
          )}
        </h3>
        <p className="line-clamp-3 text-sm text-muted">{car.summary}</p>
      </div>
    </Link>
  );
}
