"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { stores, storeCategories, isOpenNow } from "@/data/stores";

const floors = ["Ground Floor", "Level 1", "Level 2", "Level 3"];

export default function StoresDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [floor, setFloor] = useState<string | null>(null);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return stores
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      .filter((s) => (category ? s.category === category : true))
      .filter((s) => (floor ? s.floor === floor : true))
      .filter((s) => (openNowOnly ? isOpenNow(s.hours) : true))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, category, floor, openNowOnly]);

  const hasActiveFilters = query || category || floor || openNowOnly;

  function resetFilters() {
    setQuery("");
    setCategory(null);
    setFloor(null);
    setOpenNowOnly(false);
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <label htmlFor="store-search" className="sr-only">
          Search stores by name
        </label>
        <input
          id="store-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stores by name"
          className="w-full md:w-96 px-4 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
      </div>

      {/* Mobile filter toggle */}
      <button
        className="md:hidden mb-4 px-4 py-2 rounded-md border border-gray-soft text-sm font-medium min-h-[44px]"
        onClick={() => setMobileFiltersOpen(true)}
        aria-haspopup="dialog"
      >
        Filters {hasActiveFilters ? "(active)" : ""}
      </button>

      {/* Desktop filters */}
      <div className="hidden md:flex flex-wrap items-center gap-3 mb-6">
        <FilterSelect
          label="Category"
          value={category}
          options={storeCategories}
          onChange={setCategory}
        />
        <FilterSelect
          label="Floor"
          value={floor}
          options={floors}
          onChange={setFloor}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={openNowOnly}
            onChange={(e) => setOpenNowOnly(e.target.checked)}
            className="w-4 h-4"
          />
          Open now
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

      {/* Mobile filter drawer */}
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
                label="Category"
                value={category}
                options={storeCategories}
                onChange={setCategory}
                fullWidth
              />
              <FilterSelect
                label="Floor"
                value={floor}
                options={floors}
                onChange={setFloor}
                fullWidth
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={openNowOnly}
                  onChange={(e) => setOpenNowOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                Open now
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

      {/* Result count */}
      <p className="text-sm text-charcoal/60 mb-6">
        {filtered.length} {filtered.length === 1 ? "store" : "stores"}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-xl mb-2">
            No stores match your filters
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
          {filtered.map((store) => {
            const open = isOpenNow(store.hours);
            return (
              <Link
                key={store.slug}
                href={`/stores/${store.slug}`}
                className="group block border border-gray-soft rounded-card p-4 hover:border-terracotta transition-colors"
              >
                <div className="aspect-[4/3] bg-gray-soft rounded-md overflow-hidden mb-3 flex items-center justify-center text-charcoal/30 font-display text-xl">
                  {store.name.charAt(0)}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium group-hover:text-terracotta transition-colors">
                      {store.name}
                    </p>
                    <p className="text-sm text-charcoal/60">
                      {store.category} · {store.floor}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                      open
                        ? "bg-[#e7f3e8] text-[#2f6b34]"
                        : "bg-gray-soft text-charcoal/60"
                    }`}
                  >
                    {open ? "Open now" : "Closed"}
                  </span>
                </div>
              </Link>
            );
          })}
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
