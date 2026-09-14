// SAMPLE DATA — 8 fictional dining tenants.
export type Restaurant = {
  slug: string;
  name: string;
  cuisine: string;
  diningType: "Sit-down" | "Quick bite" | "Café";
  floor: string;
  description: string;
  hours: string;
  familyFriendly: boolean;
  dietary: string[];
  reservationLink?: string;
  menuLink?: string;
};

export const restaurants: Restaurant[] = [
  {
    slug: "the-riverside-table",
    name: "The Riverside Table",
    cuisine: "Modern European",
    diningType: "Sit-down",
    floor: "Level 3",
    description:
      "Seasonal small plates with river views, popular for weekend brunch.",
    hours: "11:00–22:00",
    familyFriendly: true,
    dietary: ["Vegetarian", "Gluten-free options"],
    reservationLink:
      "mailto:hello@luga-mall.example?subject=Reservation%20request%20-%20The%20Riverside%20Table",
  },
  {
    slug: "noodle-and-bowl",
    name: "Noodle & Bowl",
    cuisine: "Pan-Asian",
    diningType: "Quick bite",
    floor: "Food Hall, Level 2",
    description: "Made-to-order noodle and rice bowls.",
    hours: "10:00–21:00",
    familyFriendly: true,
    dietary: ["Vegan options"],
  },
  {
    slug: "cafe-lumen",
    name: "Café Lumen",
    cuisine: "Café",
    diningType: "Café",
    floor: "Ground Floor",
    description: "Specialty coffee, pastries, and light lunches.",
    hours: "08:00–20:00",
    familyFriendly: true,
    dietary: ["Dairy-free milk options"],
  },
  {
    slug: "casa-verde",
    name: "Casa Verde",
    cuisine: "Italian",
    diningType: "Sit-down",
    floor: "Level 3",
    description: "Wood-fired pizza and handmade pasta.",
    hours: "11:00–22:00",
    familyFriendly: true,
    dietary: ["Vegetarian"],
    reservationLink:
      "mailto:hello@luga-mall.example?subject=Reservation%20request%20-%20Casa%20Verde",
    menuLink: "#",
  },
  {
    slug: "spice-route",
    name: "Spice Route",
    cuisine: "Indian",
    diningType: "Quick bite",
    floor: "Food Hall, Level 2",
    description: "Regional curries and thalis served fast.",
    hours: "10:00–21:00",
    familyFriendly: true,
    dietary: ["Vegan options", "Gluten-free options"],
  },
  {
    slug: "burger-yard",
    name: "Burger Yard",
    cuisine: "American",
    diningType: "Quick bite",
    floor: "Food Hall, Level 2",
    description: "Smash burgers and hand-cut fries.",
    hours: "10:00–21:00",
    familyFriendly: true,
    dietary: [],
  },
  {
    slug: "sakura-sushi",
    name: "Sakura Sushi",
    cuisine: "Japanese",
    diningType: "Sit-down",
    floor: "Level 3",
    description: "Sushi counter and cooked options for those new to raw fish.",
    hours: "11:30–21:30",
    familyFriendly: false,
    dietary: ["Gluten-free options"],
    reservationLink:
      "mailto:hello@luga-mall.example?subject=Reservation%20request%20-%20Sakura%20Sushi",
  },
  {
    slug: "sweet-and-slow",
    name: "Sweet & Slow",
    cuisine: "Café",
    diningType: "Café",
    floor: "Ground Floor",
    description: "Cakes, ice cream, and slow-brewed coffee.",
    hours: "09:00–20:00",
    familyFriendly: true,
    dietary: ["Vegan options"],
  },
];
