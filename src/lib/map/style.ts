import type { Map as MapboxMap } from "mapbox-gl";

// The map is WebGL — its paint properties can't read the CSS variables that
// hold the palette elsewhere, so these literals are the one sanctioned place
// hexes live outside `globals.css`. Each maps to a Copia token; keep them in
// sync with `brand/copia-palette-card.html`. Large fills (water, parks) use
// desaturated tints because mint/sage at full strength exhaust the eye at
// screen scale (per the design directive).
const COPIA = {
  land: "#FAF6EE", // --cream
  landAlt: "#F4EEDF", // --cream-warm
  road: "#E6DDC6", // paper-toned minor road
  roadMajor: "#D8CDB0", // slightly darker arterials
  water: "#BFE9DC", // desaturated --mint
  park: "#D2E7D8", // light tint of --light-sage
  building: "#EFE8D6",
  boundary: "#C8BFA6",
  label: "#30594A", // --mid-forest
  labelHalo: "#FAF6EE", // --cream
} as const;

const WATER = /water|ocean|bay|river|lake|pond|reservoir/;
const GREEN = /park|wood|grass|forest|golf|cemetery|pitch|garden|landuse|national|scrub|meadow/;
const ROAD_MAJOR = /motorway|trunk|primary|major|arterial/;
const HIDE_SYMBOLS = /poi|transit|aerialway|natural-point|natural-line/;
const ADMIN = /admin|boundary|border/;

/**
 * Recolor a stock Mapbox Light style into Copia's cream-and-forest palette at
 * runtime. We switch on `layer.type` and match the *value* by layer id, so this
 * survives Mapbox restyling layer names. Every set is guarded — a layer that
 * doesn't accept a property in this style version is simply skipped. The brand
 * transform lives in git, not in a Studio account.
 */
export function applyCopiaStyle(map: MapboxMap) {
  const layers = map.getStyle()?.layers;
  if (!layers) return;

  for (const layer of layers) {
    const id = layer.id;
    try {
      switch (layer.type) {
        case "background":
          map.setPaintProperty(id, "background-color", COPIA.landAlt);
          break;

        case "fill":
          if (WATER.test(id)) map.setPaintProperty(id, "fill-color", COPIA.water);
          else if (GREEN.test(id)) map.setPaintProperty(id, "fill-color", COPIA.park);
          else if (/building/.test(id)) map.setPaintProperty(id, "fill-color", COPIA.building);
          else map.setPaintProperty(id, "fill-color", COPIA.land);
          break;

        case "line":
          if (WATER.test(id)) map.setPaintProperty(id, "line-color", COPIA.water);
          else if (ADMIN.test(id)) map.setPaintProperty(id, "line-color", COPIA.boundary);
          else
            map.setPaintProperty(
              id,
              "line-color",
              ROAD_MAJOR.test(id) ? COPIA.roadMajor : COPIA.road,
            );
          break;

        case "symbol":
          if (HIDE_SYMBOLS.test(id)) {
            map.setLayoutProperty(id, "visibility", "none");
          } else {
            // Place + road labels read as quiet forest captions.
            map.setPaintProperty(id, "text-color", COPIA.label);
            map.setPaintProperty(id, "text-halo-color", COPIA.labelHalo);
            map.setPaintProperty(id, "text-halo-width", 1.2);
          }
          break;

        case "fill-extrusion":
          map.setPaintProperty(id, "fill-extrusion-color", COPIA.building);
          map.setPaintProperty(id, "fill-extrusion-opacity", 0.4);
          break;

        default:
          break;
      }
    } catch {
      // Property not valid for this layer in this style version — skip it.
    }
  }
}
