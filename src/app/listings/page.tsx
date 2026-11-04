import type { Metadata } from "next";
import { Cta } from "@/components/Closing";
import { Gallery } from "@/components/Gallery";
import { ListingCards } from "@/components/Listings";
import { PageHero } from "@/components/PageHero";
import { FadeUp, MaskText } from "@/components/Reveal";
import { gallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Listings",
  description: "Luxury duplexes for sale in VGC and 2nd Toll Gate, Lekki — with a full photo gallery of every home.",
};

export default function ListingsPage() {
  return (
    <main>
      <PageHero
        label="Listings · Lekki, Lagos"
        title="Residences"
        intro="Every home we represent is verified, titled and photographed in full. Browse what’s available now, then step inside."
        image="/images/hero-lounge.jpg"
      />

      <section className="bg-white px-4 pb-[8vw] pt-[6vw] sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <MaskText text={"Available\nnow."} className="t-h2" />
          <FadeUp className="max-w-[340px] text-[15px] leading-relaxed text-ink/70">
            Each home comes with Governor’s Consent and building approval. Select a home to arrange a private viewing.
          </FadeUp>
        </div>
        <ListingCards dark={false} />
      </section>

      <section className="bg-white px-4 pb-[10vw] sm:px-6" aria-labelledby="gallery-title">
        <div className="mb-10 flex flex-col justify-between gap-6 border-t border-line pt-[6vw] md:flex-row md:items-end">
          <MaskText as="h2" id="gallery-title" text={"Inside our\nhomes."} className="t-h2" />
          <FadeUp className="max-w-[340px] text-[15px] leading-relaxed text-ink/70">
            {gallery.length} photographs from across our current listings — living spaces, kitchens, bedrooms, baths and
            leisure. Select any photo to view it full size.
          </FadeUp>
        </div>
        <Gallery />
      </section>

      <Cta />
    </main>
  );
}
