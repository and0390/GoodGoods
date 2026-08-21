import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { ReviewsWithPagination } from "@/app/(shared)/_types/productReview";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRatingFromFilter } from "../utils/reviewFilter";
import { reviewKeys } from "../utils/reviewKeys";
import { DEFAULT_STATE, ReviewState } from "../utils/reviewReducer";
import buildReviewParams from "../utils/buildReviewParams";
import shouldUseInitialData from "../utils/shouldHaveInitialData";

export default function useProductReviews({
  productId,
  filterState,
  initialData,
}: {
  productId: string;
  filterState: ReviewState;
  initialData: ReviewsWithPagination;
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

      return body as ReviewsWithPagination;
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
