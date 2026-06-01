import { NextResponse } from "next/server";
import { sellersById } from "@/lib/data/sellers";
import { answerQuestion } from "@/lib/coach/generate";

// The ask affordance's endpoint — the tertiary "knock on the door" path. The
// weekly reading is composed server-side at page load; this is only hit when a
// grower types a question. Errors and a missing key degrade to the seeded
// answer inside answerQuestion, so the client always receives prose to render.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { sellerId?: string; question?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const sellerId = typeof body.sellerId === "string" ? body.sellerId : "";
  const question = typeof body.question === "string" ? body.question.trim() : "";

  if (!sellersById[sellerId]) return NextResponse.json({ error: "Unknown grower" }, { status: 400 });
  if (!question) return NextResponse.json({ error: "Empty question" }, { status: 400 });
  if (question.length > 500) return NextResponse.json({ error: "Question too long" }, { status: 400 });

  const result = await answerQuestion(sellerId, question, new Date());
  return NextResponse.json(result);
}
