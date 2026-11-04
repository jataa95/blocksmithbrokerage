"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { listings } from "@/lib/content";
import { useInView } from "@/hooks/motion";
import { ArrowUpRight, MaskText } from "./Reveal";

/** Accent "filmstrip" of featured properties, switchable by area. */
export function Listings() {
  const [current, setCurrent] = useState(0);
  const [stripRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const item = listings[current];

  return (
    <section id="listings" className="relative bg-accent pb-[8vw] pt-[10vw] text-white">
      <div className="flex flex-col justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-end">
        <MaskText text={"Featured\nresidences."} className="t-display" />
        <nav aria-label="Featured listings" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px]">
          <span className="text-white/60">Our listings /</span>
          {listings.map((l, i) => (
            <button
              key={l.name}
              type="button"
              onClick={() => setCurrent(i)}
              aria-pressed={i === current}
              className={`transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
            >
              {l.area}
            </button>
          ))}
        </nav>
      </div>

      <div ref={stripRef} className={`mt-12 grid grid-cols-1 gap-2 px-2 sm:grid-cols-[0.85fr_1.3fr_0.85fr] ${inView ? "is-in" : ""}`}>
        {item.images.map((_, i) => (
          <div
            key={i}
            className={`fade-up relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:h-[clamp(240px,30vw,520px)] ${inView ? "is-in" : ""} ${
              i !== 1 ? "hidden sm:block" : ""
            }`}
            style={{ "--d": `${i * 110}ms` } as CSSProperties}
          >
            {listings.map((l, li) => (
              <Image
                key={l.name}
                src={l.images[i]}
                alt={i === 1 ? `${l.name}, ${l.area}` : ""}
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className={`object-cover transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-out)] ${
                  li === current ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mx-4 mt-6 flex flex-col gap-6 border-t border-white/20 pt-6 sm:mx-6 md:flex-row md:items-center md:justify-between">
        <div key={item.name} className="animate-[fadeIn_700ms_var(--ease-out)]">
          <h3 className="t-h3">{item.name}</h3>
          <p className="mt-3 text-[13px] text-white/70">
            {item.area} · {item.beds} bedrooms · {item.type} · <span className="text-white">{item.price}</span>
          </p>
        </div>
        <a href="#contact" className="capsule self-start border-white/40 hover:bg-white hover:text-accent md:self-auto">
          Arrange a viewing <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </section>
  );
}
