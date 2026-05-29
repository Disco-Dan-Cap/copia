import type { WeatherDay } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";
import { SunIcon, PartlyCloudyIcon, CloudIcon, RainIcon } from "@/components/ui/icons";

function Glyph({ icon, className }: { icon: WeatherDay["icon"]; className?: string }) {
  if (icon === "sun") return <SunIcon className={className} />;
  if (icon === "partly") return <PartlyCloudyIcon className={className} />;
  if (icon === "cloud") return <CloudIcon className={className} />;
  return <RainIcon className={className} />;
}

/** The 7-day forecast strip beneath the weather figure — mini icons, hairline-divided. */
export function WeatherStrip({ days, labels }: { days: WeatherDay[]; labels: string[] }) {
  return (
    <div className="mt-[14px] flex overflow-hidden rounded-[8px] border border-sage-shadow/25 bg-cream-warm">
      {days.map((d, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-1 flex-col items-center gap-[5px] py-[8px]",
            i > 0 && "border-l border-sage-shadow/20",
          )}
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-mid-forest">
            {labels[i]}
          </span>
          <Glyph icon={d.icon} className="h-[15px] w-[15px] text-forest" />
          <span className="text-[10px] font-medium tabular-nums text-deepest-forest">{d.hi}°</span>
        </div>
      ))}
    </div>
  );
}
