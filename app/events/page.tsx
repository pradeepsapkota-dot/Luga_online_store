import type { Metadata } from "next";
import EventsDirectory from "@/components/events/EventsDirectory";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events at Luga.",
};

export default function EventsPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Events</h1>
      <EventsDirectory />
    </div>
  );
}
