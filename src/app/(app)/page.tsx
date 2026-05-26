import { Masthead } from "@/components/home/masthead";
import { SeasonScroller } from "@/components/home/season-scroller";
import { SellerMap } from "@/components/home/seller-map";
import { SellerList } from "@/components/home/seller-list";
import { CategoryGrid } from "@/components/home/category-grid";
import { GrowCta } from "@/components/home/grow-cta";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <SeasonScroller />
      <SellerMap />
      <SellerList />
      <CategoryGrid />
      <GrowCta />
      {/* breathing room before the pinned tab bar */}
      <div className="h-[24px]" />
    </>
  );
}
