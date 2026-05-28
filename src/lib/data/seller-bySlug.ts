import type { Seller } from "./types";
import { sellersById } from "./sellers";

// Seller ids are already kebab-case and URL-safe ("miras-half-acre",
// "honey-and-the-comb"), so the slug IS the id — no separate mapping. This
// thin resolver is the one place the [slug] route reaches for a seller, so a
// future Supabase swap has a single seam.
export function sellerBySlug(slug: string): Seller | undefined {
  return sellersById[slug];
}

/**
 * Possessive form of a seller name for the "Ready at {x} now" headline.
 * Avoids the double-possessive eyesore: a name that already reads as a
 * possessive ("Mira's Half-Acre") is left alone; a name ending in "s"
 * ("Mueller Microgreens") takes a bare apostrophe; everything else takes "'s".
 */
export function possessive(name: string): string {
  if (name.includes("'")) return name; // "Mira's Half-Acre" → unchanged
  if (/s$/i.test(name)) return `${name}'`; // "Hyde Park Hens" → "Hyde Park Hens'"
  return `${name}'s`;
}
