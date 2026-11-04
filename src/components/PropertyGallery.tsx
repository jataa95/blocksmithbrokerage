"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { Photo } from "@/lib/listings";
import { lockScroll } from "./SmoothScroll";

/** A property's photos (flyer first) in a masonry grid, with a full-screen viewer. */
export function PropertyGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    lockScroll(open !== null);
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="columns-1 gap-2 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <li
            key={p.src}
            className="mb-2 break-inside-avoid animate-[fadeIn_800ms_var(--ease-out)_both]"
            style={{ animationDelay: `${Math.min(i * 50, 600)}ms` } as CSSProperties}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="photo group relative block w-full overflow-hidden"
              aria-label={`View photo ${i + 1} of ${photos.length}: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={`${name} — ${p.alt}`}
                width={p.width}
                height={p.height}
                preload={i === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full group-hover:scale-[1.03]"
              />
              <span className="t-micro absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                {p.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — ${current.alt}`}
          className="fixed inset-0 z-[80] flex flex-col bg-night/95 text-white backdrop-blur-md animate-[fadeIn_400ms_var(--ease-out)]"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <p className="text-[13px] text-white/70">
              <span className="tabular-nums text-white">
                {open! + 1} / {photos.length}
              </span>{" "}
              · {current.alt}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="capsule shrink-0 border-white/30 hover:bg-white hover:text-ink"
              autoFocus
            >
              Close ✕
            </button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={() => setOpen(null)}>
            <Image
              key={current.src}
              src={current.src}
              alt={`${name} — ${current.alt}`}
              fill
              sizes="100vw"
              className="object-contain p-2 animate-[fadeIn_500ms_var(--ease-out)] sm:p-6"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex justify-center gap-2 pb-6 pt-2">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              className="capsule size-11 justify-center !px-0 border-white/30 hover:bg-white hover:text-ink"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              className="capsule size-11 justify-center !px-0 border-white/30 hover:bg-white hover:text-ink"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
