import type { SeasonalItem } from "./types";

// "What's ripening this week" — Austin, late May, Zone 9a. Each card opens a
// real listing; all four genuinely peak in May (peakMonths includes 5), so the
// Home rail stays honest with the Day-4 seasonal work.
export const seasonalItems: SeasonalItem[] = [
  {
    id: "peaches",
    name: "Peaches",
    where: "Lockhart",
    price: "$4 / lb",
    gradient: ["#E8927C", "#C46A4F"],
    listingId: "l-lock-peaches", // peakMonths [5,6,7]
  },
  {
    id: "cherry-tomatoes",
    name: "Cherry tomatoes",
    where: "East Austin",
    price: "$5 / pt",
    gradient: ["#C46A4F", "#8B3A28"],
    listingId: "l-cherry-tomatoes", // peakMonths [5,6,7,8,9]
  },
  {
    id: "sweet-basil",
    name: "Sweet basil",
    where: "East Austin",
    price: "$3 / bunch",
    gradient: ["#74B5A1", "#1C664D"],
    listingId: "l-miras-basil", // peakMonths [5,6,7,8,9]
  },
  {
    id: "spring-onions",
    name: "Spring onions",
    where: "Round Rock",
    price: "$2 / bunch",
    gradient: ["#9CE5D0", "#509982"],
    listingId: "l-rr-onions", // peakMonths [2,3,4,5]
  },
];
