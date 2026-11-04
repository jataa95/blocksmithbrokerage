"use client";

import { useMemo, useState } from "react";
import { listings } from "@/lib/listings";
import { ListingCard } from "./Listings";

const areas = ["All areas", ...Array.from(new Set(listings.map((l) => l.area)))];
const bedOptions = ["Any", ...Array.from(new Set(listings.map((l) => l.beds))).sort().map(String)];
const maxPrices = [
  { label: "Any price", value: Infinity },
  { label: "Up to ₦300M", value: 300_000_000 },
  { label: "Up to ₦500M", value: 500_000_000 },
  { label: "Up to ₦600M", value: 600_000_000 },
];
const sorts = ["Featured", "Price: low to high", "Price: high to low"] as const;

const control =
  "h-11 w-full appearance-none rounded-full border border-line bg-white px-4 text-[14px] outline-none transition-colors hover:border-ink focus:border-ink";

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block">
      <span className="t-label mb-2 block text-ink/50">{label}</span>
      <span className="relative block">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${control} pr-10`}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px]">
          ▼
        </span>
      </span>
    </label>
  );
}

/** Search box, filters and sort over the listings, with live results. */
export function ListingsBrowser() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState(areas[0]);
  const [beds, setBeds] = useState("Any");
  const [max, setMax] = useState(String(Infinity));
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = listings.filter(
      (l) =>
        (!q || [l.name, l.location, l.ref, l.type, `${l.beds} bed`].some((f) => f.toLowerCase().includes(q))) &&
        (area === areas[0] || l.area === area) &&
        (beds === "Any" || l.beds === Number(beds)) &&
        l.priceValue <= Number(max),
    );
    if (sort === "Price: low to high") out.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "Price: high to low") out.sort((a, b) => b.priceValue - a.priceValue);
    return out;
  }, [query, area, beds, max, sort]);

  const filtered = query !== "" || area !== areas[0] || beds !== "Any" || max !== String(Infinity);
  const reset = () => {
    setQuery("");
    setArea(areas[0]);
    setBeds("Any");
    setMax(String(Infinity));
    setSort("Featured");
  };

  return (
    <>
      <div role="search" className="grid gap-4 rounded-[6px] bg-ivory p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <label className="block md:col-span-2 xl:col-span-1">
          <span className="t-label mb-2 block text-ink/50">Search</span>
          <span className="relative block">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 fill-none stroke-current stroke-[1.6]">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Area, bedrooms or reference"
              className={`${control} pl-11`}
            />
          </span>
        </label>
        <Select label="Area" value={area} onChange={setArea} options={areas.map((a) => ({ label: a, value: a }))} />
        <Select
          label="Bedrooms"
          value={beds}
          onChange={setBeds}
          options={bedOptions.map((b) => ({ label: b === "Any" ? "Any" : `${b} bedrooms`, value: b }))}
        />
        <Select
          label="Budget"
          value={max}
          onChange={setMax}
          options={maxPrices.map((p) => ({ label: p.label, value: String(p.value) }))}
        />
        <Select
          label="Sort by"
          value={sort}
          onChange={(v) => setSort(v as (typeof sorts)[number])}
          options={sorts.map((s) => ({ label: s, value: s }))}
        />
      </div>

      <div className="mb-8 mt-6 flex items-center justify-between gap-4 text-[13px] text-ink/60" aria-live="polite">
        <span>
          Showing <span className="font-semibold text-ink">{results.length}</span> of {listings.length} homes
        </span>
        {filtered && (
          <button type="button" onClick={reset} className="underline underline-offset-4 hover:text-ink">
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-x-2 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {results.map((l, i) => (
            <li key={l.slug}>
              <ListingCard listing={l} dark={false} index={i} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid place-items-center gap-4 border-y border-line py-20 text-center">
          <p className="t-row">No homes match those filters.</p>
          <button type="button" onClick={reset} className="capsule text-ink hover:bg-ink hover:text-white">
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
