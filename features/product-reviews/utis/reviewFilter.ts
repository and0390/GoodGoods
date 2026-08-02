export type ReviewRating =
  | "5-stars"
  | "4-stars"
  | "3-stars"
  | "2-stars"
  | "1-stars"
  | null;

export function getRatingFromFilter(rating: NonNullable<ReviewRating>) {
  switch (rating) {
    case "1-stars":
      return 1;
    case "2-stars":
      return 2;
    case "3-stars":
      return 3;
    case "4-stars":
      return 4;
    default:
      return 5;
  }
}
