import { ReviewState } from "./reviewReducer";
import { productKeys } from "@/product/utils/productKeys";

export const reviewKeys = {
  reviews: (productId: string) =>
    [...productKeys.product(productId), "reviews"] as const,
  infinite: (
    productId: string,
    filter: Pick<ReviewState, "hasImages" | "hasReviews" | "rating">
  ) => [...reviewKeys.reviews(productId), "infinite", filter],

  list: (productId: string, filter: ReviewState) =>
    [...reviewKeys.reviews(productId), filter] as const,
};
