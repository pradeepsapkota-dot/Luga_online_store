import type { Metadata } from "next";
import SearchResults from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search stores, dining, events, and offers at Luga.",
};

export default function SearchPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Search</h1>
      <SearchResults />
    </div>
  );
}
