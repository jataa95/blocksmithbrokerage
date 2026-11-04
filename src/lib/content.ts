/**
 * All site copy lives here so the client can edit it in one place.
 * Items marked TODO(client) are placeholders that must be confirmed
 * before launch (contact details, prices, FAQ answers).
 */

export const brand = {
  name: "Blocsmith",
  legalName: "Blocsmith Brokerage",
  tagline: "Luxury real estate · Lagos",
  // TODO(client): confirm contact details.
  email: "hello@blocsmithbrokerage.com",
  phone: "+234 (0) 800 000 0000",
  address: "Victoria Island, Lagos, Nigeria",
  instagram: "https://instagram.com/",
};

export const nav = [
  { label: "Home", href: "/", image: "/images/interior-lounge.jpg" },
  { label: "Listings", href: "/listings", image: "/images/listing-vgc-5bed.jpg" },
  { label: "Services", href: "/services", image: "/images/interior-kitchen.jpg" },
  { label: "About", href: "/about", image: "/images/interior-chandelier.jpg" },
  { label: "FAQs", href: "/faqs", image: "/images/interior-bath.jpg" },
  { label: "Contact", href: "/contact", image: "/images/interior-pool.jpg" },
];

export const heroSlides = [
  "/images/hero-living.jpg",
  "/images/hero-lounge.jpg",
  "/images/hero-kitchen.jpg",
];

export const stats = [
  { value: 100, suffix: "+", label: "Properties sold" },
  { value: 80, suffix: "+", label: "Clients served" },
  { value: 50, suffix: "+", label: "Five-star reviews" },
];

export type Listing = {
  name: string;
  area: string;
  beds: number;
  status: string;
  price: string;
  title: string;
  image: string;
};

// From the client's listing flyers. TODO(client): confirm these are still available.
export const listings: Listing[] = [
  {
    name: "5 Bed Luxury Duplex",
    area: "VGC, Lekki",
    beds: 5,
    status: "For sale",
    price: "₦550M",
    title: "Governor’s Consent / Building Approval",
    image: "/images/listing-vgc-5bed.jpg",
  },
  {
    name: "5 Bed Luxury Duplex",
    area: "2nd Toll Gate, Lekki",
    beds: 5,
    status: "For sale",
    price: "₦480M",
    title: "Governor’s Consent / Building Approval",
    image: "/images/listing-tollgate-5bed-a.jpg",
  },
  {
    name: "5 Bed Luxury Duplex",
    area: "2nd Toll Gate, Lekki",
    beds: 5,
    status: "For sale",
    price: "₦480M",
    title: "Governor’s Consent / Building Approval",
    image: "/images/listing-tollgate-5bed-b.jpg",
  },
  {
    name: "4 Bed Luxury Duplex",
    area: "2nd Toll Gate, Lekki",
    beds: 4,
    status: "For sale",
    price: "₦260M",
    title: "Governor’s Consent / Building Approval",
    image: "/images/listing-tollgate-4bed.jpg",
  },
];

export const services = [
  {
    title: "Luxury Sales",
    meta: "Residential · Prime",
    summary:
      "Representing exceptional homes to qualified buyers, with discreet marketing and expert negotiation.",
    detail: "Private & off-market · Full representation",
    scope: [
      "Valuation & pricing strategy",
      "Off-market & private listings",
      "Architectural photography & film",
      "Negotiation through to completion",
    ],
    image: "/images/interior-double-height.jpg",
  },
  {
    title: "Acquisitions",
    meta: "Residential · Commercial",
    summary:
      "Sourcing and securing the right asset on your behalf — from family homes to income-generating buildings.",
    detail: "Buyer-side mandate · Verified titles",
    scope: [
      "Brief & search strategy",
      "Due diligence & title verification",
      "Access to off-market stock",
      "Transaction management",
    ],
    image: "/images/listing-tollgate-5bed-b.jpg",
  },
  {
    title: "Leasing",
    meta: "Long-let · Short-let · Commercial",
    summary:
      "Matching verified tenants with exceptional residences and workspaces across Lagos.",
    detail: "Landlord & tenant representation",
    scope: [
      "Tenant & landlord vetting",
      "Lease negotiation",
      "Short-let & corporate lets",
      "Renewals & property management",
    ],
    image: "/images/interior-living.jpg",
  },
  {
    title: "Advisory",
    meta: "Investment · Development",
    summary:
      "Independent counsel on investment, estate development and long-term portfolio strategy.",
    detail: "Market intelligence · Feasibility",
    scope: [
      "Market & feasibility studies",
      "Land banking & investment",
      "Estate development advisory",
      "Portfolio review",
    ],
    image: "/images/interior-kitchen-dark.jpg",
  },
];

export const testimonials = [
  {
    quote:
      "Blocsmith made the entire process of finding a new apartment in Lekki so easy. The team was professional, responsive, and truly cared about finding a place that suited my lifestyle and budget.",
    name: "Chinedu A.",
    role: "Businessman, Lagos",
  },
];

// TODO(client): confirm every answer with the client before launch.
export const faqs = [
  {
    q: "Can I resell after purchase?",
    a: "Yes. Once your purchase completes and title is transferred, the property is yours to sell. Our sales team can advise on timing and value when you are ready.",
  },
  {
    q: "What payment plans are available?",
    a: "Payment structures vary by property and developer. Many off-plan and new-build homes offer staged plans; we will outline every option available for the properties on your shortlist.",
  },
  {
    q: "How do I make payment?",
    a: "Payments are made by bank transfer to verified accounts only, confirmed in writing at each stage of the transaction. We never request payment to personal accounts.",
  },
  {
    q: "Do you offer mortgage support?",
    a: "We work alongside trusted lenders and can introduce you to mortgage partners, then coordinate with them throughout your purchase.",
  },
];
