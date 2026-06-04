import type { Metadata } from "next";
import { BasketView } from "@/components/basket/basket-view";

export const metadata: Metadata = { title: "Your basket" };

// The basket lives entirely in client state (localStorage), so the page is a thin
// shell over the client view. It sits in the (app) shell, between the demo chrome
// and the bottom tab bar, like every other buyer surface.
export default function BasketPage() {
  return <BasketView />;
}
