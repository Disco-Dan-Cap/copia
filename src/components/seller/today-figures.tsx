import type { WeatherDay } from "@/lib/data/dashboard";
import { formatEditorialCount } from "@/lib/format";
import { WeatherStrip } from "./weather-strip";

interface TodayFiguresProps {
  pickups: { count: number; sub: string };
  sales: { amount: number; trendPct: number | null; lastWeek: number; driver: string | null };
  weather: { hi: number; lo: number; summary: string; days: WeatherDay[]; dayLabels: string[] };
}

const LABEL = "mb-[12px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-mid-forest";
const BIG = "text-[30px] font-bold leading-none tracking-[-0.025em] text-deepest-forest lg:text-[32px]";
const SUB = "mt-[10px] text-[13px] leading-[1.4] text-mid-forest";
const CLARIFIER = "ml-[5px] font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-mid-forest";

/**
 * Three "today" figures set as editorial figures — label, big number, and
 * explanatory subtext — hairline-divided, NOT metric cards. The only trend is
 * the inline "↑N%" on sales, where a true week-over-week comparable exists;
 * pickups and weather get none.
 */
export function TodayFigures({ pickups, sales, weather }: TodayFiguresProps) {
  return (
    <section className="border-y border-forest/20">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Pickups — the big number is the editorial Fraunces word */}
        <div className="border-b border-forest/20 py-[20px] lg:border-b-0 lg:border-r lg:border-forest/20 lg:pr-[22px]">
          <div className={LABEL}>Today · pickups</div>
          <div className={`${BIG} [&_em]:font-emphasis [&_em]:text-[28px] [&_em]:font-normal [&_em]:italic [&_em]:text-forest`}>
            {pickups.count === 0 ? "None" : <em>{formatEditorialCount(pickups.count)}</em>}
          </div>
          <div className={SUB}>{pickups.sub}</div>
        </div>

        {/* Sales — the one figure that carries a trend */}
        <div className="border-b border-forest/20 py-[20px] lg:border-b-0 lg:border-r lg:border-forest/20 lg:px-[22px]">
          <div className={LABEL}>This week · sales</div>
          <div className={BIG}>${sales.amount}</div>
          <div className={SUB}>
            {sales.trendPct != null ? (
              <>
                <span className="font-mono text-[11px] tracking-[0.04em] text-forest">
                  {sales.trendPct >= 0 ? "↑" : "↓"}
                  {Math.abs(sales.trendPct)}%
                </span>{" "}
                over ${sales.lastWeek} last week.
              </>
            ) : (
              "Your first week of sales."
            )}
            {sales.driver ? ` ${sales.driver}` : ""}
          </div>
        </div>

        {/* Weather — the 7-day strip earns the "7 days" label */}
        <div className="py-[20px] lg:pl-[22px]">
          <div className={LABEL}>Weather · 7 days</div>
          <div className={BIG}>
            {weather.hi}°<span className={CLARIFIER}>High</span>
            <span className="mx-[8px] text-[24px] font-normal text-sage-shadow">·</span>
            {weather.lo}°<span className={CLARIFIER}>Low</span>
          </div>
          <div className={SUB}>{weather.summary}</div>
          <WeatherStrip days={weather.days} labels={weather.dayLabels} />
        </div>
      </div>
    </section>
  );
}
