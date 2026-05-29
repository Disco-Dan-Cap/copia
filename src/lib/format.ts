const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five",
  "Six", "Seven", "Eight", "Nine", "Ten",
];

/**
 * Editorial count: small numbers spell out ("Three"), larger ones stay numeric
 * ("11"). The boundary is 10 — words through ten, numerals above. Used across
 * the dashboard (pickups figure, listings count, etc.) so the whole screen
 * reads like prose, not a stat sheet.
 */
export function formatEditorialCount(n: number): string {
  if (n >= 0 && n <= 10) return WORDS[n];
  return String(n);
}
