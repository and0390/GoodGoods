import { ReviewPaginationState } from "./reviewPaginationReducer";

export const reviewKeys = {
  all: ["products"] as const,

  product: (productId: string) => [...reviewKeys.all, productId] as const,

  reviews: (productId: string) =>
    [...reviewKeys.product(productId), "reviews"] as const,

  list: (productId: string, filterState: ReviewPaginationState) =>
    [...reviewKeys.reviews(productId), filterState] as const,
};
