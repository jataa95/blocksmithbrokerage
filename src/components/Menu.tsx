"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { brand, nav } from "@/lib/content";
import { Logo } from "./Logo";
import { ArrowUpRight } from "./Reveal";
import { lockScroll } from "./SmoothScroll";

/** Floating capsule menu button plus the full-screen navigation it opens. */
export function Menu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="navigation"
        className="group fixed right-4 top-4 z-[70] flex h-10 items-center gap-3 rounded-full border border-black/10 bg-white/80 pl-4 pr-3.5 text-ink backdrop-blur-md transition-colors duration-500 hover:bg-white sm:right-6 sm:top-5"
      >
        <span className="relative grid">
          <span
            className={`t-micro col-start-1 row-start-1 transition-[opacity,transform] duration-500 ${open ? "-translate-y-2 opacity-0" : ""}`}
          >
            Menu
          </span>
          <span
            className={`t-micro col-start-1 row-start-1 transition-[opacity,transform] duration-500 ${open ? "" : "translate-y-2 opacity-0"}`}
          >
            Close
          </span>
        </span>
        <span className="relative block h-3 w-4" aria-hidden="true">
          <span
            className={`absolute left-0 top-[3px] h-px w-4 bg-current transition-transform duration-[620ms] ease-[var(--ease-spring)] ${
              open ? "translate-y-[2.5px] rotate-45" : "group-hover:translate-x-[2px]"
            }`}
          />
          <span
            className={`absolute left-0 top-[8px] h-px w-4 bg-current transition-transform duration-[620ms] ease-[var(--ease-spring)] ${
              open ? "-translate-y-[2.5px] -rotate-45" : "group-hover:-translate-x-[2px]"
            }`}
          />
        </span>
        <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
      </button>

      <div
        id="navigation"
        className={`fixed inset-0 z-[60] transition-[visibility] duration-700 ${open ? "visible" : "invisible delay-500"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-night/55 backdrop-blur-xl transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <a
          href="#top"
          onClick={() => setOpen(false)}
          aria-label={`${brand.legalName} — home`}
          className={`absolute left-4 top-4 z-10 transition-opacity duration-700 sm:left-6 sm:top-5 ${open ? "opacity-100 delay-300" : "opacity-0"}`}
        >
          <Logo className="h-10" />
        </a>
        <div className="relative flex h-full flex-col gap-6 overflow-y-auto px-4 pb-8 pt-20 sm:px-8 lg:flex-row lg:items-center lg:gap-4 lg:px-[4vw] lg:pt-8">
          <nav aria-label="Main" className="flex w-full flex-col gap-2 lg:w-[26vw] lg:min-w-[340px]">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group/link flex items-center justify-between px-5 py-3 font-display text-[clamp(40px,4.4vw,76px)] leading-[1.05] tracking-[-0.03em] transition-[transform,opacity,background-color] duration-[800ms] ease-[var(--ease-out)] ${
                  i % 2 ? "bg-accent text-white" : "bg-ivory text-ink"
                } ${open ? "translate-x-0 opacity-100" : "-translate-x-[110%] opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : `${(nav.length - i) * 30}ms` } as CSSProperties}
              >
                {item.label}
                <ArrowUpRight className="size-[0.6em] transition-transform duration-500 ease-[var(--ease-spring)] group-hover/link:rotate-45" />
              </a>
            ))}
            <div
              className={`mt-4 flex flex-col gap-1 text-sm text-white/80 transition-opacity duration-700 ${open ? "opacity-100 delay-500" : "opacity-0"}`}
            >
              <a href={`mailto:${brand.email}`} className="hover:text-white">
                {brand.email}
              </a>
              <span>{brand.phone}</span>
            </div>
          </nav>

          <div
            className={`photo relative hidden aspect-[4/5] h-[min(78vh,760px)] overflow-hidden transition-[clip-path,opacity] duration-[1000ms] ease-[var(--ease-out)] lg:block ${
              open ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(0_0_100%_0)]"
            }`}
            style={{ transitionDelay: open ? "200ms" : "0ms" }}
          >
            {nav.map((item, i) => (
              <Image
                key={item.href}
                src={item.image}
                alt=""
                fill
                sizes="40vw"
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] ${
                  active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
