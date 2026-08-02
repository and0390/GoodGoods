import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRatingFromFilter } from "../utis/reviewFilter";
import { reviewKeys } from "../utis/reviewKeys";
import {
  DEFAULT_STATE,
  ReviewPaginationState,
} from "../utis/reviewPaginationReducer";

export default function useProductReviews({
  productId,
  filterState,
  initialData,
}: {
  productId: string;
  filterState: ReviewPaginationState;
  initialData: PaginatedReview;
}) {
  const { hasImages, hasText, page, rating } = filterState;

  const hasInitialValue =
    rating === DEFAULT_STATE.rating &&
    hasImages === DEFAULT_STATE.hasImages &&
    page === DEFAULT_STATE.page &&
    hasText === DEFAULT_STATE.hasText;

  return useQuery({
    queryKey: reviewKeys.list(productId, filterState),

    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();

      params.set("page", page.toString());

      if (hasImages) {
        params.set("withImages", "true");
      } else {
        params.set("withImages", "false");
      }

      if (rating) {
        const numericRating = getRatingFromFilter(rating);
        params.set("rating", numericRating.toString());
      }

      const { body } = apiSchema.parse(
        await fetcher.get(`/api/products/${productId}/reviews?${params}`, {
          signal,
        })
      );

      return body as PaginatedReview;
    },
    initialData: hasInitialValue ? initialData : undefined,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  });
}
