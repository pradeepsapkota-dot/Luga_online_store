"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { events } from "@/data/events";

export default function EventsDirectory() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) =>
        tab === "upcoming" ? new Date(e.date) >= now : new Date(e.date) < now,
      )
      .filter((e) => e.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return tab === "upcoming" ? diff : -diff;
      });
  }, [tab, query]);

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b border-gray-soft">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === "upcoming" ? "border-terracotta text-terracotta" : "border-transparent text-charcoal/60"}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setTab("past")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === "past" ? "border-terracotta text-terracotta" : "border-transparent text-charcoal/60"}`}
        >
          Past
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="event-search" className="sr-only">
          Search events
        </label>
        <input
          id="event-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events by name"
          className="w-full md:w-96 px-4 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
      </div>

      <p className="text-sm text-charcoal/60 mb-6">
        {filtered.length} {filtered.length === 1 ? "event" : "events"}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-xl mb-2">No {tab} events found</p>
          <p className="text-charcoal/60">
            Try a different search term or check the other tab.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="block border border-gray-soft rounded-card p-6 hover:border-terracotta transition-colors"
            >
              <p className="text-terracotta text-sm font-medium mb-2">
                {new Date(event.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="font-display text-xl mb-2">{event.title}</p>
              <p className="text-sm text-charcoal/60 mb-2">{event.location}</p>
              <p className="text-sm text-charcoal/50 mb-3">{event.summary}</p>
              {event.registrationRequired && (
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${event.registrationOpen ? "bg-[#e7f3e8] text-[#2f6b34]" : "bg-gray-soft text-charcoal/60"}`}
                >
                  {event.registrationOpen
                    ? "Registration open"
                    : "Registration closed"}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
