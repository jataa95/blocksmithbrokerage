import Image from "next/image";
import Link from "next/link";
import { listings } from "@/lib/content";
import { ArrowUpRight, FadeUp, MaskText } from "./Reveal";

/** Grid of listing cards. */
export function ListingCards({ dark = true }: { dark?: boolean }) {
  const muted = dark ? "text-white/60" : "text-ink/60";
  const rule = dark ? "border-white/15" : "border-line";
  return (
    <ul className="grid gap-x-2 gap-y-10 md:grid-cols-2">
      {listings.map((l, i) => (
        <li key={l.image}>
          <FadeUp delay={(i % 2) * 120}>
            <Link href="/contact" className="group block" aria-label={`${l.name}, ${l.area}, ${l.price} — arrange a viewing`}>
              <div className="photo relative aspect-[3/2] overflow-hidden">
                <Image
                  src={l.image}
                  alt={`${l.name} in ${l.area}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.03]"
                />
                <span className="t-micro absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-white backdrop-blur-sm">
                  {l.status}
                </span>
              </div>
              <div className={`flex items-start justify-between gap-6 border-b px-2 py-5 ${rule}`}>
                <div>
                  <h3 className="text-[clamp(24px,2.2vw,36px)] font-semibold leading-tight tracking-[-0.04em]">{l.name}</h3>
                  <p className={`mt-1.5 text-[13px] ${muted}`}>
                    {l.area} · {l.title}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-[clamp(24px,2.2vw,36px)] font-semibold tracking-[-0.04em]">{l.price}</span>
                  <ArrowUpRight className="size-5 opacity-50 transition-[transform,opacity] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          </FadeUp>
        </li>
      ))}
    </ul>
  );
}

/** Home page: dark "featured residences" section. */
export function Listings() {
  return (
    <section className="relative bg-accent pb-[8vw] pt-[10vw] text-white">
      <div className="flex flex-col justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-end">
        <MaskText text={"Featured\nresidences."} className="t-display" />
        <FadeUp className="max-w-[340px] text-[15px] leading-relaxed text-white/70">
          Current homes across Lekki, each with Governor’s Consent and building approval.
        </FadeUp>
      </div>

      <div className="mt-12 px-2">
        <ListingCards />
      </div>

      <div className="mt-10 flex justify-center px-4">
        <Link href="/listings" className="capsule border-white/40 hover:bg-white hover:text-accent">
          See all listings &amp; photos <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
