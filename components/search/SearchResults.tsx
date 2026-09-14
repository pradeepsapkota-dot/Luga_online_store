"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { stores } from "@/data/stores";
import { restaurants } from "@/data/restaurants";
import { events } from "@/data/events";
import { offers } from "@/data/offers";

type Result = {
  type: "Store" | "Dining" | "Event" | "Offer";
  title: string;
  subtitle: string;
  href: string;
};

export default function SearchResults() {
  const [query, setQuery] = useState("");

  const results: Result[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const storeResults: Result[] = stores
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      )
      .map((s) => ({
        type: "Store",
        title: s.name,
        subtitle: `${s.category} · ${s.floor}`,
        href: `/stores/${s.slug}`,
      }));

    const diningResults: Result[] = restaurants
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q),
      )
      .map((r) => ({
        type: "Dining",
        title: r.name,
        subtitle: `${r.cuisine} · ${r.diningType}`,
        href: `/dining/${r.slug}`,
      }));

    const eventResults: Result[] = events
      .filter((e) => e.title.toLowerCase().includes(q))
      .map((e) => ({
        type: "Event",
        title: e.title,
        subtitle: new Date(e.date).toLocaleDateString(),
        href: `/events/${e.slug}`,
      }));

    const offerResults: Result[] = offers
      .filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.storeName.toLowerCase().includes(q),
      )
      .map((o) => ({
        type: "Offer",
        title: o.title,
        subtitle: o.storeName,
        href: `/offers/${o.slug}`,
      }));

    return [
      ...storeResults,
      ...diningResults,
      ...eventResults,
      ...offerResults,
    ];
  }, [query]);

  return (
    <div>
      <div className="mb-2">
        <label htmlFor="site-search" className="sr-only">
          Search Luga
        </label>
        <input
          id="site-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stores, dining, events, and offers"
          className="w-full px-4 py-3 rounded-md border border-gray-soft bg-white text-base"
          autoFocus
        />
      </div>

      {query && (
        <button
          onClick={() => setQuery("")}
          className="text-sm text-terracotta font-medium hover:underline mb-6"
        >
          Clear search
        </button>
      )}

      {query.trim() === "" ? (
        <p className="text-charcoal/60 text-sm">
          Start typing to search across Luga.
        </p>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-xl mb-2">No results for "{query}"</p>
          <p className="text-charcoal/60">Try a different search term.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-charcoal/60 mb-6">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <div className="divide-y divide-gray-soft border-t border-b border-gray-soft">
            {results.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="flex items-center justify-between py-4 hover:bg-gray-soft/50 transition-colors px-2 -mx-2 rounded"
              >
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-charcoal/60">{r.subtitle}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-soft text-charcoal/60 whitespace-nowrap">
                  {r.type}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
