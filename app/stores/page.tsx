import type { Metadata } from "next";
import StoresDirectory from "@/components/stores/StoresDirectory";

export const metadata: Metadata = {
  title: "Stores",
  description: "Browse all stores at Luga by category, floor, or name.",
};

export default function StoresPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Stores</h1>
      <StoresDirectory />
    </div>
  );
}
