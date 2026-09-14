"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";

const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine))).sort();
const diningTypes = ["Sit-down", "Quick bite", "Café"];

export default function DiningDirectory() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState<string | null>(null);
  const [diningType, setDiningType] = useState<string | null>(null);
  const [familyOnly, setFamilyOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return restaurants
      .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
      .filter((r) => (cuisine ? r.cuisine === cuisine : true))
      .filter((r) => (diningType ? r.diningType === diningType : true))
      .filter((r) => (familyOnly ? r.familyFriendly : true))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, cuisine, diningType, familyOnly]);

  const hasActiveFilters = query || cuisine || diningType || familyOnly;

  function resetFilters() {
    setQuery("");
    setCuisine(null);
    setDiningType(null);
    setFamilyOnly(false);
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="dining-search" className="sr-only">
          Search dining by name
        </label>
        <input
          id="dining-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants by name"
          className="w-full md:w-96 px-4 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
      </div>

      <button
        className="md:hidden mb-4 px-4 py-2 rounded-md border border-gray-soft text-sm font-medium min-h-[44px]"
        onClick={() => setMobileFiltersOpen(true)}
        aria-haspopup="dialog"
      >
        Filters {hasActiveFilters ? "(active)" : ""}
      </button>

      <div className="hidden md:flex flex-wrap items-center gap-3 mb-6">
        <FilterSelect
          label="Cuisine"
          value={cuisine}
          options={cuisines}
          onChange={setCuisine}
        />
        <FilterSelect
          label="Dining type"
          value={diningType}
          options={diningTypes}
          onChange={setDiningType}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={familyOnly}
            onChange={(e) => setFamilyOnly(e.target.checked)}
            className="w-4 h-4"
          />
          Family-friendly
        </label>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-terracotta font-medium hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute bottom-0 left-0 right-0 bg-ivory rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="font-display text-xl">Filters</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-2"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <FilterSelect
                label="Cuisine"
                value={cuisine}
                options={cuisines}
                onChange={setCuisine}
                fullWidth
              />
              <FilterSelect
                label="Dining type"
                value={diningType}
                options={diningTypes}
                onChange={setDiningType}
                fullWidth
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={familyOnly}
                  onChange={(e) => setFamilyOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                Family-friendly
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex-1 px-4 py-3 rounded-md border border-gray-soft text-sm font-medium"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 px-4 py-3 rounded-md bg-terracotta text-white text-sm font-medium"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-charcoal/60 mb-6">
        {filtered.length} {filtered.length === 1 ? "place" : "places"}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-xl mb-2">
            No dining options match your filters
          </p>
          <p className="text-charcoal/60 mb-4">
            Try a different search term or clear your filters.
          </p>
          <button
            onClick={resetFilters}
            className="text-terracotta font-medium hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <Link
              key={r.slug}
              href={`/dining/${r.slug}`}
              className="group block border border-gray-soft rounded-card p-4 hover:border-terracotta transition-colors"
            >
              <div className="aspect-[4/3] bg-gray-soft rounded-md overflow-hidden mb-3 flex items-center justify-center text-charcoal/30 font-display text-xl">
                {r.name.charAt(0)}
              </div>
              <p className="font-medium group-hover:text-terracotta transition-colors">
                {r.name}
              </p>
              <p className="text-sm text-charcoal/60">
                {r.cuisine} · {r.diningType}
              </p>
              {r.familyFriendly && (
                <p className="text-xs text-charcoal/50 mt-1">Family-friendly</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  fullWidth,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string | null) => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <label className="sr-only">{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className={`px-3 py-2.5 rounded-md border border-gray-soft bg-white text-sm ${fullWidth ? "w-full" : ""}`}
      >
        <option value="">{label}: All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
