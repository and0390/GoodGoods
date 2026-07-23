export const FILTER_OPTIONS = [
  { name: "all", value: "all" },
  { name: "5 Stars", value: "5" },
  { name: "4 Stars", value: "4" },
  { name: "3 Stars", value: "3" },
  { name: "2 Stars", value: "2" },
  { name: "1 Stars", value: "1" },
] as const;

export type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];
