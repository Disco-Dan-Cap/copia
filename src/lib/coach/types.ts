// The Growing Coach's output shapes. The Coach is the first AI-touched surface
// in Copia (Day 13) — it arrives after twelve seller surfaces that each refused
// their genre's defaults without invoking AI. Its job is to read a grower's
// whole plot and write them a letter, not run a chat thread.
//
// Division of labor (deliberate, and the spine of the case-study claim):
//   • The FACTS — the seven-day plan strip, the demand list, the dateline —
//     are rendered deterministically from the same seed the rest of the app
//     uses. They must be exactly right, so a model never touches them.
//   • The JUDGMENT — the prose reading and the single "Consider" — is what
//     Claude composes, grounded in the full context block. The proof it read
//     the plot is that it names Will and the sold-out lettuce in a sentence,
//     never as a citation.

/** The one recommendation the Coach raises, when there's a real one to raise. */
export interface ReadingConsider {
  /** A phrase, not a label — "Shishito peppers, easy in your climate". */
  heading: string;
  /** Two or three sentences tying the suggestion to demand the Coach can see. */
  body: string;
}

/** The AI-composed letter — prose only. The strip and demand list live beside it. */
export interface Reading {
  /** The grower's first name + em dash, e.g. "Mira —". */
  salutation: string;
  /** Two or three short letter paragraphs. Never headed, never bulleted. */
  paragraphs: string[];
  /** One recommendation, or null when silence beats a filler suggestion. */
  consider: ReadingConsider | null;
  /** Always "— the Coach". Added server-side, never by the model. */
  signoff: string;
}

/** Whether a reading came from Claude or the seeded resilience letter. */
export type ReadingSource = "live" | "fallback";

export interface ReadingResult {
  reading: Reading;
  source: ReadingSource;
}

/** A single answer to a grower's question — prose, in the Coach's voice. */
export interface CoachAnswer {
  answer: string;
  source: ReadingSource;
}
