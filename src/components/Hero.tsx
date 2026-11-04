"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brand, heroSlides, heroVideo } from "@/lib/content";
import { clamp, useScrollFrame } from "@/hooks/motion";
import { Logo } from "./Logo";
import { RippleText } from "./RippleText";

const SLIDE_MS = 5200;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video: respect reduced motion, and follow the pause button.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  useEffect(() => {
    if (heroVideo || paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  // Title drifts sideways and the photo parallaxes as the hero scrolls away.
  useScrollFrame(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;
    const h = section.offsetHeight;
    const p = clamp(scrollY / (h * 0.85));
    const overflow = Math.max(0, title.scrollWidth - innerWidth + 32);
    title.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px,0,0)`;
    if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0,${(scrollY * 0.35).toFixed(1)}px,0)`;
  });

  const next = (index + 1) % heroSlides.length;

  return (
    <section ref={sectionRef} id="top" className="photo-hover relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-white">
      <div ref={mediaRef} className="photo absolute inset-0 will-change-transform">
        {heroVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            src={heroVideo.src}
            poster={heroVideo.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          heroSlides.map((src, i) => (
            <div key={src} className={`slide absolute inset-0 overflow-hidden ${i === index ? "is-active" : ""}`}>
              <Image src={src} alt="" fill sizes="100vw" preload={i === 0} className="object-cover" />
            </div>
          ))
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-start justify-between px-4 pt-6 sm:px-6 sm:pt-7">
        <Link href="/" aria-label={`${brand.legalName} — home`}>
          <Logo className="h-11 sm:h-12" />
        </Link>
        <p className="t-micro absolute left-1/2 top-8 hidden -translate-x-1/2 md:block">{brand.tagline}</p>
      </div>

      {/* Bottom block */}
      <div className="absolute inset-x-0 bottom-[4vw] z-10">
        <div className="flex items-end justify-between gap-6 px-4 pb-6 sm:px-6">
          <div className="flex max-w-[360px] items-center gap-4">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={`${paused ? "Play" : "Pause"} ${heroVideo ? "video" : "slideshow"}`}
              className="group relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/40"
            >
              <Image src={heroVideo ? heroVideo.poster : heroSlides[next]} alt="" fill sizes="48px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute bottom-0 right-0 grid size-4 place-items-center rounded-full bg-ink text-[6px]">
                {paused ? "▶" : "❚❚"}
              </span>
            </button>
            <p className="text-[12px] leading-[1.45] text-white/90">
              We broker, acquire and lease exceptional homes and commercial spaces across Lagos.
            </p>
          </div>
          <p className="hidden items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-[9px] font-medium backdrop-blur-sm sm:flex">
            <span className="size-1.5 rounded-full bg-white" />
            Ikoyi · Lekki · Victoria Island · Banana Island
          </p>
        </div>
        <div ref={titleRef} className="w-max will-change-transform">
          <RippleText as="h1" text="Homes of distinction" className="t-hero whitespace-nowrap px-4 sm:px-6" />
        </div>
      </div>

      <div className="curve-up absolute -bottom-px left-0 z-10 h-[5vw] w-full bg-white" />
    </section>
  );
}
