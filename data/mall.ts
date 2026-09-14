// SAMPLE DATA — replace with real mall information when available.
export const mallInfo = {
  name: "Luga",
  tagline: "Shop, eat, and spend time together.",
  address: {
    street: "42 Harbor Promenade",
    city: "Rivermouth",
    postalCode: "10245",
    country: "Sample Country",
  },
  contact: {
    phone: "+1 (555) 019-2244",
    email: "hello@luga-mall.example",
  },
  hours: {
    weekly: [
      { day: "Monday", open: "10:00", close: "21:00" },
      { day: "Tuesday", open: "10:00", close: "21:00" },
      { day: "Wednesday", open: "10:00", close: "21:00" },
      { day: "Thursday", open: "10:00", close: "22:00" },
      { day: "Friday", open: "10:00", close: "22:00" },
      { day: "Saturday", open: "09:00", close: "22:00" },
      { day: "Sunday", open: "10:00", close: "20:00" },
    ],
  },
  parking: {
    summary: "1,200 spaces across two covered levels. First 90 minutes free.",
    accessibleSpaces: "48 accessible bays near Entrance A and Entrance C.",
  },
  transport: {
    bus: "Routes 12, 19, and 44 stop at Luga Terminal, outside Entrance B.",
    train:
      "Rivermouth Central Station, 8 minutes on foot via the riverside path.",
  },
  bicycle: "Covered bicycle racks at Entrance A, 120 spaces.",
  dropOff: "Taxi and drop-off bay on the north side, opposite Entrance B.",
  accessibility: {
    services:
      "Wheelchairs available on request at the Customer Service desk. Step-free access at all entrances.",
  },
  familyServices:
    "Parent rooms on Level 1 and Level 2. Family restrooms near the Food Hall.",
  customerService: {
    location: "Level 1, next to Entrance A.",
    hours: "Same as mall opening hours.",
  },
  wifi: "Free Wi-Fi network 'Luga-Guest' available throughout the mall.",
  lostAndFound:
    "Report or collect items at the Customer Service desk, Level 1.",
};

export function getTodayHours() {
  const dayIndex = new Date().getDay(); // 0 = Sunday
  const order = [6, 0, 1, 2, 3, 4, 5]; // maps to weekly array (Mon-first)
  const idx =
    order.indexOf(dayIndex) >= 0 ? [1, 2, 3, 4, 5, 6, 0].indexOf(dayIndex) : 0;
  return mallInfo.hours.weekly[idx];
}
