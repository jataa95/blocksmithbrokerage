"use client";

import { useState } from "react";
import { faqs, testimonials } from "@/lib/content";
import { FadeUp, MaskText, WordsIn } from "./Reveal";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const many = testimonials.length > 1;

  return (
    <section className="bg-ivory px-4 py-[10vw] sm:px-6" aria-labelledby="testimonials-label">
      <div className="grid gap-8 md:grid-cols-[22%_1fr]">
        <h2 id="testimonials-label" className="t-label flex items-center gap-4 text-ink/70 md:pt-4">
          <span className="h-px w-10 bg-ink/20" />
          Client words
        </h2>
        <figure className="max-w-[1100px]">
          <div className="mb-8 flex gap-1 text-accent" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }, (_, s) => (
              <svg key={s} viewBox="0 0 20 20" className="size-4 fill-current" aria-hidden="true">
                <path d="m10 1.5 2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
              </svg>
            ))}
          </div>
          <blockquote key={i}>
            <WordsIn as="p" className="t-statement text-ink" text={`“${t.quote}”`} />
          </blockquote>
          <FadeUp delay={200}>
            <figcaption className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-6">
              <span className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-accent text-[13px] font-semibold text-white">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{t.name}</span>
                  <span className="block text-[13px] text-ink/60">{t.role}</span>
                </span>
              </span>
              {many && (
                <span className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)}
                    className="capsule size-10 justify-center !px-0 text-ink hover:bg-ink hover:text-white"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => setI((i + 1) % testimonials.length)}
                    className="capsule size-10 justify-center !px-0 text-ink hover:bg-ink hover:text-white"
                  >
                    →
                  </button>
                </span>
              )}
            </figcaption>
          </FadeUp>
        </figure>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white px-4 py-[10vw] sm:px-6">
      <div className="grid gap-10 md:grid-cols-[32%_1fr]">
        <div>
          <MaskText text={"Questions,\nanswered."} className="t-h2 text-accent" />
          <FadeUp className="mt-6 max-w-[300px] text-[15px] leading-relaxed text-ink/70" delay={150}>
            Quick answers to what clients ask us most. Can’t find yours? Just ask.
          </FadeUp>
        </div>
        <ul className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <FadeUp delay={i * 70}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[clamp(20px,1.8vw,30px)] font-medium tracking-[-0.03em] text-accent">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className={`grid size-9 shrink-0 place-items-center rounded-full border border-accent/30 text-accent transition-transform duration-500 ease-[var(--ease-spring)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden">
                      <span className="block max-w-[620px] pb-6 text-[15px] leading-relaxed text-ink/70">{f.a}</span>
                    </p>
                  </div>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
