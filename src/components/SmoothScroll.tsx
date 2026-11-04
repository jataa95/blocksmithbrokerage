"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling, plus smooth in-page anchor links. */
export function SmoothScroll() {
  const pathname = usePathname();

  // New page: jump to the top without easing.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    window.__lenis = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id === "#") return;
      const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}

export function lockScroll(locked: boolean) {
  const lenis = window.__lenis;
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  } else {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }
}
