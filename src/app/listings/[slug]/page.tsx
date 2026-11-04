import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingGrid } from "@/components/Listings";
import { Logo } from "@/components/Logo";
import { PropertyGallery } from "@/components/PropertyGallery";
import { ArrowUpRight, FadeUp, MaskText } from "@/components/Reveal";
import { brand } from "@/lib/content";
import { getListing, listings } from "@/lib/listings";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return {};
  return {
    title: `${l.name}, ${l.location} — ${l.price}`,
    description: `${l.beds} bedroom ${l.type.toLowerCase()} for sale in ${l.location}. ${l.title}. ${l.photos.length} photos.`,
    openGraph: { images: [l.photos[0].src] },
  };
}

export default async function ListingPage({ params }: PageProps<"/listings/[slug]">) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) notFound();

  const flyer = l.photos[0];
  const facts = [
    ["Price", l.price],
    ["Bedrooms", String(l.beds)],
    ["Type", l.type],
    ["Location", l.location],
    ["Title", l.title],
    ["Status", l.status],
    ["Reference", l.ref],
  ];
  const others = listings.filter((o) => o.slug !== l.slug);

  return (
    <main className="bg-white">
      <div className="flex items-center gap-6 px-4 pt-6 sm:px-6 sm:pt-7">
        <Link href="/" aria-label={`${brand.legalName} — home`}>
          <Logo tone="dark" className="h-11 sm:h-12" />
        </Link>
        <nav aria-label="Breadcrumb" className="hidden text-[12px] text-ink/60 sm:block">
          <Link href="/listings" className="hover:text-ink">
            Listings
          </Link>{" "}
          / <span className="text-ink">{l.ref}</span>
        </nav>
      </div>

      <section className="grid gap-10 px-4 pb-[8vw] pt-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-[5vw]">
        <FadeUp className="photo relative mx-auto aspect-[3/4] w-full max-w-[640px] overflow-hidden lg:sticky lg:top-6 lg:self-start">
          <Image src={flyer.src} alt={`${l.name}, ${l.location} — listing flyer`} fill preload sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </FadeUp>

        <div className="lg:pt-6">
          <p className="t-label text-ink/50">
            {l.ref} · {l.status}
          </p>
          <MaskText as="h1" text={l.name} className="t-h2 mt-4" />
          <p className="mt-3 text-[17px] text-ink/70">{l.location}</p>
          <p className="mt-8 text-[clamp(44px,5vw,84px)] font-semibold leading-none tracking-[-0.05em]">{l.price}</p>

          <dl className="mt-10 border-t border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-4 text-[15px]">
                <dt className="text-ink/50">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="capsule h-12 border-ink bg-ink px-6 text-[13px] text-white hover:bg-white hover:text-ink">
              Arrange a viewing <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={`mailto:${brand.email}?subject=${encodeURIComponent(`Enquiry: ${l.name}, ${l.location} (${l.ref})`)}`}
              className="capsule h-12 px-6 text-[13px] text-ink hover:bg-ink hover:text-white"
            >
              Email about this home
            </a>
          </div>
          <Link href="/listings" className="mt-8 inline-block text-[13px] text-ink/60 underline underline-offset-4 hover:text-ink">
            ← All listings
          </Link>
        </div>
      </section>

      <section className="px-4 pb-[10vw] sm:px-6" aria-labelledby="photos-title">
        <div className="mb-10 flex flex-col justify-between gap-6 border-t border-line pt-[6vw] md:flex-row md:items-end">
          <MaskText as="h2" id="photos-title" text={"Inside this\nhome."} className="t-h2" />
          <p className="max-w-[340px] text-[15px] leading-relaxed text-ink/70">
            {l.photos.length} photos. Select any photo to view it full size.
          </p>
        </div>
        <PropertyGallery photos={l.photos} name={`${l.name}, ${l.location}`} />
      </section>

      <section className="bg-accent px-2 pb-[8vw] pt-[8vw] text-white">
        <div className="mb-10 flex items-end justify-between gap-6 px-2 sm:px-4">
          <MaskText as="h2" text={"More homes."} className="t-h2" />
          <Link href="/listings" className="capsule border-white/40 hover:bg-white hover:text-accent">
            All listings <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <ListingGrid items={others} />
      </section>
    </main>
  );
}
