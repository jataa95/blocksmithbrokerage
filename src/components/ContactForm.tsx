"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/lib/content";
import { listings } from "@/lib/listings";
import { ArrowUpRight } from "./Reveal";

const field =
  "w-full border-b border-line bg-transparent py-3 text-[16px] outline-none transition-colors placeholder:text-ink/35 focus:border-ink";

/**
 * Enquiry form. Until a form backend is connected it opens the visitor's
 * email app with the enquiry filled in. TODO(client): connect a form service.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `Enquiry: ${d.get("interest")}${d.get("listing") ? ` — ${d.get("listing")}` : ""}`;
    const body = [
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      `Phone: ${d.get("phone") || "—"}`,
      `Interested in: ${d.get("interest")}`,
      d.get("listing") ? `Listing: ${d.get("listing")}` : "",
      "",
      String(d.get("message") || ""),
    ]
      .filter((l) => l !== "")
      .join("\n");
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <label className="block">
        <span className="t-label text-ink/60">Name</span>
        <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
      </label>
      <label className="block">
        <span className="t-label text-ink/60">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </label>
      <label className="block">
        <span className="t-label text-ink/60">Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+234" />
      </label>
      <label className="block">
        <span className="t-label text-ink/60">I’m interested in</span>
        <select name="interest" className={field} defaultValue="Buying a home">
          <option>Buying a home</option>
          <option>Selling a property</option>
          <option>Leasing</option>
          <option>Investment advisory</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="t-label text-ink/60">A specific listing (optional)</span>
        <select name="listing" className={field} defaultValue="">
          <option value="">None in particular</option>
          {listings.map((l) => (
            <option key={l.slug} value={`${l.name}, ${l.location} (${l.ref}, ${l.price})`}>
              {l.ref} · {l.name}, {l.location} — {l.price}
            </option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="t-label text-ink/60">Message</span>
        <textarea name="message" rows={4} className={`${field} resize-none`} placeholder="Tell us what you’re looking for" />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="capsule h-12 border-ink bg-ink px-6 text-[13px] text-white hover:bg-white hover:text-ink">
          Send enquiry <ArrowUpRight className="size-4" />
        </button>
        <p className="text-[13px] text-ink/60" aria-live="polite">
          {sent ? "Your email app should now be open with your enquiry ready to send." : "We usually reply within one working day."}
        </p>
      </div>
    </form>
  );
}
