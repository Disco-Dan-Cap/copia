import type { Reading } from "./types";
import { coachSalutationName, hasRichContext } from "./context";

// The resilience letter — served when the key is missing, the call is rate-
// limited, or the API is down. NOT the primary mode: the Coach is genuinely
// Claude reading the plot (that's the case-study claim), and this is the path
// that keeps the screen whole when the live call can't run. Hand-written in the
// Coach's voice and grounded in the same seed Claude would read, so a recruiter
// without a key still sees a real letter rather than an error.
//
// Mira's letter extends the dashboard's seeded coach note (the heirlooms two
// weeks out, the East Austin demand) into the full weekly composition.

const SIGNOFF = "— the Coach";

const MIRA_FALLBACK: Reading = {
  salutation: "Mira —",
  paragraphs: [
    "The heat is the headline this week. It lands hard on Sunday, so water deep Saturday night and don't let the beds go into it dry — that's the difference between a check and a loss this time of year.",
    "Your first heirlooms are about two weeks out; the front bed is just starting to blush. Will's been asking after them since April, and eighteen people searched heirloom tomatoes near you this week — a short \"coming soon\" note now locks those buyers in before the market stands fill. And that butter lettuce you sold through? Fourteen people went looking for salad greens nearby and came up empty. It bolts in this heat, so don't fight it — but a few heads relisted would catch the ones still hunting.",
    "Otherwise the hens are carrying you, the basil's about ready for a flush, and the zinnias have turned into a quiet little business of their own. A good week to be ahead of the weather rather than behind it.",
  ],
  consider: {
    heading: "Open the egg waitlist",
    body: "You sell out most weeks, and there's a standing crowd that would rather wait than miss. Eleven searches for local eggs near you this week, steady. Opening a short waitlist would let you plan the hens' output instead of fielding the same question every Saturday.",
  },
  signoff: SIGNOFF,
};

function youngSeason(sellerId: string): Reading {
  const name = coachSalutationName(sellerId);
  return {
    salutation: name ? `${name} —` : "Friend —",
    paragraphs: [
      "I'm still learning your plot, so I'll keep this short and honest.",
      "Give me a week of harvests and a few orders, and I'll start spotting the patterns worth telling you about — what's ripening, what your neighbors are hunting for, when to list so it sells. Until then, plant what the season's asking for, and let the record fill in.",
    ],
    consider: null,
    signoff: SIGNOFF,
  };
}

/** The seeded reading for a seller — Mira's full letter, or the young-season note. */
export function fallbackReading(sellerId: string): Reading {
  return hasRichContext(sellerId) ? MIRA_FALLBACK : youngSeason(sellerId);
}

/** The resilience answer for the ask affordance when the live call can't run. */
export function fallbackAnswer(sellerId: string): string {
  return hasRichContext(sellerId)
    ? "I can't reach the full reading of your plot just now — let me get back to you on that one. In the meantime, the short version for late spring in zone 9a: water deep and early, harvest in the cool of the morning, and list the same day you pick."
    : "I'm still learning your plot, so I'd only be guessing. Give it a week of harvests and ask me again — I'll have something real to tell you.";
}
