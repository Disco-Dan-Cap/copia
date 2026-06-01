import { NextResponse } from "next/server";
import { sellersById } from "@/lib/data/sellers";
import { getReading } from "@/lib/coach/generate";

// The weekly reading's fetch endpoint — hit by the client only on a COLD
// (seller, week), behind the leaf-draw. A warm week is served server-side at
// page load via peekReading and never reaches here. getReading composes the
// reading (and caches it), or returns the seeded fallback when the key is
// missing / the call fails, so the client always receives a letter to settle in.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { sellerId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const sellerId = typeof body.sellerId === "string" ? body.sellerId : "";
  if (!sellersById[sellerId]) return NextResponse.json({ error: "Unknown grower" }, { status: 400 });

  const result = await getReading(sellerId, new Date());
  return NextResponse.json(result);
}
