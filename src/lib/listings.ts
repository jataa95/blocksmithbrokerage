/**
 * Current listings. Details come from the client's listing flyers; each
 * listing's first photo is its flyer. TODO(client): confirm availability and
 * that the photo groupings below are correct.
 */

export type Photo = { src: string; width: number; height: number; alt: string };

export type Listing = {
  slug: string;
  ref: string;
  name: string;
  area: string;
  location: string;
  type: string;
  beds: number;
  status: "For sale" | "For lease";
  price: string;
  priceValue: number;
  title: string;
  photos: Photo[];
};

export const listings: Listing[] = [
  {
    slug: "vgc-5-bed-luxury-duplex",
    ref: "BB-01",
    name: "5 Bed Luxury Duplex",
    area: "VGC",
    location: "VGC, Lekki",
    type: "Detached duplex",
    beds: 5,
    status: "For sale",
    price: "₦550M",
    priceValue: 550_000_000,
    title: "Governor’s Consent / Building Approval",
    photos: [
      { src: "/images/listings/vgc-5-bed-luxury-duplex/01.jpg", width: 1092, height: 1440, alt: "Listing flyer with price and details" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/02.jpg", width: 1213, height: 1600, alt: "Kitchen" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/03.jpg", width: 1213, height: 1600, alt: "Living room" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/04.jpg", width: 1213, height: 1600, alt: "Living area" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/05.jpg", width: 1213, height: 1600, alt: "Living room and staircase" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/06.jpg", width: 1213, height: 1600, alt: "Bedroom" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/07.jpg", width: 1213, height: 1600, alt: "Living room" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/08.jpg", width: 1213, height: 1600, alt: "Living area" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/09.jpg", width: 1213, height: 1600, alt: "Home gym" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/10.jpg", width: 1213, height: 1600, alt: "Double-height void with chandelier" },
      { src: "/images/listings/vgc-5-bed-luxury-duplex/11.jpg", width: 1213, height: 1600, alt: "Bathroom" },
    ],
  },
  {
    slug: "2nd-toll-gate-5-bed-luxury-duplex",
    ref: "BB-02",
    name: "5 Bed Luxury Duplex",
    area: "2nd Toll Gate",
    location: "2nd Toll Gate, Lekki",
    type: "Detached duplex",
    beds: 5,
    status: "For sale",
    price: "₦480M",
    priceValue: 480_000_000,
    title: "Governor’s Consent / Building Approval",
    photos: [
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/01.jpg", width: 1086, height: 1448, alt: "Listing flyer with price and details" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/02.jpg", width: 1200, height: 1600, alt: "Kitchen" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/03.jpg", width: 1200, height: 1600, alt: "Stair void with pendant lighting" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/04.jpg", width: 1200, height: 1600, alt: "Bedroom" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/05.jpg", width: 1200, height: 1600, alt: "Living area" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/06.jpg", width: 1200, height: 1600, alt: "Plunge pool" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/07.jpg", width: 1200, height: 1600, alt: "Living area" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/08.jpg", width: 1200, height: 1600, alt: "Bathroom" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/09.jpg", width: 1200, height: 1600, alt: "Hallway and staircase" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex/10.jpg", width: 1200, height: 1600, alt: "Bedroom" },
    ],
  },
  {
    slug: "2nd-toll-gate-5-bed-luxury-duplex-ii",
    ref: "BB-03",
    name: "5 Bed Luxury Duplex",
    area: "2nd Toll Gate",
    location: "2nd Toll Gate, Lekki",
    type: "Detached duplex",
    beds: 5,
    status: "For sale",
    price: "₦480M",
    priceValue: 480_000_000,
    title: "Governor’s Consent / Building Approval",
    photos: [
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/01.jpg", width: 1086, height: 1448, alt: "Listing flyer with price and details" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/02.jpg", width: 1200, height: 1600, alt: "Kitchen" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/03.jpg", width: 1200, height: 1600, alt: "Landing" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/04.jpg", width: 1200, height: 1600, alt: "Double-height living room" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/05.jpg", width: 1200, height: 1600, alt: "Living room" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/06.jpg", width: 1200, height: 1600, alt: "Bathroom" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/07.jpg", width: 1200, height: 1600, alt: "Living area" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/08.jpg", width: 1200, height: 1600, alt: "Bedroom" },
      { src: "/images/listings/2nd-toll-gate-5-bed-luxury-duplex-ii/09.jpg", width: 1200, height: 1600, alt: "Plunge pool" },
    ],
  },
  {
    slug: "2nd-toll-gate-4-bed-luxury-duplex",
    ref: "BB-04",
    name: "4 Bed Luxury Duplex",
    area: "2nd Toll Gate",
    location: "2nd Toll Gate, Lekki",
    type: "Detached duplex",
    beds: 4,
    status: "For sale",
    price: "₦260M",
    priceValue: 260_000_000,
    title: "Governor’s Consent / Building Approval",
    photos: [
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/01.jpg", width: 1086, height: 1448, alt: "Listing flyer with price and details" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/02.jpg", width: 1200, height: 1600, alt: "Living room and staircase" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/03.jpg", width: 1200, height: 1600, alt: "Bedroom" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/04.jpg", width: 1200, height: 1600, alt: "Bedroom" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/05.jpg", width: 1200, height: 1600, alt: "Kitchen" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/06.jpg", width: 1200, height: 1600, alt: "Bathroom" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/07.jpg", width: 1200, height: 1600, alt: "Living room and staircase" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/08.jpg", width: 1200, height: 1600, alt: "Walk-in wardrobe" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/09.jpg", width: 1200, height: 1600, alt: "Bathroom" },
      { src: "/images/listings/2nd-toll-gate-4-bed-luxury-duplex/10.jpg", width: 1200, height: 1600, alt: "Bedroom" },
    ],
  },
];

export const getListing = (slug: string) => listings.find((l) => l.slug === slug);
