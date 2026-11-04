import type { Metadata } from "next";
import { Cta } from "@/components/Closing";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { Steps } from "@/components/Steps";

export const metadata: Metadata = {
  title: "Services",
  description: "Luxury sales, acquisitions, leasing and real estate advisory across Lagos.",
};

const process = [
  {
    title: "Consultation",
    text: "We start with your brief — budget, location, lifestyle and timeline — so every recommendation fits.",
  },
  {
    title: "Search & shortlist",
    text: "We draw on listed and off-market stock to put forward a focused shortlist, then arrange private viewings.",
  },
  {
    title: "Due diligence",
    text: "Title, approvals and documentation are verified before any commitment, so you buy or lease with confidence.",
  },
  {
    title: "Completion & beyond",
    text: "We negotiate terms, manage the transaction to completion, and stay on hand for resale, leasing or management.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Services"
        title="What we do"
        intro="Sales, acquisitions, leasing and advisory — each handled personally, with deep knowledge of the Lagos market."
        image="/images/hero-kitchen.jpg"
      />
      <Services showAll title={"Four ways\nwe help."} />
      <Steps label="How we work" title={"From brief\nto keys."} items={process} dark />
      <Cta />
    </main>
  );
}
