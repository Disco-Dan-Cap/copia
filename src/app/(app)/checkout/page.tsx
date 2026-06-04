import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = { title: "Settling up" };

// Checkout lives on the basket's client state, so the page is a thin shell over
// the client view — same shape as the basket page. It sits in the (app) shell,
// between the demo chrome and the bottom tab bar.
export default function CheckoutPage() {
  return <CheckoutView />;
}
