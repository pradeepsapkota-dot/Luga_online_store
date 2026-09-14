// SAMPLE DATA — 8 fictional offers.
export type Offer = {
  slug: string;
  storeSlug: string;
  storeName: string;
  title: string;
  startDate: string;
  endDate: string;
  terms: string;
};

export const offers: Offer[] = [
  {
    slug: "north-oak-20-off",
    storeSlug: "north-and-oak",
    storeName: "North & Oak",
    title: "20% off new-season knitwear",
    startDate: "2026-07-01",
    endDate: "2026-10-31",
    terms:
      "Applies to full-price knitwear only. Cannot combine with other offers.",
  },
  {
    slug: "brightside-trade-in",
    storeSlug: "brightside-electronics",
    storeName: "Brightside Electronics",
    title: "Trade in your old phone for store credit",
    startDate: "2026-06-15",
    endDate: "2026-10-01",
    terms: "Device must power on. Value assessed in-store.",
  },
  {
    slug: "petal-stone-gift",
    storeSlug: "petal-and-stone",
    storeName: "Petal & Stone",
    title: "Free mini facial with any skincare purchase over $60",
    startDate: "2026-07-10",
    endDate: "2026-07-24",
    terms: "One per customer. Subject to availability.",
  },
  {
    slug: "kicks-lane-bogo",
    storeSlug: "kicks-lane",
    storeName: "Kicks Lane",
    title: "Buy one, get one 50% off kids' shoes",
    startDate: "2026-07-01",
    endDate: "2026-07-20",
    terms: "Lower-priced pair discounted. In-store only.",
  },
  {
    slug: "casa-verde-lunch",
    storeSlug: "casa-verde",
    storeName: "Casa Verde",
    title: "Weekday lunch set, 2 courses for $18",
    startDate: "2026-07-01",
    endDate: "2026-09-16",
    terms: "Monday–Friday, 11:30–14:00 only.",
  },
  {
    slug: "little-atlas-clearance",
    storeSlug: "little-atlas",
    storeName: "Little Atlas",
    title: "Up to 40% off summer toys",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    terms: "While stocks last. Excludes new arrivals.",
  },
  {
    slug: "harbor-optics-exam",
    storeSlug: "harbor-optics",
    storeName: "Harbor Optics",
    title: "Free eye exam with any frame purchase",
    startDate: "2026-07-05",
    endDate: "2026-08-05",
    terms: "Booking required. One exam per customer.",
  },
  {
    slug: "auric-engraving",
    storeSlug: "auric-jewelers",
    storeName: "Auric Jewelers",
    title: "Free engraving on all watches",
    startDate: "2026-05-01",
    endDate: "2026-06-15",
    terms: "Standard engraving only. Excludes vintage pieces.",
  },
];

export function isOfferActive(offer: Offer): boolean {
  const now = new Date();
  return now >= new Date(offer.startDate) && now <= new Date(offer.endDate);
}
