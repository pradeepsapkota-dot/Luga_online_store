import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { restaurants } from "@/data/restaurants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = restaurants.find((s) => s.slug === slug);
  if (!restaurant) return { title: "Restaurant not found" };
  return { title: restaurant.name, description: restaurant.description };
}

export default async function DiningDetailPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = restaurants.find((s) => s.slug === slug);
  if (!restaurant) notFound();

  const related = restaurants
    .filter(
      (r) => r.cuisine === restaurant.cuisine && r.slug !== restaurant.slug,
    )
    .slice(0, 3);

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60 mb-6">
        <Link href="/dining" className="hover:text-terracotta">
          Dining
        </Link>
        <span className="mx-2">/</span>
        <span>{restaurant.name}</span>
      </nav>

      <h1 className="font-display text-4xl mb-2">{restaurant.name}</h1>
      <p className="text-charcoal/60 mb-8">
        {restaurant.cuisine} · {restaurant.diningType} · {restaurant.floor}
      </p>

      <div className="aspect-[16/7] bg-gray-soft rounded-card mb-8 flex items-center justify-center text-charcoal/30 font-display text-3xl">
        {restaurant.name.charAt(0)}
      </div>

      <p className="text-charcoal/80 mb-8 max-w-2xl">
        {restaurant.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-medium mb-3">Hours &amp; location</h2>
          <p className="text-sm text-charcoal/70 mb-1">
            Hours: {restaurant.hours}
          </p>
          <p className="text-sm text-charcoal/70">
            Location: {restaurant.floor}
          </p>
        </div>
        <div>
          <h2 className="font-medium mb-3">Dietary information</h2>
          {restaurant.dietary.length > 0 ? (
            <ul className="text-sm text-charcoal/70 space-y-1">
              {restaurant.dietary.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-charcoal/50">
              No specific dietary options listed.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {restaurant.reservationLink && (
          <a
            href={restaurant.reservationLink}
            className="px-4 py-2 rounded-full bg-terracotta text-white text-sm font-medium"
          >
            Reserve a table
          </a>
        )}
        {restaurant.menuLink && (
          <a
            href={restaurant.menuLink}
            className="px-4 py-2 rounded-full border border-gray-soft text-sm font-medium"
          >
            View menu
          </a>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl mb-4">Related dining</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/dining/${r.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-gray-soft rounded-card overflow-hidden mb-2 flex items-center justify-center text-charcoal/30 font-display text-lg">
                  {r.name.charAt(0)}
                </div>
                <p className="text-sm font-medium group-hover:text-terracotta transition-colors">
                  {r.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
