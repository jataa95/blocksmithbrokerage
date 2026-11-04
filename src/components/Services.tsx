"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/content";
import { FadeUp, MaskText } from "./Reveal";

/** Editorial service rows that open to reveal scope and imagery on hover. */
export function Services({ showAll = false, title = "Services" }: { showAll?: boolean; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white px-4 pb-[8vw] pt-[10vw] sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <MaskText text={title} className="t-display text-accent" />
        <FadeUp className="max-w-[340px] text-[15px] leading-relaxed text-ink/70">
          From prime residential sales to commercial leasing, every mandate is handled with the same care, discretion and
          market insight.
        </FadeUp>
      </div>

      <ul className="mt-12 border-t border-line">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <li
              key={s.title}
              className="border-b border-line"
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
            >
              <FadeUp delay={i * 80}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3 py-8 text-left md:grid-cols-[32%_1fr_auto] md:py-10"
                >
                  <span className="col-start-1 row-start-1">
                    <span className="t-row block text-accent">{s.title}</span>
                    <span className="mt-2 block text-[11px] text-accent/70">{s.meta}</span>
                  </span>
                  <span className="col-span-2 col-start-1 row-start-2 max-w-[440px] md:col-span-1 md:col-start-2 md:row-start-1">
                    <span className="block text-[15px] leading-snug text-accent">{s.summary}</span>
                    <span className="mt-2 block text-[11px] text-accent/60">{s.detail}</span>
                  </span>
                  <span className="t-row col-start-2 row-start-1 flex items-center gap-4 text-accent md:col-start-3">
                    <span className="tabular-nums">0{i + 1}</span>
                    <span
                      aria-hidden="true"
                      className={`grid size-9 place-items-center rounded-full border border-accent/30 text-base transition-transform duration-500 ease-[var(--ease-spring)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-[900ms] ease-[var(--ease-out)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`grid gap-6 pb-10 transition-opacity duration-700 md:grid-cols-[32%_1fr_auto] ${
                        isOpen ? "opacity-100 delay-150" : "opacity-0"
                      }`}
                    >
                      <div className="photo relative hidden aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-[4px] md:block">
                        <Image src={s.image} alt="" fill sizes="320px" className="object-cover" />
                      </div>
                      <ul className="grid content-start gap-x-8 gap-y-2 text-[14px] text-ink/80 sm:grid-cols-2">
                        {s.scope.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 border-b border-line pb-2">
                            <span className="size-1 shrink-0 translate-y-[-2px] rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="capsule self-start text-accent hover:bg-accent hover:text-white">
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </li>
          );
        })}
      </ul>
      {!showAll && (
        <div className="mt-10">
          <Link href="/services" className="capsule text-accent hover:bg-accent hover:text-white">
            How we work
          </Link>
        </div>
      )}
    </section>
  );
}
