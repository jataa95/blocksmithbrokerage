/** Every property photo, grouped by room. Generated from the client's photo set. */

export const galleryCategories = ["Exteriors", "Living", "Kitchens", "Bedrooms", "Bathrooms", "Outdoor & leisure"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryPhoto = { src: string; width: number; height: number; category: GalleryCategory; alt: string };

export const gallery: GalleryPhoto[] = [
  { src: "/images/listing-vgc-5bed.jpg", width: 1092, height: 728, category: "Exteriors", alt: "5 bed luxury duplex, VGC, Lekki" },
  { src: "/images/listing-tollgate-5bed-a.jpg", width: 1020, height: 680, category: "Exteriors", alt: "5 bed luxury duplex, 2nd Toll Gate, Lekki" },
  { src: "/images/listing-tollgate-5bed-b.jpg", width: 999, height: 666, category: "Exteriors", alt: "5 bed luxury duplex, 2nd Toll Gate, Lekki" },
  { src: "/images/listing-tollgate-4bed.jpg", width: 1063, height: 709, category: "Exteriors", alt: "4 bed luxury duplex, 2nd Toll Gate, Lekki" },
  { src: "/images/gallery/00-living.jpg", width: 1213, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/01-outdoor.jpg", width: 1200, height: 1600, category: "Outdoor & leisure", alt: "Plunge pool" },
  { src: "/images/gallery/02-living.jpg", width: 1213, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/03-bathrooms.jpg", width: 1200, height: 1600, category: "Bathrooms", alt: "Bathroom" },
  { src: "/images/gallery/04-bathrooms.jpg", width: 1200, height: 1600, category: "Bathrooms", alt: "Bathroom" },
  { src: "/images/gallery/05-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/06-living.jpg", width: 1213, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/07-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/08-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Stair void with pendant lighting" },
  { src: "/images/gallery/09-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/10-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/12-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/13-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/14-bathrooms.jpg", width: 1213, height: 1600, category: "Bathrooms", alt: "Bathroom" },
  { src: "/images/gallery/16-kitchens.jpg", width: 1200, height: 1600, category: "Kitchens", alt: "Kitchen" },
  { src: "/images/gallery/17-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/18-bedrooms.jpg", width: 1213, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/19-outdoor.jpg", width: 1200, height: 1600, category: "Outdoor & leisure", alt: "Plunge pool" },
  { src: "/images/gallery/21-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/22-kitchens.jpg", width: 1200, height: 1600, category: "Kitchens", alt: "Kitchen with marble island" },
  { src: "/images/gallery/23-outdoor.jpg", width: 1213, height: 1600, category: "Outdoor & leisure", alt: "Home gym" },
  { src: "/images/gallery/24-bedrooms.jpg", width: 1200, height: 1600, category: "Bedrooms", alt: "Bedroom" },
  { src: "/images/gallery/25-living.jpg", width: 1213, height: 1600, category: "Living", alt: "Double-height void with pendant chandelier" },
  { src: "/images/gallery/26-bathrooms.jpg", width: 1200, height: 1600, category: "Bathrooms", alt: "Bathroom" },
  { src: "/images/gallery/27-living.jpg", width: 1213, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/29-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Double-height living room and staircase" },
  { src: "/images/gallery/30-bathrooms.jpg", width: 1200, height: 1600, category: "Bathrooms", alt: "Bathroom" },
  { src: "/images/gallery/31-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/32-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/33-kitchens.jpg", width: 1200, height: 1600, category: "Kitchens", alt: "Kitchen" },
  { src: "/images/gallery/34-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/35-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/36-kitchens.jpg", width: 1213, height: 1600, category: "Kitchens", alt: "Kitchen with fluted island" },
  { src: "/images/gallery/37-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/38-living.jpg", width: 1213, height: 1600, category: "Living", alt: "Living space" },
  { src: "/images/gallery/39-living.jpg", width: 1200, height: 1600, category: "Living", alt: "Living space" },
];
