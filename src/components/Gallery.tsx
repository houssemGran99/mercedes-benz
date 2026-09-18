"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CarImage } from "@/lib/catalog";

export function Gallery({ images, name }: { images: CarImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const img = images[active];

  const go = useCallback(
    (d: number) => setActive((i) => (i + d + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  if (!img) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-dashed border-line text-muted">
        No photos found for this model yet.
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-line"
        aria-label="Open photo in full screen"
      >
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt || name}
          fill
          preload
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </button>
      <Credit img={img} />

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-6 gap-2">
          {images.map((im, i) => (
            <button
              key={im.src}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg transition ${
                i === active ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={im.src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} photos`}
          className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between p-4 text-sm">
            <span className="font-mono">
              {active + 1} / {images.length}
            </span>
            <button onClick={() => setOpen(false)} className="rounded-full px-3 py-1 hover:bg-white/10">
              Close ✕
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={img.src} alt={img.alt || name} fill sizes="100vw" className="object-contain" />
            {images.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </div>
          <div className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
            <Credit img={img} dark />
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-3" : "right-3"} grid size-11 place-items-center rounded-full bg-white/10 text-xl hover:bg-white/20`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}

function Credit({ img, dark = false }: { img: CarImage; dark?: boolean }) {
  return (
    <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-muted"}`}>
      Photo:{" "}
      <a href={img.source} target="_blank" rel="noreferrer" className="underline hover:text-accent">
        {img.author.slice(0, 80)}
      </a>
      {" · "}
      {img.licenseUrl ? (
        <a href={img.licenseUrl} target="_blank" rel="noreferrer" className="underline hover:text-accent">
          {img.license}
        </a>
      ) : (
        img.license
      )}
      {" · via Wikimedia Commons"}
    </p>
  );
}
