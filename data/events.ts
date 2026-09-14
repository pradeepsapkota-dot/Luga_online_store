// SAMPLE DATA — 6 fictional events.
export type MallEvent = {
  slug: string;
  title: string;
  date: string; // ISO
  time: string;
  location: string;
  audience: string;
  summary: string;
  registrationRequired: boolean;
  registrationOpen?: boolean;
};

export const events: MallEvent[] = [
  {
    slug: "summer-market",
    title: "Summer Riverside Market",
    date: "2026-10-25",
    time: "10:00–18:00",
    location: "Ground Floor Atrium",
    audience: "All ages",
    summary: "Local makers and food stalls set up across the atrium.",
    registrationRequired: false,
  },
  {
    slug: "kids-storytime",
    title: "Saturday Storytime",
    date: "2026-10-19",
    time: "11:00–11:45",
    location: "Pageturner Books",
    audience: "Ages 3–8",
    summary: "Weekly reading session hosted by Pageturner Books.",
    registrationRequired: true,
    registrationOpen: true,
  },
  {
    slug: "jazz-evening",
    title: "An Evening of Jazz",
    date: "2026-10-02",
    time: "19:00–21:00",
    location: "Level 3 Terrace",
    audience: "Adults",
    summary: "Live trio performance on the terrace, seating limited.",
    registrationRequired: true,
    registrationOpen: true,
  },
  {
    slug: "back-to-school",
    title: "Back to School Fair",
    date: "2026-11-15",
    time: "10:00–20:00",
    location: "Multiple stores",
    audience: "Families",
    summary: "Participating stores offer school-season deals and demos.",
    registrationRequired: false,
  },
  {
    slug: "spring-bloom",
    title: "Spring Bloom Workshop",
    date: "2026-11-14",
    time: "13:00–15:00",
    location: "Moss & Fern",
    audience: "Adults",
    summary: "Hands-on plant potting workshop.",
    registrationRequired: true,
    registrationOpen: false,
  },
  {
    slug: "winter-lights",
    title: "Winter Lights Opening",
    date: "2025-11-28",
    time: "17:00–19:00",
    location: "Ground Floor Atrium",
    audience: "All ages",
    summary: "Seasonal light installation switch-on with a community choir.",
    registrationRequired: false,
  },
];
