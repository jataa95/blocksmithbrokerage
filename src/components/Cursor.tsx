"use client";

import { useEffect, useRef } from "react";

const interactive = 'a[href],button:not(:disabled),summary,[role="button"],label[for]';
const native = "input,textarea,select,[data-native-cursor]";

/** Blend-mode dot cursor that eases after the pointer and swells over links. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const el = ref.current;
    if (!el || !fine.matches || reduced.matches) return;

    document.documentElement.classList.add("has-brand-cursor");
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      frame = 0;

    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element;
      el.classList.toggle("is-hovering", !!t.closest?.(interactive));
      el.classList.toggle("is-hidden", !!t.closest?.(native));
      el.classList.add("is-visible");
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const onLeave = () => el.classList.remove("is-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-brand-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="group pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 size-3 scale-0 rounded-full bg-white opacity-0 transition-[scale,opacity] duration-500 ease-[var(--ease-spring)] group-[.is-visible]:scale-100 group-[.is-visible]:opacity-100 group-[.is-hovering]:scale-[4.5] group-[.is-hidden]:!scale-0" />
    </div>
  );
}
