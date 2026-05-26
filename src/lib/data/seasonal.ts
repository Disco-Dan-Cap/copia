import type { SeasonalItem } from "./types";

// "What's ripening this week" — Austin, late May, Zone 9a.
export const seasonalItems: SeasonalItem[] = [
  {
    id: "peaches",
    name: "Peaches",
    where: "Lockhart",
    price: "$4 / lb",
    gradient: ["#E8927C", "#C46A4F"],
  },
  {
    id: "cherry-tomatoes",
    name: "Cherry tomatoes",
    where: "East Austin",
    price: "$5 / pt",
    gradient: ["#C46A4F", "#8B3A28"],
  },
  {
    id: "sweet-basil",
    name: "Sweet basil",
    where: "Dripping Springs",
    price: "$3 / bunch",
    gradient: ["#74B5A1", "#1C664D"],
  },
  {
    id: "cucumbers",
    name: "Cucumbers",
    where: "Round Rock",
    price: "$2 / lb",
    gradient: ["#9CE5D0", "#509982"],
  },
];
