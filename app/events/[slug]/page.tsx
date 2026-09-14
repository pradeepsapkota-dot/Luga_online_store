import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { events } from "@/data/events";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.summary };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const isPast = new Date(event.date) < new Date();

  const related = events
    .filter((e) => e.slug !== event.slug && new Date(e.date) >= new Date())
    .slice(0, 3);

  // Build a calendar link (Google Calendar format) as a working integration, not a fake button.
  const startDate = event.date.replace(/-/g, "");
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${startDate}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.summary)}`;

  return (
    <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60 mb-6">
        <Link href="/events" className="hover:text-terracotta">
          Events
        </Link>
        <span className="mx-2">/</span>
        <span>{event.title}</span>
      </nav>

      {isPast && (
        <p className="text-xs font-medium px-2 py-1 rounded-full bg-gray-soft text-charcoal/60 inline-block mb-4">
          Past event
        </p>
      )}

      <h1 className="font-display text-4xl mb-2">{event.title}</h1>
      <p className="text-charcoal/60 mb-1">
        {new Date(event.date).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        · {event.time}
      </p>
      <p className="text-charcoal/60 mb-1">{event.location}</p>
      <p className="text-charcoal/60 mb-8">Audience: {event.audience}</p>

      <div className="aspect-[16/7] bg-gray-soft rounded-card mb-8 flex items-center justify-center text-charcoal/30 font-display text-3xl">
        {event.title.charAt(0)}
      </div>

      <p className="text-charcoal/80 mb-8 max-w-2xl">{event.summary}</p>

      {!isPast && (
        <div className="flex flex-wrap gap-3 mb-12">
          {event.registrationRequired &&
            (event.registrationOpen ? (
              <button className="px-4 py-2 rounded-full bg-terracotta text-white text-sm font-medium">
                Register (demo — no backend connected)
              </button>
            ) : (
              <span className="px-4 py-2 rounded-full bg-gray-soft text-charcoal/60 text-sm font-medium">
                Registration closed
              </span>
            ))}
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-gray-soft text-sm font-medium"
          >
            Add to calendar
          </a>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl mb-4">Other upcoming events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((e) => (
              <Link
                key={e.slug}
                href={`/events/${e.slug}`}
                className="block border border-gray-soft rounded-card p-4 hover:border-terracotta transition-colors"
              >
                <p className="text-terracotta text-xs font-medium mb-1">
                  {new Date(e.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="font-medium text-sm">{e.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
