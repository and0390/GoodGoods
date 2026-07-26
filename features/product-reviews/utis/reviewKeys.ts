import { FilterValue } from "./reviewFilter";

export const reviewKeys = {
  all: ["products"] as const,

  product: (productId: string) => [...reviewKeys.all, productId] as const,

  reviews: (productId: string) =>
    [...reviewKeys.product(productId), "reviews"] as const,

  list: (
    productId: string,
    params: {
      filter: FilterValue;
      page: number;
    }
  ) => [...reviewKeys.reviews(productId), params] as const,
};
