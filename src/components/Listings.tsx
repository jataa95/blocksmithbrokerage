import Image from "next/image";
import { listings } from "@/lib/content";
import { ArrowUpRight, FadeUp, MaskText } from "./Reveal";

/** Dark "featured residences" section: one card per current listing. */
export function Listings() {
  return (
    <section id="listings" className="relative bg-accent pb-[8vw] pt-[10vw] text-white">
      <div className="flex flex-col justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-end">
        <MaskText text={"Featured\nresidences."} className="t-display" />
        <FadeUp className="max-w-[340px] text-[15px] leading-relaxed text-white/70">
          Current homes across Lekki, each with Governor’s Consent and building approval.
        </FadeUp>
      </div>

      <ul className="mt-12 grid gap-x-2 gap-y-10 px-2 md:grid-cols-2">
        {listings.map((l, i) => (
          <li key={l.image}>
            <FadeUp delay={(i % 2) * 120}>
              <a href="#contact" className="group block" aria-label={`${l.name}, ${l.area}, ${l.price} — arrange a viewing`}>
                <div className="photo relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={l.image}
                    alt={`${l.name} in ${l.area}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03]"
                  />
                  <span className="t-micro absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm">
                    {l.status}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6 border-b border-white/15 px-2 py-5">
                  <div>
                    <h3 className="text-[clamp(24px,2.2vw,36px)] font-semibold leading-tight tracking-[-0.04em]">{l.name}</h3>
                    <p className="mt-1.5 text-[13px] text-white/60">
                      {l.area} · {l.title}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-[clamp(24px,2.2vw,36px)] font-semibold tracking-[-0.04em]">{l.price}</span>
                    <ArrowUpRight className="size-5 text-white/50 transition-[transform,color] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                </div>
              </a>
            </FadeUp>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center px-4">
        <a href="#contact" className="capsule border-white/40 hover:bg-white hover:text-accent">
          Arrange a viewing <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </section>
  );
}
