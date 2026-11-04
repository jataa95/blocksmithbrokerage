import Image from "next/image";
import Link from "next/link";
import { listings, type Listing } from "@/lib/listings";
import { ArrowUpRight, FadeUp, MaskText } from "./Reveal";

/** One listing: its flyer, then reference, location and price. Opens the property page. */
export function ListingCard({ listing: l, dark = true, index = 0 }: { listing: Listing; dark?: boolean; index?: number }) {
  const flyer = l.photos[0];
  return (
    <FadeUp delay={(index % 4) * 90}>
      <Link href={`/listings/${l.slug}`} className="group block" aria-label={`${l.name}, ${l.location}, ${l.price} — view property`}>
        <div className="photo relative aspect-[3/4] overflow-hidden">
          <Image
            src={flyer.src}
            alt={`${l.name} in ${l.location} — ${l.price}`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-[1.03]"
          />
          <span className="t-micro absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
            {l.photos.length} photos
          </span>
        </div>
        <div className={`flex items-start justify-between gap-4 border-b px-1 py-4 ${dark ? "border-white/15" : "border-line"}`}>
          <div>
            <p className={`t-label ${dark ? "text-white/50" : "text-ink/50"}`}>
              {l.ref} · {l.status}
            </p>
            <h3 className="mt-1.5 text-[clamp(20px,1.6vw,26px)] font-semibold leading-tight tracking-[-0.03em]">{l.name}</h3>
            <p className={`mt-1 text-[13px] ${dark ? "text-white/60" : "text-ink/60"}`}>{l.location}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-5">
            <span className="text-[clamp(20px,1.6vw,26px)] font-semibold tracking-[-0.03em]">{l.price}</span>
            <ArrowUpRight className="size-4 opacity-50 transition-[transform,opacity] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </FadeUp>
  );
}

export function ListingGrid({ items, dark = true }: { items: Listing[]; dark?: boolean }) {
  return (
    <ul className="grid gap-x-2 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((l, i) => (
        <li key={l.slug}>
          <ListingCard listing={l} dark={dark} index={i} />
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
        <ListingGrid items={listings} />
      </div>

      <div className="mt-10 flex justify-center px-4">
        <Link href="/listings" className="capsule border-white/40 hover:bg-white hover:text-accent">
          Search all listings <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
