import Link from "next/link";
import Image from "next/image";
import { mallInfo, getTodayHours } from "@/data/mall";
import { stores } from "@/data/stores";
import { events } from "@/data/events";
import { offers, isOfferActive } from "@/data/offers";
import { restaurants } from "@/data/restaurants";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function HomePage() {
  const today = getTodayHours();
  const featuredStores = stores.slice(0, 4);
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  const activeOffers = offers.filter(isOfferActive).slice(0, 3);
  const featuredDining = restaurants.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[480px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=1600"
            alt="People walking through Luga's open central atrium"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
          <h1 className="font-display text-4xl md:text-6xl text-white max-w-2xl leading-tight">
            Shop, eat, and spend time together at Luga.
          </h1>
          <p className="text-white/85 mt-4 max-w-lg text-lg">
            Over 60 stores, restaurants, and services under one roof — with
            events and offers happening every week.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/stores"
              className="bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-[#c14f2e] transition-colors"
            >
              Explore Luga
            </Link>
            <Link
              href="/visit"
              className="bg-white text-charcoal px-6 py-3 rounded-full font-medium hover:bg-ivory transition-colors"
            >
              Plan Your Visit
            </Link>
          </div>
          <p className="text-white/70 text-sm mt-4">
            Open today {today.open}–{today.close}
          </p>
        </div>
      </section>

      {/* QUICK VISIT INFO */}
      <section className="px-6 md:px-12 py-10 bg-gray-soft">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="font-medium text-charcoal/60 mb-1">Today's hours</p>
            <p>
              {today.open}–{today.close}
            </p>
          </div>
          <div>
            <p className="font-medium text-charcoal/60 mb-1">Address</p>
            <p>
              {mallInfo.address.street}, {mallInfo.address.city}
            </p>
          </div>
          <div>
            <p className="font-medium text-charcoal/60 mb-1">Parking</p>
            <p>{mallInfo.parking.summary}</p>
          </div>
          <div>
            <p className="font-medium text-charcoal/60 mb-1">Getting here</p>
            <Link
              href="/visit#directions"
              className="text-terracotta hover:underline"
            >
              View directions
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED STORES */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl">Featured stores</h2>
          <Link
            href="/stores"
            className="text-sm font-medium text-terracotta hover:underline"
          >
            View all stores
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredStores.map((store) => (
            <Link
              key={store.slug}
              href={`/stores/${store.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-gray-soft rounded-card overflow-hidden mb-3">
                <div className="w-full h-full flex items-center justify-center text-charcoal/30 font-display text-xl">
                  {store.name.charAt(0)}
                </div>
              </div>
              <p className="font-medium group-hover:text-terracotta transition-colors">
                {store.name}
              </p>
              <p className="text-sm text-charcoal/60">
                {store.category} · {store.floor}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
      <section className="px-6 md:px-12 py-16 bg-charcoal text-ivory">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl mb-8">What's happening</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className={`block border border-ivory/15 rounded-card p-6 hover:border-terracotta transition-colors ${
                  i === 0 ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                <p className="text-terracotta text-sm font-medium mb-2">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="font-display text-xl mb-2">{event.title}</p>
                <p className="text-ivory/70 text-sm mb-2">{event.location}</p>
                <p className="text-ivory/60 text-sm">{event.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl">Current offers</h2>
          <Link
            href="/offers"
            className="text-sm font-medium text-terracotta hover:underline"
          >
            View all offers
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/offers/${offer.slug}`}
              className="block border border-gray-soft rounded-card p-6 hover:border-terracotta transition-colors"
            >
              <p className="text-sm text-charcoal/60 mb-1">{offer.storeName}</p>
              <p className="font-medium mb-2">{offer.title}</p>
              <p className="text-xs text-charcoal/50">
                Until {new Date(offer.endDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* DINING */}
      <section className="px-6 md:px-12 py-16 bg-gray-soft">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl">Dining at Luga</h2>
            <Link
              href="/dining"
              className="text-sm font-medium text-terracotta hover:underline"
            >
              View all dining
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredDining.map((r) => (
              <Link
                key={r.slug}
                href={`/dining/${r.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-white rounded-card overflow-hidden mb-3 flex items-center justify-center text-charcoal/30 font-display text-xl">
                  {r.name.charAt(0)}
                </div>
                <p className="font-medium group-hover:text-terracotta transition-colors">
                  {r.name}
                </p>
                <p className="text-sm text-charcoal/60">
                  {r.cuisine} · {r.diningType}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE LUGA */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-8">Experience Luga</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-card overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
              alt="Family relaxing in a mall seating area"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-charcoal/80 mb-4">
              Beyond shopping, Luga hosts family activities, seasonal
              installations, and community events throughout the year. Drop into
              a weekend workshop, catch a live performance on the Level 3
              terrace, or just find a quiet spot to sit.
            </p>
            <Link
              href="/events"
              className="text-terracotta font-medium hover:underline"
            >
              See what's on
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 md:px-12 py-16 bg-gray-soft">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-display text-2xl mb-3">Stay in the loop</h2>
          <p className="text-charcoal/70 mb-6 text-sm">
            Get notified about new offers, upcoming events, and store openings
            at Luga.
          </p>
          <NewsletterForm variant="section" />
        </div>
      </section>
    </>
  );
}
