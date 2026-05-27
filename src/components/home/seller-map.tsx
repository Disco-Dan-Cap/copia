import { nearbySellerCount, sellerMapPins } from "@/lib/data/sellers";
import { SectionHead } from "./section-head";

const PIN_SHADOW = "0 2px 8px rgba(30, 61, 48, 0.25)";

/**
 * Stylized cream-toned discover map with clustered seller pins. Intentionally a
 * hand-drawn SVG, not live Mapbox — real Mapbox lands with the search / map-view
 * screen. Roads, river and green spaces evoke Austin without a tile fetch.
 */
export function SellerMap() {
  return (
    <section className="pt-[28px] pb-[8px]">
      <SectionHead
        label={`${nearbySellerCount} sellers near you`}
        action="Map view"
        actionHref="/search?view=map"
      />
      <div className="relative mx-[28px] h-[180px] overflow-hidden rounded-[14px] border border-sage-shadow/25 bg-cream-warm">
        <svg
          viewBox="0 0 334 180"
          className="block h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <rect width="100%" height="100%" fill="#F4EEDF" />
          {/* roads */}
          <path d="M0 60 L334 80" stroke="#D4C9AC" strokeWidth={2} fill="none" />
          <path d="M0 120 L334 110" stroke="#D4C9AC" strokeWidth={2} fill="none" />
          <path d="M80 0 L100 180" stroke="#D4C9AC" strokeWidth={2} fill="none" />
          <path d="M200 0 L210 180" stroke="#D4C9AC" strokeWidth={2} fill="none" />
          {/* river */}
          <path d="M0 140 Q80 120, 160 150 T334 130" stroke="#9CE5D0" strokeWidth={5} fill="none" opacity={0.7} />
          {/* green spaces */}
          <circle cx={60} cy={40} r={22} fill="#74B5A1" opacity={0.35} />
          <circle cx={260} cy={50} r={18} fill="#74B5A1" opacity={0.35} />
          <circle cx={170} cy={100} r={14} fill="#74B5A1" opacity={0.35} />
        </svg>

        {sellerMapPins.map((pin, i) =>
          pin.you ? (
            <span
              key={i}
              className="absolute h-[14px] w-[14px] rounded-full border-2 border-cream bg-terracotta"
              style={{ top: `${pin.topPct}%`, left: `${pin.leftPct}%`, boxShadow: PIN_SHADOW }}
              aria-label="Your location"
            />
          ) : (
            <span
              key={i}
              className="absolute flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-cream bg-forest font-mono text-[10px] font-semibold text-cream"
              style={{ top: `${pin.topPct}%`, left: `${pin.leftPct}%`, boxShadow: PIN_SHADOW }}
            >
              {pin.count}
            </span>
          ),
        )}
      </div>
    </section>
  );
}
