"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { brand } from "@/lib/content";
import { lockScroll } from "./SmoothScroll";

/**
 * Brand entrance: a full-screen accent panel whose wordmark letters rise in,
 * then the whole panel lifts away to reveal the hero. Plays once per visit.
 */
export function Intro() {
  const [phase, setPhase] = useState<"hidden" | "in" | "out" | "done">("hidden");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("bs:intro") === "1";
    } catch {}
    const skip = seen || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const frame = requestAnimationFrame(() => {
      if (skip) {
        setPhase("done");
        return;
      }
      setPhase("in");
      lockScroll(true);
      timers.push(setTimeout(() => setPhase("out"), 1500));
      timers.push(
        setTimeout(() => {
          setPhase("done");
          lockScroll(false);
          try {
            sessionStorage.setItem("bs:intro", "1");
          } catch {}
        }, 2600),
      );
    });
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      lockScroll(false);
    };
  }, []);

  if (phase === "done") return null;

  const letters = [...brand.name.toUpperCase()];
  return (
    <div
      aria-hidden="true"
      className={`bs-intro fixed inset-0 z-[90] flex items-center bg-accent text-white transition-transform duration-[1100ms] ease-[cubic-bezier(.76,0,.24,1)] ${
        phase === "out" ? "-translate-y-[calc(100%+7vw)]" : ""
      }`}
    >
      <div className="t-hero flex w-full justify-center whitespace-nowrap px-[2vw] !text-[17vw] !leading-none">
        {letters.map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.05em]">
            <span
              className={`inline-block transition-transform duration-[900ms] ease-[var(--ease-out)] ${
                phase === "in" || phase === "out" ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionDelay: `${120 + i * 45}ms` } as CSSProperties}
            >
              {ch}
            </span>
          </span>
        ))}
      </div>
      <div className="curve-down absolute -bottom-[6vw] left-0 h-[6vw] w-full bg-accent" />
    </div>
  );
}
