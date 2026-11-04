import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter_Tight } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { Intro } from "@/components/Intro";
import { Menu } from "@/components/Menu";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Blocsmith Brokerage — Luxury Real Estate in Lagos",
  description:
    "Luxury sales, acquisitions, leasing and advisory across Ikoyi, Lekki, Victoria Island and Banana Island.",
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

// Skips the brand intro before first paint on repeat visits / reduced motion.
const introScript = `try{if(sessionStorage.getItem('bs:intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-intro')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Intro />
        <Menu />
        {children}
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}
