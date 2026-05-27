"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { Map as MapboxMap, Marker as MapboxMarker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { LngLat } from "@/lib/data/types";
import type { SellerResult } from "@/lib/search/query";
import { applyCopiaStyle } from "@/lib/map/style";
import { LeafWave } from "@/components/ui/leaf-wave";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const PIN_SHADOW = "0 2px 8px rgba(30, 61, 48, 0.25)";
const PIN_SHADOW_SELECTED =
  "0 0 0 3px rgba(156, 229, 208, 0.7), 0 6px 16px rgba(30, 61, 48, 0.32)";

interface CopiaMapProps {
  sellers: SellerResult[];
  buyer: LngLat;
  selectedSellerId: string | null;
  onSelectSeller: (id: string | null) => void;
  className?: string;
}

function styleSellerPin(el: HTMLElement, selected: boolean) {
  el.style.boxShadow = selected ? PIN_SHADOW_SELECTED : PIN_SHADOW;
  el.style.zIndex = selected ? "10" : "1";
  el.classList.toggle("scale-[1.18]", selected);
  el.classList.toggle("border-mint", selected);
  el.classList.toggle("border-cream", !selected);
}

/**
 * The live, queryable counterpart to the stylized Home map. A stock Mapbox
 * Light style recolored to Copia cream + forest at runtime; seller pins and the
 * "you are here" dot are HTML markers carrying the exact brand language of the
 * Home SVG map, so the real map reads as the hand-drawn one come to life.
 */
export function CopiaMap({
  sellers,
  buyer,
  selectedSellerId,
  onSelectSeller,
  className,
}: CopiaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const sellerMarkers = useRef<Map<string, MapboxMarker>>(new Map());
  const [ready, setReady] = useState(false);

  // Keep the latest selection callback + selection in refs so map/marker
  // handlers bound once still read the current closure (synced post-commit).
  const onSelectRef = useRef(onSelectSeller);
  const selectedRef = useRef(selectedSellerId);
  useEffect(() => {
    onSelectRef.current = onSelectSeller;
    selectedRef.current = selectedSellerId;
  });

  // ── Create the map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [buyer.lng, buyer.lat],
      zoom: 10.2,
      attributionControl: false,
      dragRotate: false,
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
    map.on("click", () => onSelectRef.current(null));
    map.on("load", () => {
      applyCopiaStyle(map);

      // "You are here" — terracotta dot, matching the Home map.
      const youEl = document.createElement("div");
      youEl.className = "h-[16px] w-[16px] rounded-full border-2 border-cream bg-terracotta";
      youEl.style.boxShadow = PIN_SHADOW;
      youEl.setAttribute("aria-label", "Your location");
      new mapboxgl.Marker({ element: youEl }).setLngLat([buyer.lng, buyer.lat]).addTo(map);

      setReady(true);
    });

    const markers = sellerMarkers.current;
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
      setReady(false);
    };
    // buyer is a stable constant for the demo; create once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Rebuild seller markers when the result set changes ─────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    sellerMarkers.current.forEach((m) => m.remove());
    sellerMarkers.current.clear();

    for (const { seller, matchCount } of sellers) {
      const el = document.createElement("button");
      el.type = "button";
      el.className =
        "flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-cream bg-forest font-mono text-[11px] font-semibold text-cream transition-transform";
      el.textContent = String(matchCount);
      el.setAttribute("aria-label", `${seller.name} — ${matchCount} matching`);
      styleSellerPin(el, seller.id === selectedRef.current);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(seller.id === selectedRef.current ? null : seller.id);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([seller.location.lng, seller.location.lat])
        .addTo(map);
      sellerMarkers.current.set(seller.id, marker);
    }
  }, [sellers, ready]);

  // ── Fit bounds when the set of sellers changes ─────────────────────────────
  const boundsKey = sellers.map((s) => s.seller.id).join(",");
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const bounds = new mapboxgl.LngLatBounds([buyer.lng, buyer.lat], [buyer.lng, buyer.lat]);
    for (const { seller } of sellers) bounds.extend([seller.location.lng, seller.location.lat]);

    if (sellers.length === 0) {
      map.easeTo({ center: [buyer.lng, buyer.lat], zoom: 11, duration: 500 });
    } else {
      map.fitBounds(bounds, {
        padding: { top: 80, bottom: 190, left: 56, right: 56 },
        maxZoom: 13,
        duration: 600,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundsKey, ready]);

  // ── Reflect selection: restyle pins, ease toward the chosen seller ─────────
  useEffect(() => {
    if (!ready) return;
    sellerMarkers.current.forEach((marker, id) => {
      styleSellerPin(marker.getElement(), id === selectedSellerId);
    });
    const map = mapRef.current;
    const chosen = sellers.find((s) => s.seller.id === selectedSellerId);
    if (map && chosen) {
      map.easeTo({
        center: [chosen.seller.location.lng, chosen.seller.location.lat],
        zoom: Math.max(map.getZoom(), 12),
        duration: 500,
      });
    }
  }, [selectedSellerId, ready, sellers]);

  // ── Token-absent fallback (keeps local dev / first deploy from crashing) ───
  if (!TOKEN) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-cream-warm ${className ?? ""}`}
      >
        <LeafWave density="sparse" opacity={0.5} className="absolute inset-0 h-full w-full text-sage opacity-40" />
        <p className="relative z-[2] mx-[40px] text-center font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
          Map needs NEXT_PUBLIC_MAPBOX_TOKEN
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className={className} aria-label="Map of nearby sellers" />;
}
