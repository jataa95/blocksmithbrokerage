"use client";

import Image from "next/image";
import { useRef } from "react";
import { brand } from "@/lib/content";
import { mix, range, stickyProgress, useScrollFrame } from "@/hooks/motion";
import { WordsIn } from "./Reveal";

/**
 * Pinned section: a framed photo grows to full-bleed as you scroll,
 * the copy beside it gives way, and a closing line appears over the image.
 */
export function Showcase() {
  const outerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const outer = outerRef.current;
    if (!outer || !frameRef.current || !imageRef.current || !copyRef.current || !finalRef.current) return;
    const p = stickyProgress(outer);
    const grow = range(p, 0.08, 0.7);
    const e = grow < 0.5 ? 4 * grow ** 3 : 1 - (-2 * grow + 2) ** 3 / 2;
    const wide = innerWidth >= 768;

    // Inset (in % of the viewport) that frames the photo before it expands.
    const top = mix(wide ? 18 : 46, 0, e);
    const bottom = mix(wide ? 18 : 6, 0, e);
    const left = mix(wide ? 2 : 4, 0, e);
    const right = mix(wide ? 56 : 4, 0, e);
    const radius = mix(6, 0, e);
    frameRef.current.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}% round ${radius}px)`;
    imageRef.current.style.transform = `scale(${mix(1.25, 1, e)})`;

    copyRef.current.style.opacity = String(1 - range(p, 0.05, 0.3));
    copyRef.current.style.transform = `translate3d(0, ${-range(p, 0.05, 0.3) * 40}px, 0)`;

    const f = range(p, 0.68, 0.9);
    finalRef.current.style.opacity = String(f);
    finalRef.current.style.transform = `translate3d(0, ${(1 - f) * 40}px, 0)`;
  });

  return (
    <section ref={outerRef} className="relative h-[260vh] bg-white" aria-labelledby="approach-label">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={copyRef} className="absolute inset-x-4 top-[8vh] sm:inset-x-6 md:left-[48%] md:right-[4vw] md:top-1/2 md:-translate-y-1/2">
          <p id="approach-label" className="t-label mb-6 text-accent">
            The {brand.name} approach
          </p>
          <WordsIn
            className="t-lead max-w-[600px] text-accent"
            text="Great property starts with understanding you. We pair deep local market knowledge with discreet, tailored advice — to find spaces that fit your life and grow in value."
          />
        </div>

        <div ref={frameRef} className="photo absolute inset-0 overflow-hidden will-change-[clip-path]">
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <Image src="/images/lounge.jpg" alt="A sunlit living room with timber floors" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/25" />
          <div ref={finalRef} className="absolute inset-0 grid place-items-center px-6 text-center text-white opacity-0">
            <p className="t-display max-w-[14ch]">Considered. Discreet. Exceptional.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
