"use client";

import { useEffect, useRef, type ElementType } from "react";

/**
 * Giant wordmark whose letters spring upward as the pointer passes over them.
 */
export function RippleText({
  text,
  as = "div",
  className = "",
  strength = 0.22,
}: {
  text: string;
  as?: "h1" | "div" | "span";
  className?: string;
  /** Peak lift as a fraction of the font size. */
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Comp = as as ElementType;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const glyphs = [...root.querySelectorAll<HTMLSpanElement>(".ripple-letter")];
    const state = glyphs.map(() => ({ y: 0, v: 0, cx: 0 }));
    let pointerX: number | null = null;
    let frame = 0;
    let fontSize = 100;

    const measure = () => {
      fontSize = parseFloat(getComputedStyle(root).fontSize) || 100;
      glyphs.forEach((g, i) => {
        const r = g.getBoundingClientRect();
        state[i].cx = r.left + r.width / 2;
      });
    };

    const step = () => {
      frame = 0;
      let moving = false;
      const sigma = fontSize * 0.55;
      glyphs.forEach((g, i) => {
        const s = state[i];
        const target =
          pointerX === null ? 0 : -strength * fontSize * Math.exp(-((s.cx - pointerX) ** 2) / (2 * sigma * sigma));
        // Damped spring.
        s.v += (target - s.y) * 0.16;
        s.v *= 0.72;
        s.y += s.v;
        if (Math.abs(s.v) > 0.05 || Math.abs(target - s.y) > 0.05) moving = true;
        g.style.transform = `translate3d(0, ${s.y.toFixed(2)}px, 0)`;
      });
      if (moving) frame = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      if (pointerX === null) measure();
      pointerX = e.clientX;
      kick();
    };
    const onLeave = () => {
      pointerX = null;
      kick();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [strength]);

  return (
    <Comp ref={ref} className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="ripple-letter" aria-hidden="true">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Comp>
  );
}
