// SAMPLE DATA — 12 fictional tenants for demo purposes.
export type Store = {
  slug: string;
  name: string;
  category: string;
  floor: string;
  description: string;
  hours: string;
  phone: string;
  website?: string;
  offerSlugs?: string[];
};

export const storeCategories = [
  "Fashion",
  "Footwear",
  "Electronics",
  "Home & Living",
  "Beauty",
  "Books & Media",
  "Sports",
  "Kids & Toys",
  "Jewelry",
  "Services",
];

export const stores: Store[] = [
  {
    slug: "north-and-oak",
    name: "North & Oak",
    category: "Fashion",
    floor: "Level 1",
    description:
      "Contemporary menswear and womenswear with a focus on natural fabrics.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2201",
    website: "https://example.com/north-and-oak",
  },
  {
    slug: "fielder-supply",
    name: "Fielder Supply Co.",
    category: "Sports",
    floor: "Level 2",
    description:
      "Running, cycling, and outdoor gear with an in-store fitting service.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2202",
  },
  {
    slug: "brightside-electronics",
    name: "Brightside Electronics",
    category: "Electronics",
    floor: "Level 2",
    description: "Phones, laptops, and home electronics with same-day repairs.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2203",
  },
  {
    slug: "willow-home",
    name: "Willow Home",
    category: "Home & Living",
    floor: "Level 1",
    description:
      "Furniture and homeware for small spaces and growing families.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2204",
  },
  {
    slug: "petal-and-stone",
    name: "Petal & Stone",
    category: "Beauty",
    floor: "Ground Floor",
    description: "Skincare, fragrance, and a walk-in facial bar.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2205",
  },
  {
    slug: "pageturner-books",
    name: "Pageturner Books",
    category: "Books & Media",
    floor: "Level 1",
    description: "Independent bookstore with a children's reading corner.",
    hours: "10:00–20:00",
    phone: "+1 555 010 2206",
  },
  {
    slug: "kicks-lane",
    name: "Kicks Lane",
    category: "Footwear",
    floor: "Ground Floor",
    description: "Sneakers and everyday footwear for the whole family.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2207",
  },
  {
    slug: "little-atlas",
    name: "Little Atlas",
    category: "Kids & Toys",
    floor: "Level 2",
    description: "Toys, games, and books for children up to age 12.",
    hours: "10:00–21:00",
    phone: "+1 555 010 2208",
  },
  {
    slug: "auric-jewelers",
    name: "Auric Jewelers",
    category: "Jewelry",
    floor: "Ground Floor",
    description: "Fine jewelry, watch repair, and custom engraving.",
    hours: "10:00–20:00",
    phone: "+1 555 010 2209",
  },
  {
    slug: "swift-alterations",
    name: "Swift Alterations",
    category: "Services",
    floor: "Level 1",
    description: "Clothing alterations and tailoring, same-week turnaround.",
    hours: "10:00–19:00",
    phone: "+1 555 010 2210",
  },
  {
    slug: "harbor-optics",
    name: "Harbor Optics",
    category: "Services",
    floor: "Ground Floor",
    description: "Eye exams, glasses, and contact lens fittings.",
    hours: "10:00–20:00",
    phone: "+1 555 010 2211",
  },
  {
    slug: "moss-and-fern",
    name: "Moss & Fern",
    category: "Home & Living",
    floor: "Level 1",
    description: "Houseplants, pots, and small-space gardening supplies.",
    hours: "10:00–20:00",
    phone: "+1 555 010 2212",
  },
];

export function isOpenNow(hours: string): boolean {
  const [open, close] = hours.split("–").map((t) => t.trim());
  const now = new Date();
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  const openMinutes = oh * 60 + om;
  const closeMinutes = ch * 60 + cm;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
}
