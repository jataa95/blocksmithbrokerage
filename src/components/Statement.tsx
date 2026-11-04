"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";
import { range, useInView, useScrollFrame } from "@/hooks/motion";

type Token = { type: "word"; text: string } | { type: "icon"; src: string };

// Inline photo "pills" sit inside the sentence like illustrations.
const statement: (string | { icon: string })[] = [
  "At Blocsmith, we believe real estate is more than property — it’s about building lasting value, one block at a time.",
  { icon: "/images/timber-house.jpg" },
  "Based in Lagos, we connect individuals, families and investors with exceptional homes",
  { icon: "/images/living-room.jpg" },
  "and commercial spaces. Guided by trust, transparency and tailored service, we stay with you at every step —",
  { icon: "/images/towers.jpg" },
  "whether you’re buying, leasing or investing.",
];

const tokens: Token[] = statement.flatMap<Token>((part) =>
  typeof part === "string"
    ? part.split(" ").map((text) => ({ type: "word" as const, text }))
    : [{ type: "icon" as const, src: part.icon }],
);

export function Statement() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [read, setRead] = useState(0);

  useScrollFrame(() => {
    const el = textRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Starts filling as the paragraph enters; finishes as its end passes 45% of the viewport.
    const p = range(innerHeight * 0.85 - r.top, 0, r.height + innerHeight * 0.4);
    setRead(Math.round(p * tokens.length));
  });

  return (
    <section id="about" className="bg-white px-4 pb-[12vw] pt-[8vw] sm:px-6">
      <div className="grid gap-8 md:grid-cols-[22%_1fr]">
        <h2 className="t-label flex items-center gap-4 text-ink/70 md:pt-4">
          <span className="h-px w-10 bg-ink/20" />
          Who we are
        </h2>
        <p ref={textRef} className="t-statement max-w-[1100px]">
          {tokens.map((t, i) =>
            t.type === "word" ? (
              <span key={i}>
                <span className={`reading-word ${i < read ? "is-read" : ""}`}>{t.text}</span>{" "}
              </span>
            ) : (
              <span key={i}>
                <span className={`reading-icon ${i < read ? "is-read" : ""}`} aria-hidden="true">
                  <Image src={t.src} alt="" fill sizes="120px" className="object-cover" />
                </span>{" "}
              </span>
            ),
          )}
        </p>
      </div>

      <div className="mt-[8vw] grid gap-10 border-t border-line pt-10 sm:grid-cols-3 md:ml-[22%]">
        {stats.map((s, i) => (
          <Stat key={s.label} {...s} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 1600;
    let frame = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setN(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, delay]);

  return (
    <div ref={ref}>
      <p className="t-h3 tabular-nums text-accent">
        {n}
        {suffix}
      </p>
      <p className="t-label mt-3 text-ink/60">{label}</p>
    </div>
  );
}
