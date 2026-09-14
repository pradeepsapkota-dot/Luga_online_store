import type { Metadata } from "next";
import OffersDirectory from "@/components/offers/OffersDirectory";

export const metadata: Metadata = {
  title: "Offers",
  description: "Current and upcoming offers from stores at Luga.",
};

export default function OffersPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Offers</h1>
      <OffersDirectory />
    </div>
  );
}
