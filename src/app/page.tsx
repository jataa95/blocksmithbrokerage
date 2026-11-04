import { Cta } from "@/components/Closing";
import { Hero } from "@/components/Hero";
import { Listings } from "@/components/Listings";
import { Services } from "@/components/Services";
import { Showcase } from "@/components/Showcase";
import { Statement } from "@/components/Statement";
import { Testimonials } from "@/components/Voices";

export default function Home() {
  return (
    <main>
      <Hero />
      <Statement />
      <Showcase />
      <Listings />
      <Services />
      <Testimonials />
      <Cta />
    </main>
  );
}
