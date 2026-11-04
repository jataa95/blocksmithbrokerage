"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { brand, nav } from "@/lib/content";
import { ArrowUpRight, FadeUp, MaskText } from "./Reveal";
import { Logo } from "./Logo";
import { RippleText } from "./RippleText";

export function Cta() {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: PointerEvent) => {
    const card = cardRef.current;
    if (!card || e.pointerType !== "mouse") return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg) rotateZ(-4deg)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <section className="relative z-10 bg-white" aria-labelledby="cta-title">
      <div className="grid items-center gap-12 px-4 pb-[6vw] pt-[8vw] sm:px-6 md:grid-cols-2">
        <div>
          <MaskText as="h2" id="cta-title" text={"Right address.\nRight advice."} className="t-h2 text-accent" />
          <FadeUp delay={200} className="mt-6 text-[15px] leading-relaxed text-accent">
            Tell us what you’re looking for.
            <br />
            We’ll take it from here.
          </FadeUp>
        </div>
        <div className="flex justify-center md:justify-end md:pr-[6vw]" onPointerMove={onMove} onPointerLeave={onLeave}>
          <a
            ref={cardRef}
            href="#contact"
            className="group relative flex aspect-[3/4] w-[min(64vw,280px)] flex-col justify-between overflow-hidden rounded-[6px] bg-accent p-6 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out [transform:perspective(900px)_rotateY(-14deg)_rotateX(6deg)_rotateZ(-4deg)]"
          >
            <Image src="/images/white-villa.jpg" alt="" fill sizes="280px" className="object-cover opacity-25 mix-blend-luminosity" />
            <span className="relative t-micro">Private viewing</span>
            <span className="relative">
              <Logo className="h-14" />
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 text-[12px] transition-colors group-hover:bg-white group-hover:text-accent">
                Book a viewing <ArrowUpRight className="size-3.5" />
              </span>
            </span>
          </a>
        </div>
      </div>
      <div className="curve-down absolute -bottom-[5vw] left-0 h-[5vw] w-full bg-white" />
    </section>
  );
}

function LagosTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos",
    });
    const update = () => setTime(fmt.format(new Date()).toUpperCase());
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>Local time {time || "--:--"} WAT</span>;
}

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="relative overflow-hidden bg-night pt-[12vw] text-white">
      <Image src="/images/towers.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/70 to-night" />

      <div className="relative px-4 sm:px-6">
        <p className="t-micro text-white/70">Have something in mind?</p>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <MaskText as="h2" text={"Let’s find your\nnext address."} className="t-display !font-medium" />
          <FadeUp delay={200} className="flex flex-col gap-5 text-[14px] md:pt-3">
            <p className="text-white/80">Sales, acquisitions, leasing and advisory across Lagos — handled personally.</p>
            <a href={`mailto:${brand.email}`} className="group inline-flex items-center gap-3 text-[15px]">
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="flex flex-col gap-1 text-[13px] text-white/60">
              <a href={`mailto:${brand.email}`} className="hover:text-white">
                {brand.email}
              </a>
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {brand.phone}
              </a>
              <span>{brand.address}</span>
            </div>
            <form
              className="mt-2 flex max-w-[380px] items-center border-b border-white/30 focus-within:border-white"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: connect to the client's newsletter provider.
                setSent(true);
              }}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder={sent ? "Thank you — you’re subscribed." : "Market insights, monthly. Your email"}
                className="w-full bg-transparent py-3 text-[14px] outline-none placeholder:text-white/50"
              />
              <button type="submit" aria-label="Subscribe" className="p-2">
                <ArrowUpRight className="size-4 rotate-45" />
              </button>
            </form>
          </FadeUp>
        </div>

        <div className="mt-[8vw] flex flex-col justify-between gap-6 border-t border-white/15 pt-6 text-[12px] text-white/60 sm:flex-row">
          <p>
            Based in Lagos.
            <br />
            Advising worldwide.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.slice(1).map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href="#top" className="inline-flex items-center gap-1 hover:text-white">
              Back to top <ArrowUpRight className="size-3" />
            </a>
          </nav>
        </div>
      </div>

      <RippleText
        text={brand.name.toUpperCase()}
        className="relative mt-[4vw] block whitespace-nowrap text-center text-[17.5vw] font-semibold leading-[0.8] tracking-[-0.06em]"
        strength={0.12}
      />

      <div className="relative flex flex-col gap-2 px-4 pb-6 pt-8 text-[11px] text-white/50 sm:flex-row sm:justify-between sm:px-6">
        <span className="flex items-center gap-4">
          <Logo className="h-8 opacity-80" />© 2026 {brand.legalName}
        </span>
        <span className="flex gap-5">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
        </span>
        <LagosTime />
      </div>
    </footer>
  );
}
