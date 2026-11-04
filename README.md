# Blocsmith Brokerage — marketing site

Luxury real-estate brokerage & advisory site for Lagos (sales, acquisitions, leasing, advisory).

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Lenis smooth scrolling.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy, listings, services, FAQs and contact details live in `src/lib/content.ts`.
Search for `TODO(client)` to find placeholders that must be confirmed before launch.

Brand colours (black, white and greys) are CSS variables at the top of `src/app/globals.css`.

Photography is the client's own (`public/images`); listing exteriors are cropped from their listing flyers.

## Hero video

To use an aerial video in the home hero, add an MP4 (1080p, 10–20s, under ~10 MB, no audio) at
`public/videos/hero-lagos.mp4` and set `heroVideo` in `src/lib/content.ts`. Until then the hero shows a photo slideshow.

## Listings

Listings and their photos live in `src/lib/listings.ts`; each listing's photos are in
`public/images/listings/<slug>/`, with the flyer as `01.jpg`.
