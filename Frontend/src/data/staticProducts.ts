export const staticProducts = [
  {
    id: "hepa-purifier",
    title: "HEPA Air Purifier",
    description: "Removes 99.97% of airborne particles and harmful pollutants.",
    price: 149.99,
    imageUrl: "/images/HEPA.png",
    availableForSale: true,
  },
  {
    id: "n95-masks",
    title: "N95 Face Masks (Pack of 10)",
    description: "Certified N95 masks for protection against pollutants and viruses.",
    price: 29.99,
    imageUrl: "/images/n95-masks.png",
    availableForSale: true,
  },
  {
    id: "carbon-filters",
    title: "Activated Carbon Water Filters (Set of 3)",
    description: "Reduces contaminants for cleaner, better-tasting water.",
    price: 39.99,
    imageUrl: "/images/carbon-filters.png",
    availableForSale: true,
  },
];

export type Product = typeof staticProducts[number];
