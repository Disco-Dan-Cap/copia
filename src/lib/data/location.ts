import type { LngLat } from "./types";

// Fixed buyer location for the demo — a residential block in East Austin.
// A real `navigator.geolocation` lookup is a later enhancement; a constant
// keeps the portfolio demo deterministic (the same sellers are always "near").
export const buyerLocation: LngLat = { lng: -97.715, lat: 30.275 };

export const buyerNeighborhood = "East Austin";
