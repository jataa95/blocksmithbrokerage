import type { Metadata } from "next";
import { Cta } from "@/components/Closing";
import { ListingsBrowser } from "@/components/ListingsBrowser";
import { PageHero } from "@/components/PageHero";
import { FadeUp, MaskText } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Listings",
  description: "Luxury duplexes for sale in VGC and 2nd Toll Gate, Lekki. Search by area, bedrooms and budget.",
};

export default function ListingsPage() {
  return (
    <main>
      <PageHero
        label="Listings · Lekki, Lagos"
        title="Residences"
        intro="Every home we represent is verified, titled and photographed in full. Search what’s available now, then step inside."
        image="/images/hero-lounge.jpg"
      />

      <section className="bg-white px-4 pb-[10vw] pt-[6vw] sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <MaskText text={"Available\nnow."} className="t-h2" />
          <FadeUp className="max-w-[340px] text-[15px] leading-relaxed text-ink/70">
            Each home comes with Governor’s Consent and building approval. Select a home to see every photo and its full
            details.
          </FadeUp>
        </div>
        <ListingsBrowser />
      </section>

      <Cta />
    </main>
  );
}
