import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRatingFromFilter } from "../utis/reviewFilter";
import { reviewKeys } from "../utis/reviewKeys";
import { DEFAULT_STATE, ReviewState } from "../utis/reviewReducer";
import buildReviewParams from "../utis/buildReviewParams";
import shouldUseInitialData from "../utis/shouldHaveInitialData";

export default function useProductReviews({
  productId,
  filterState,
  initialData,
}: {
  productId: string;
  filterState: ReviewState;
  initialData: PaginatedReview;
}) {
  const { hasImages, hasReviews, page, rating } = filterState;

  return useQuery({
    queryKey: reviewKeys.list(productId, filterState),

    queryFn: async ({ signal }) => {
      const params = buildReviewParams({
        hasImages,
        hasReviews,
        page,
        rating,
      });

      const { body } = apiSchema.parse(
        await fetcher.get(`/api/products/${productId}/reviews?${params}`, {
          signal,
        })
      );

      return body as PaginatedReview;
    },
    initialData: shouldUseInitialData({
      hasImages,
      hasReviews,
      rating,
      page,
    })
      ? initialData
      : undefined,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
}
