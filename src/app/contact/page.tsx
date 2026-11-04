import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { FadeUp, MaskText } from "@/components/Reveal";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Arrange a private viewing or speak to Blocsmith about buying, selling, leasing or investing in Lagos.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact"
        title="Let’s talk"
        intro="Arrange a private viewing, or tell us what you’re looking for. We’ll take it from here."
        image="/images/hero-living.jpg"
      />
      <section className="bg-white px-4 pb-[10vw] pt-[6vw] sm:px-6">
        <div className="grid gap-16 md:grid-cols-[32%_1fr]">
          <div>
            <MaskText text={"Start a\nconversation."} className="t-h2" />
            <FadeUp delay={150} className="mt-10 flex flex-col gap-6 text-[15px]">
              <div>
                <p className="t-label mb-2 text-ink/50">Email</p>
                <a href={`mailto:${brand.email}`} className="hover:underline">
                  {brand.email}
                </a>
              </div>
              <div>
                <p className="t-label mb-2 text-ink/50">Phone</p>
                <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
                  {brand.phone}
                </a>
              </div>
              <div>
                <p className="t-label mb-2 text-ink/50">Office</p>
                <p>{brand.address}</p>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={200}>
            <ContactForm />
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
