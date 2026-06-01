import type { Seller } from "./types";

// The seed values behind the seller Settings ("the stall, as you keep it").
// These are NOT new stored fields — they're derived from the seller seed so the
// preferences page has an honest starting point, then edited optimistically on
// the client (resets on reload, like every other seller surface). A future
// Supabase swap would persist these and propagate the bio to the buyer profile.

export interface StallPrefs {
  /** The bio — the same vignette the buyer profile renders, as plain prose. */
  bio: string;
  /** What's growing, in the grower's voice — the load-bearing line. */
  growing: string;
  /** Pickup windows as prose, never a 7-day grid of toggles. */
  pickup: string;
  /** How to reach the grower — correspondence in prose, not notification rows. */
  reach: string;
  /** Default "Closed till…" reason, shown when the stall is paused. */
  pauseReason: string;
}

/** Strip the single `<em>` accent from a seed story so it edits as plain prose. */
function toPlainProse(html: string): string {
  return html.replace(/<\/?em>/g, "");
}

// Mira is the demo identity — hand-authored in her voice. The other eleven
// sellers fall back to honest, seed-derived defaults (only ever seen when the
// demo identity is switched via ?as=).
const HAND_AUTHORED: Record<string, Omit<StallPrefs, "bio">> = {
  "miras-half-acre": {
    growing: "Tomatoes from May, basil right through the summer, and eggs when the hens agree.",
    pickup: "Saturdays, nine to one, at the SFC market on Republic Square. Weekday pickups by arrangement.",
    reach: "Message me here first — I read it between waterings. Saturdays, I'm at the market stall.",
    pauseReason: "till the okra comes in",
  },
};

export function stallPrefs(seller: Seller): StallPrefs {
  const bio = toPlainProse(seller.story);
  const authored = HAND_AUTHORED[seller.id];
  if (authored) return { bio, ...authored };

  // Seed-derived fallbacks for the non-demo sellers — short, warm, honest.
  return {
    bio,
    growing: seller.blurb,
    pickup: `Pickup around ${seller.area}. Message to set a time.`,
    reach: "Message me through Copia — I'll get back when I'm in from the field.",
    pauseReason: "till the season turns",
  };
}
