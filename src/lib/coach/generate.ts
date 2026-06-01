import Anthropic from "@anthropic-ai/sdk";
import type { CoachAnswer, Reading, ReadingResult } from "./types";
import { COACH_SYSTEM_PROMPT, COMPOSE_READING_TOOL } from "./prompt";
import { buildContextBlock, coachDateline, weekKey } from "./context";
import { fallbackReading, fallbackAnswer } from "./fallback";

// The live Coach. Sonnet 4.6 is the deliberate choice over Opus here: the hero
// quality bar for this surface is voice and grounding, both of which the system
// prompt controls, and a portfolio demo can take real recruiter traffic — Sonnet
// holds the voice at a fraction of the per-visit cost. Swap COACH_MODEL to
// claude-opus-4-8 if a reading ever needs more reasoning headroom.
const COACH_MODEL = "claude-sonnet-4-6";
const SIGNOFF = "— the Coach";

// Prompt caching (per the claude-api skill): the system prompt is stable across
// every seller, and the plot block is stable within a (seller, week). Marking
// both as ephemeral cache breakpoints means a grower's follow-up questions reuse
// the cached prefix instead of re-billing the whole context each turn.
function systemBlocks(sellerId: string, now: Date): Anthropic.TextBlockParam[] {
  return [
    { type: "text", text: COACH_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    {
      type: "text",
      text: `# This week's reading of the grower's plot\n# ${coachDateline(sellerId, now)}\n\n${buildContextBlock(sellerId, now)}`,
      cache_control: { type: "ephemeral" },
    },
  ];
}

let client: Anthropic | null = null;
function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic();
  return client;
}

// The weekly reading is generated once per (seller, week) and served from this
// module-level cache after — recruiter visits within the same week don't re-bill.
// Resets on server restart (fine for the demo); a real build would back this with
// a KV store. Fallbacks are never cached, so a transient failure retries next load.
const readingCache = new Map<string, Reading>();

interface ComposeInput {
  salutation: string;
  paragraphs: string[];
  consider: { include: boolean; heading: string; body: string };
}

/** Validate the model's tool input before trusting it on screen. */
function toReading(input: ComposeInput): Reading | null {
  if (typeof input?.salutation !== "string") return null;
  if (!Array.isArray(input.paragraphs) || input.paragraphs.some((p) => typeof p !== "string")) return null;
  if (!input.paragraphs.length) return null;
  const c = input.consider;
  const consider = c && c.include && c.heading && c.body ? { heading: c.heading, body: c.body } : null;
  return { salutation: input.salutation.trim(), paragraphs: input.paragraphs, consider, signoff: SIGNOFF };
}

/** This week's reading — from cache, then the live model, then the seeded letter. */
export async function getReading(sellerId: string, now: Date): Promise<ReadingResult> {
  const key = `${sellerId}:${weekKey(now)}`;
  const cached = readingCache.get(key);
  if (cached) return { reading: cached, source: "live" };

  const anthropic = getClient();
  if (!anthropic) return { reading: fallbackReading(sellerId), source: "fallback" };

  try {
    const res = await anthropic.messages.create({
      model: COACH_MODEL,
      max_tokens: 1024,
      system: systemBlocks(sellerId, now),
      tools: [COMPOSE_READING_TOOL],
      tool_choice: { type: "tool", name: "compose_reading" },
      messages: [
        { role: "user", content: `Write this week's reading for ${coachDateline(sellerId, now)}.` },
      ],
    });
    const block = res.content.find((b) => b.type === "tool_use");
    const reading = block?.type === "tool_use" ? toReading(block.input as ComposeInput) : null;
    if (!reading) return { reading: fallbackReading(sellerId), source: "fallback" };
    readingCache.set(key, reading);
    return { reading, source: "live" };
  } catch {
    return { reading: fallbackReading(sellerId), source: "fallback" };
  }
}

/** A single grounded answer to a grower's question, in the Coach's voice. */
export async function answerQuestion(sellerId: string, question: string, now: Date): Promise<CoachAnswer> {
  const anthropic = getClient();
  if (!anthropic) return { answer: fallbackAnswer(sellerId), source: "fallback" };

  try {
    const res = await anthropic.messages.create({
      model: COACH_MODEL,
      max_tokens: 512,
      system: systemBlocks(sellerId, now),
      messages: [{ role: "user", content: question }],
    });
    const text = res.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    if (!text) return { answer: fallbackAnswer(sellerId), source: "fallback" };
    return { answer: text, source: "live" };
  } catch {
    return { answer: fallbackAnswer(sellerId), source: "fallback" };
  }
}
