import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { offers, isOfferActive } from "@/data/offers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) return { title: "Offer not found" };
  return { title: offer.title, description: offer.terms };
}

export default async function OfferDetailPage({ params }: Props) {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) notFound();

  const active = isOfferActive(offer);
  const related = offers
    .filter((o) => o.storeSlug === offer.storeSlug && o.slug !== offer.slug)
    .slice(0, 3);

  return (
    <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60 mb-6">
        <Link href="/offers" className="hover:text-terracotta">
          Offers
        </Link>
        <span className="mx-2">/</span>
        <span>{offer.title}</span>
      </nav>

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-3xl">{offer.title}</h1>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap mt-2 ${active ? "bg-[#e7f3e8] text-[#2f6b34]" : "bg-gray-soft text-charcoal/60"}`}
        >
          {active ? "Active" : "Expired"}
        </span>
      </div>

      <Link
        href={`/stores/${offer.storeSlug}`}
        className="text-terracotta font-medium hover:underline"
      >
        {offer.storeName}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 my-8">
        <div>
          <h2 className="font-medium mb-2">Valid dates</h2>
          <p className="text-sm text-charcoal/70">
            {new Date(offer.startDate).toLocaleDateString()} –{" "}
            {new Date(offer.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h2 className="font-medium mb-2">Terms</h2>
          <p className="text-sm text-charcoal/70">{offer.terms}</p>
        </div>
      </div>

      {!active && (
        <p className="text-sm text-charcoal/50 italic mb-8">
          This offer has ended and is no longer valid.
        </p>
      )}

      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl mb-4">
            More from {offer.storeName}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((o) => (
              <Link
                key={o.slug}
                href={`/offers/${o.slug}`}
                className="block border border-gray-soft rounded-card p-4 hover:border-terracotta transition-colors"
              >
                <p className="font-medium mb-1">{o.title}</p>
                <p className="text-xs text-charcoal/50">
                  Until {new Date(o.endDate).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
