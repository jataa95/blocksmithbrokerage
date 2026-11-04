"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

/** Heading whose lines slide up from behind a mask, one after another. */
export function MaskText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 90,
  id,
}: {
  id?: string;
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const Comp = as as ElementType;
  const lines = text.split("\n");
  return (
    <Comp ref={ref} id={id} className={`${className} ${inView ? "is-in" : ""}`} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" aria-hidden="true">
          <span style={{ "--d": `${delay + i * stagger}ms` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Comp>
  );
}

/** Paragraph whose words rise in with a short stagger. */
export function WordsIn({
  text,
  as = "p",
  className = "",
  delay = 0,
  stagger = 14,
  maxDelay = 420,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  maxDelay?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const Comp = as as ElementType;
  const words = text.split(" ");
  return (
    <Comp ref={ref} className={`${className} ${inView ? "is-in" : ""}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span
            className="word-in"
            style={{ "--d": `${delay + Math.min(i * stagger, maxDelay)}ms` } as CSSProperties}
          >
            {w}
          </span>{" "}
        </span>
      ))}
    </Comp>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const Comp = as as ElementType;
  return (
    <Comp
      ref={ref}
      className={`fade-up ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="square" />
    </svg>
  );
}
