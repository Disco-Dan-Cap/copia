// Buyer ↔ seller correspondence — the relational layer. Threads read like short
// letters between people who share a real transaction, never a chat log. Each
// is tied (where it makes sense) to an order or a listing, so the conversation
// is woven into the catalog rather than floating beside it. Mira's four threads
// are seeded to echo the rest of the app: Priya's deer saga + the 6pm basil
// request from the order seed, Dana's thank-you, Tomás asking after the
// sold-out butter lettuce (whose reply speaks the listing's own seasonal line),
// and Will waiting on the heirlooms (the "coming soon" loop).

export interface Message {
  from: "seller" | "buyer";
  body: string;
  /** Days relative to today, like orders — keeps the transcript alive. */
  dayOffset: number;
  /** Optional clock time for the eyebrow, e.g. "8:42 AM". */
  time?: string;
}

export type ConversationContext =
  | { kind: "order"; orderId: string }
  | { kind: "listing"; listingId: string };

export interface Conversation {
  id: string;
  sellerId: string;
  /** Buyer display name, e.g. "Priya N." */
  buyer: string;
  /** What the letter's about — a subject, not a message preview. */
  subject: string;
  /** Links the thread to an order or listing for the single context line. */
  context?: ConversationContext;
  /** Seeded unread — drives the subtle terracotta dot until opened. */
  unread?: boolean;
  messages: Message[];
}

const MIRA = "miras-half-acre";

export const conversations: Conversation[] = [
  {
    id: "t-priya",
    sellerId: MIRA,
    buyer: "Priya N.",
    subject: "The basil meetup",
    context: { kind: "order", orderId: "o-mira-3" },
    unread: true,
    messages: [
      {
        from: "buyer",
        dayOffset: -26,
        body: "Random question — how do you keep the deer off the tomatoes? Mine got demolished last year.",
      },
      {
        from: "seller",
        dayOffset: -26,
        body: "Chicken wire on the low beds, and I let the cherries fend for themselves — too much reaching for too little, so the deer leave them alone. The big heirlooms get the fence.",
      },
      {
        from: "buyer",
        dayOffset: 0,
        time: "8:42 AM",
        body: "Can you do 6pm instead for the basil? Stuck at work till 5:30.",
      },
    ],
  },
  {
    id: "t-dana",
    sellerId: MIRA,
    buyer: "Dana R.",
    subject: "Saturday's eggs",
    context: { kind: "order", orderId: "o-mira-1" },
    messages: [
      {
        from: "buyer",
        dayOffset: -2,
        body: "Those eggs were still warm. And the basil you tucked in was perfect with the mozzarella — thank you.",
      },
      {
        from: "seller",
        dayOffset: -2,
        body: "That's the idea. Four hens working overtime this week.",
      },
    ],
  },
  {
    id: "t-tomas",
    sellerId: MIRA,
    buyer: "Tomás G.",
    subject: "The butter lettuce",
    context: { kind: "listing", listingId: "l-miras-lettuce" },
    messages: [
      {
        from: "buyer",
        dayOffset: -1,
        body: "Any butter lettuce this Saturday? Missed it last week.",
      },
      {
        from: "seller",
        dayOffset: -1,
        body: "Sold through, and that's it till fall — it bolts the second it turns hot. Back when the cool returns.",
      },
    ],
  },
  {
    id: "t-will",
    sellerId: MIRA,
    buyer: "Will C.",
    subject: "When the tomatoes come in",
    context: { kind: "listing", listingId: "l-miras-tomatoes" },
    messages: [
      {
        from: "buyer",
        dayOffset: -3,
        body: "Are the heirlooms ready yet? Came by in April and jumped the gun.",
      },
      {
        from: "seller",
        dayOffset: -3,
        body: "About two weeks out — the front bed's just starting to blush. I'll post a 'coming soon' so you don't miss them.",
      },
    ],
  },
];

function lastOffset(c: Conversation): number {
  return c.messages.length ? c.messages[c.messages.length - 1].dayOffset : -999;
}

/** A seller's conversations, most recent exchange first. */
export function conversationsFor(sellerId: string): Conversation[] {
  return conversations
    .filter((c) => c.sellerId === sellerId)
    .sort((a, b) => lastOffset(b) - lastOffset(a));
}

export function conversationById(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}

/** The thread linked to an order, if one exists (drives the Message button). */
export function conversationForOrder(orderId: string): Conversation | undefined {
  return conversations.find((c) => c.context?.kind === "order" && c.context.orderId === orderId);
}

export function conversationForBuyer(sellerId: string, buyer: string): Conversation | undefined {
  return conversations.find((c) => c.sellerId === sellerId && c.buyer === buyer);
}
