import type { Metadata } from "next";
import { Cta } from "@/components/Closing";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Voices";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about buying, paying for and reselling property with Blocsmith.",
};

export default function FaqsPage() {
  return (
    <main>
      <PageHero
        label="FAQs"
        title="Questions"
        intro="What clients ask us most about buying, payment and resale. Can’t find your answer? Just ask."
        image="/images/interior-chandelier.jpg"
      />
      <Faq />
      <Cta />
    </main>
  );
}
