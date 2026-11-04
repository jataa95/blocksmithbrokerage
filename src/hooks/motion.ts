"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Adds `is-in` once the element enters the viewport. */
export function useInView<T extends Element>(
  options: { threshold?: number; rootMargin?: string } = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.08, rootMargin = "0px 0px -6% 0px" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/**
 * Calls `cb` on every animation frame while the page scrolls or resizes.
 * Lenis drives native scroll, so window.scrollY stays the source of truth.
 */
export function useScrollFrame(cb: () => void) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = 0;
      cbRef.current();
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);
}

/** 0 when the element's top hits the viewport bottom, 1 when its bottom leaves the top. */
export function progressThrough(el: Element) {
  const r = el.getBoundingClientRect();
  const total = r.height + innerHeight;
  return clamp((innerHeight - r.top) / total);
}

/** 0 when a sticky container starts pinning, 1 when it releases. */
export function stickyProgress(el: Element) {
  const r = el.getBoundingClientRect();
  const distance = r.height - innerHeight;
  if (distance <= 0) return 0;
  return clamp(-r.top / distance);
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const range = (v: number, start: number, end: number) => clamp((v - start) / (end - start));
