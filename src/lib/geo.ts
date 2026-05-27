import type { LngLat } from "@/lib/data/types";

const EARTH_RADIUS_MI = 3958.8;

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Great-circle distance between two points in miles (haversine). The map and
 * the distance filter both run on this, so "0.8 mi" labels are computed from
 * real coordinates — never hardcoded strings.
 */
export function haversineMi(a: LngLat, b: LngLat): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return EARTH_RADIUS_MI * 2 * Math.asin(Math.sqrt(h));
}

/** Human display for a distance in miles: "< 0.1 mi", "0.8 mi", "22 mi". */
export function formatDistance(mi: number): string {
  if (mi < 0.1) return "< 0.1 mi";
  if (mi < 10) return `${mi.toFixed(1)} mi`;
  return `${Math.round(mi)} mi`;
}

/** Mapbox expects `[lng, lat]` tuples; our data carries `{ lng, lat }`. */
export function toLngLatTuple(p: LngLat): [number, number] {
  return [p.lng, p.lat];
}
