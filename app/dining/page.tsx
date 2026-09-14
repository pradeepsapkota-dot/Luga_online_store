import type { Metadata } from "next";
import DiningDirectory from "@/components/dining/DiningDirectory";

export const metadata: Metadata = {
  title: "Dining",
  description: "Browse restaurants, cafés, and quick bites at Luga.",
};

export default function DiningPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Dining</h1>
      <DiningDirectory />
    </div>
  );
}
