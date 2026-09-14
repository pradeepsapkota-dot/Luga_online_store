import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { stores, isOpenNow } from "@/data/stores";
import { offers, isOfferActive } from "@/data/offers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stores.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = stores.find((s) => s.slug === slug);
  if (!store) return { title: "Store not found" };
  return {
    title: store.name,
    description: store.description,
  };
}

export default function StoreDetailPage({ params }: Props) {
  const store = stores.find(async (s) => s.slug === (await params).slug);

  if (!store) {
    notFound();
  }

  const storeOffers = offers.filter(
    (o) => o.storeSlug === store.slug && isOfferActive(o),
  );

  const relatedStores = stores
    .filter((s) => s.category === store.category && s.slug !== store.slug)
    .slice(0, 3);

  const open = isOpenNow(store.hours);

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60 mb-6">
        <Link href="/stores" className="hover:text-terracotta">
          Stores
        </Link>
        <span className="mx-2">/</span>
        <span>{store.name}</span>
      </nav>

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-4xl">{store.name}</h1>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap mt-2 ${
            open
              ? "bg-[#e7f3e8] text-[#2f6b34]"
              : "bg-gray-soft text-charcoal/60"
          }`}
        >
          {open ? "Open now" : "Closed"}
        </span>
      </div>
      <p className="text-charcoal/60 mb-8">
        {store.category} · {store.floor}
      </p>

      <div className="aspect-[16/7] bg-gray-soft rounded-card mb-8 flex items-center justify-center text-charcoal/30 font-display text-3xl">
        {store.name.charAt(0)}
      </div>

      <p className="text-charcoal/80 mb-8 max-w-2xl">{store.description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="font-medium mb-3">Hours &amp; location</h2>
          <p className="text-sm text-charcoal/70 mb-1">Hours: {store.hours}</p>
          <p className="text-sm text-charcoal/70">Location: {store.floor}</p>
        </div>
        <div>
          <h2 className="font-medium mb-3">Contact</h2>
          <p className="text-sm text-charcoal/70 mb-1">{store.phone}</p>
          {store.website && (
            <a
              href={store.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-terracotta hover:underline"
            >
              Visit website
            </a>
          )}
        </div>
      </div>

      {storeOffers.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl mb-4">Current offers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {storeOffers.map((offer) => (
              <Link
                key={offer.slug}
                href={`/offers/${offer.slug}`}
                className="block border border-gray-soft rounded-card p-4 hover:border-terracotta transition-colors"
              >
                <p className="font-medium mb-1">{offer.title}</p>
                <p className="text-xs text-charcoal/50">
                  Until {new Date(offer.endDate).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedStores.length > 0 && (
        <div>
          <h2 className="font-display text-2xl mb-4">Related stores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedStores.map((s) => (
              <Link
                key={s.slug}
                href={`/stores/${s.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-gray-soft rounded-card overflow-hidden mb-2 flex items-center justify-center text-charcoal/30 font-display text-lg">
                  {s.name.charAt(0)}
                </div>
                <p className="text-sm font-medium group-hover:text-terracotta transition-colors">
                  {s.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
