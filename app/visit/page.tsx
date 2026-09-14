import type { Metadata } from "next";
import { mallInfo, getTodayHours } from "@/data/mall";

export const metadata: Metadata = {
  title: "Visit Luga",
  description:
    "Hours, directions, parking, and accessibility information for Luga.",
};

export default function VisitPage() {
  const today = getTodayHours();

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl mb-2">Visit Luga</h1>
      <p className="text-charcoal/70 mb-12">
        Everything you need to plan your trip.
      </p>

      {/* Hours */}
      <section id="hours" className="mb-12 scroll-mt-24">
        <h2 className="font-display text-2xl mb-4">Opening hours</h2>
        <p className="text-terracotta font-medium mb-4">
          Today: {today.open}–{today.close}
        </p>
        <div className="border border-gray-soft rounded-card divide-y divide-gray-soft">
          {mallInfo.hours.weekly.map((day) => (
            <div
              key={day.day}
              className="flex justify-between px-4 py-2.5 text-sm"
            >
              <span className="text-charcoal/70">{day.day}</span>
              <span>
                {day.open}–{day.close}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Address & map */}
      <section id="directions" className="mb-12 scroll-mt-24">
        <h2 className="font-display text-2xl mb-4">Address &amp; directions</h2>
        <p className="text-sm text-charcoal/70 mb-4">
          {mallInfo.address.street}, {mallInfo.address.city}{" "}
          {mallInfo.address.postalCode}, {mallInfo.address.country}
        </p>
        <div className="aspect-[16/7] bg-gray-soft rounded-card flex items-center justify-center text-charcoal/40 text-sm mb-4">
          Map placeholder — integration point for Google Maps or Mapbox
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-1">By car</h3>
            <p className="text-charcoal/70">{mallInfo.parking.summary}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">By public transport</h3>
            <p className="text-charcoal/70 mb-1">{mallInfo.transport.bus}</p>
            <p className="text-charcoal/70">{mallInfo.transport.train}</p>
          </div>
        </div>
      </section>

      {/* Parking */}
      <section id="parking" className="mb-12 scroll-mt-24">
        <h2 className="font-display text-2xl mb-4">Parking</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-1">General parking</h3>
            <p className="text-charcoal/70">{mallInfo.parking.summary}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Accessible parking</h3>
            <p className="text-charcoal/70">
              {mallInfo.parking.accessibleSpaces}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Bicycle access</h3>
            <p className="text-charcoal/70">{mallInfo.bicycle}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Taxi &amp; drop-off</h3>
            <p className="text-charcoal/70">{mallInfo.dropOff}</p>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="mb-12 scroll-mt-24">
        <h2 className="font-display text-2xl mb-4">Accessibility</h2>
        <p className="text-sm text-charcoal/70 mb-6">
          {mallInfo.accessibility.services}
        </p>
        <h3 className="font-medium mb-1 text-sm">Family services</h3>
        <p className="text-sm text-charcoal/70">{mallInfo.familyServices}</p>
      </section>

      {/* Services */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4">Services</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-1">Customer service desk</h3>
            <p className="text-charcoal/70 mb-1">
              {mallInfo.customerService.location}
            </p>
            <p className="text-charcoal/70">{mallInfo.customerService.hours}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Wi-Fi</h3>
            <p className="text-charcoal/70">{mallInfo.wifi}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Lost &amp; found</h3>
            <p className="text-charcoal/70">{mallInfo.lostAndFound}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Contact</h3>
            <p className="text-charcoal/70 mb-1">{mallInfo.contact.phone}</p>
            <p className="text-charcoal/70">{mallInfo.contact.email}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
