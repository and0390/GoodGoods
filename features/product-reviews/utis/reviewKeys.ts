import { ReviewState } from "./reviewReducer";

export const reviewKeys = {
  all: ["products"] as const,

  product: (productId: string) => [...reviewKeys.all, productId] as const,

  reviews: (productId: string) =>
    [...reviewKeys.product(productId), "reviews"] as const,
  infinite: (
    productId: string,
    filter: Pick<ReviewState, "hasImages" | "hasReviews" | "rating">
  ) => [...reviewKeys.reviews(productId), "infinite", filter],

  list: (productId: string, filter: ReviewState) =>
    [...reviewKeys.reviews(productId), filter] as const,
};
