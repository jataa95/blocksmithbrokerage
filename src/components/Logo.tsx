import Image from "next/image";
import { brand } from "@/lib/content";

/** Brand logo. `tone` picks the version that reads on the background behind it. */
export function Logo({ tone = "light", className = "h-10" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Image
      src={tone === "light" ? "/logo-white.png" : "/logo-ink.png"}
      alt={brand.legalName}
      width={668}
      height={268}
      className={`w-auto ${className}`}
    />
  );
}
