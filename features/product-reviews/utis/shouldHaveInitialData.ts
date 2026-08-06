import { DEFAULT_STATE, ReviewState } from "./reviewReducer";

export default function shouldUseInitialData({
  rating,
  page,
  hasImages,
  hasReviews,
}: { page?: number } & Pick<
  ReviewState,
  "hasImages" | "hasReviews" | "rating"
>) {
  return (
    (page === undefined || page === DEFAULT_STATE.page) &&
    rating === DEFAULT_STATE.rating &&
    hasImages === DEFAULT_STATE.hasImages &&
    hasReviews === DEFAULT_STATE.hasReviews
  );
}
