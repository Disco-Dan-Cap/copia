import type { Category } from "./types";

// The home "Browse by" grid spans the whole imagined Austin marketplace, so the
// counts are populated-marketplace figures, not the 38 seeded listings. Order
// matches `categoryOrder` in labels.ts; `icon` is the CategoryKey.
export const categories: Category[] = [
  { id: "vegetables", label: "Vegetables", count: 82, icon: "vegetables" },
  { id: "fruit", label: "Fruit", count: 29, icon: "fruit" },
  { id: "eggs-dairy", label: "Eggs & Dairy", count: 24, icon: "eggs" },
  { id: "baked-made", label: "Baked & Made", count: 22, icon: "baked" },
  { id: "honey-preserves", label: "Honey & Preserves", count: 26, icon: "honey" },
  { id: "flowers-herbs", label: "Flowers & Herbs", count: 17, icon: "flowers-herbs" },
];
