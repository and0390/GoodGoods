import { getRatingFromFilter, ReviewRating } from "./reviewFilter";

export default function buildReviewParams({
  hasImages,
  hasReviews,
  page,
  rating,
  limit = 6,
}: {
  page: number;
  hasReviews: boolean;
  hasImages: boolean;
  rating: ReviewRating | null;
  limit?: number;
}) {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", limit.toString());

  if (hasImages) {
    params.set("withImages", "true");
  } else {
    params.set("withImages", "false");
  }

  if (hasReviews) {
    params.set("withReviews", "true");
  } else {
    params.set("withReviews", "false");
  }

  if (rating) {
    const numericRating = getRatingFromFilter(rating);
    params.set("rating", numericRating.toString());
  }

  return params.toString();
}
