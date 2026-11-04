import type { Metadata } from "next";
import { Cta } from "@/components/Closing";
import { PageHero } from "@/components/PageHero";
import { Showcase } from "@/components/Showcase";
import { Statement } from "@/components/Statement";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Voices";

export const metadata: Metadata = {
  title: "About",
  description: "Blocsmith is a Lagos real estate brokerage built on trust, transparency and tailored service.",
};

const values = [
  {
    title: "Trust",
    text: "Every property we put forward is verified — title, approvals and condition — before it reaches you.",
  },
  {
    title: "Transparency",
    text: "Clear pricing, clear terms and honest advice, including when a property isn’t the right fit.",
  },
  {
    title: "Tailored service",
    text: "No two clients are alike. We shape every search, sale and lease around your goals and timeline.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="About Blocsmith"
        title="About us"
        intro="Building lasting value, one block at a time — for individuals, families and investors across Lagos."
        image="/images/hero-living.jpg"
      />
      <Statement link={false} />
      <Steps label="What we stand for" title={"Our\nprinciples."} items={values} />
      <Showcase />
      <Testimonials />
      <Cta />
    </main>
  );
}
