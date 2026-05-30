import type { Listing } from "./types";

type ListingStatusValue = NonNullable<Listing["status"]>;

// Editorial closure lines shown after a status change — the Day-7 register
// (the "Done — thanks for taking good care of this one." moment). Generic by
// status, with bespoke upgrades for listings whose own seasonal anchor gives
// us a warmer, in-voice line.

const GENERIC: Record<ListingStatusValue, string> = {
  active: "Live in the market — buyers can find this now.",
  paused: "Resting for now. It'll surface again the day you relist it.",
  "sold-out": "Sold through. Relist when the next pick is ready.",
};

const BESPOKE: Record<string, string> = {
  "l-miras-jalapenos:paused": "Resting until the heat sets in.",
  "l-miras-cherry:paused": "Out of season — the deer get the fence back.",
  "l-miras-peas:paused": "Done for the year — back when the nights cool again.",
  "l-miras-squash:paused": "Two plants is plenty — back when one needs picking again.",
  "l-miras-lettuce:sold-out": "Sold through. Back when the cool returns.",
};

/** The closure line for a listing entering a status — bespoke if we have one. */
export function closureLine(listingId: string, status: ListingStatusValue): string {
  return BESPOKE[`${listingId}:${status}`] ?? GENERIC[status];
}
