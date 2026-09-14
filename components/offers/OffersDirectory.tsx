"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { offers, isOfferActive } from "@/data/offers";

export default function OffersDirectory() {
  const [query, setQuery] = useState("");
  const [showExpired, setShowExpired] = useState(false);

  const filtered = useMemo(() => {
    return offers
      .filter(
        (o) =>
          o.storeName.toLowerCase().includes(query.toLowerCase()) ||
          o.title.toLowerCase().includes(query.toLowerCase()),
      )
      .filter((o) => (showExpired ? true : isOfferActive(o)))
      .sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      );
  }, [query, showExpired]);

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="offer-search" className="sr-only">
          Search offers
        </label>
        <input
          id="offer-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search offers by store or title"
          className="w-full md:w-96 px-4 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm mb-6">
        <input
          type="checkbox"
          checked={showExpired}
          onChange={(e) => setShowExpired(e.target.checked)}
          className="w-4 h-4"
        />
        Show expired offers
      </label>

      <p className="text-sm text-charcoal/60 mb-6">
        {filtered.length} {filtered.length === 1 ? "offer" : "offers"}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-xl mb-2">
            No offers match your search
          </p>
          <p className="text-charcoal/60 mb-4">
            Try a different search term, or check "Show expired offers."
          </p>
          <button
            onClick={() => {
              setQuery("");
              setShowExpired(false);
            }}
            className="text-terracotta font-medium hover:underline"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((offer) => {
            const active = isOfferActive(offer);
            return (
              <Link
                key={offer.slug}
                href={`/offers/${offer.slug}`}
                className={`block border rounded-card p-6 transition-colors ${active ? "border-gray-soft hover:border-terracotta" : "border-gray-soft opacity-60"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm text-charcoal/60">{offer.storeName}</p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${active ? "bg-[#e7f3e8] text-[#2f6b34]" : "bg-gray-soft text-charcoal/60"}`}
                  >
                    {active ? "Active" : "Expired"}
                  </span>
                </div>
                <p className="font-medium mb-2">{offer.title}</p>
                <p className="text-xs text-charcoal/50">
                  {active
                    ? `Until ${new Date(offer.endDate).toLocaleDateString()}`
                    : `Ended ${new Date(offer.endDate).toLocaleDateString()}`}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
