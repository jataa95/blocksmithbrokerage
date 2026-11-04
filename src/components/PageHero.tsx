import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/content";
import { Logo } from "./Logo";
import { WordsIn } from "./Reveal";
import { RippleText } from "./RippleText";

/** Opening banner for inner pages: photo, label, giant rippling title, curved edge. */
export function PageHero({
  label,
  title,
  intro,
  image,
}: {
  label: string;
  title: string;
  intro: string;
  image: string;
}) {
  return (
    <section className="photo-hover relative flex min-h-[78svh] flex-col justify-between overflow-hidden bg-night text-white">
      <div className="photo absolute inset-0">
        <Image src={image} alt="" fill preload sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />
      </div>

      <div className="relative z-10 px-4 pt-6 sm:px-6 sm:pt-7">
        <Link href="/" aria-label={`${brand.legalName} — home`}>
          <Logo className="h-11 sm:h-12" />
        </Link>
      </div>

      <div className="relative z-10 pb-[7vw]">
        <div className="flex flex-col gap-4 px-4 pb-4 sm:px-6 md:flex-row md:items-end md:justify-between">
          <p className="t-micro text-white/80">{label}</p>
          <WordsIn text={intro} className="max-w-[420px] text-[15px] leading-relaxed text-white/85" />
        </div>
        <div style={{ fontSize: `min(clamp(72px, 12.2vw, 240px), ${(150 / title.length).toFixed(1)}vw)` }}>
          <RippleText as="h1" text={title} className="t-hero whitespace-nowrap px-4 !text-[length:inherit] sm:px-6" />
        </div>
      </div>

      <div className="curve-up absolute -bottom-px left-0 z-10 h-[5vw] w-full bg-white" />
    </section>
  );
}
