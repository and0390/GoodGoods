import { useMutation } from "@tanstack/react-query";
import { reviewKeys } from "../_lib/reviewKeys";
import { FilterValue } from "../_lib/reviewFilter";
import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import toggleThumbsUp from "../_action/toggleThumbsUp";
import { toastWithButton } from "@/components/ui/toastWithButton";

export default function useThumbsUp({
  productId,
  filter,
  page,
}: {
  productId: string;
  filter: FilterValue;
  page: number;
}) {
  const queryKey = reviewKeys.list(productId, { filter, page });
  return useMutation({
    onMutate: async (reviewId, context) => {
      await context.client.cancelQueries({
        queryKey,
      });
      const prevReview = context.client.getQueryData<PaginatedReview>(queryKey);

      context.client.setQueryData<PaginatedReview>(queryKey, (data) => {
        if (!data) return data;

        const updatedReviews = data.reviews.map((review) => {
          const isCurrentReview = review.id === reviewId;

          return {
            ...review,
            isLikedByUser: isCurrentReview
              ? !review.isLikedByUser
              : review.isLikedByUser,
            helpfulCount: isCurrentReview
              ? review.isLikedByUser
                ? review.helpfulCount - 1
                : review.helpfulCount + 1
              : review.helpfulCount,
          };
        });

        return {
          ...data,
          reviews: updatedReviews,
        };
      });

      return { prevReview, reviewId };
    },
    mutationFn: async (reviewId: string) => {
      return await toggleThumbsUp(reviewId);
    },
    onSuccess: (res, reviewId, onMutateResult, context) => {
      const { data, serverError } = res;
      if (serverError) {
        toastWithButton({
          message: serverError,
          type: "error",
        });
      } else if (data) {
        context.client.setQueryData<PaginatedReview>(queryKey, (oldReview) => {
          if (!oldReview) return oldReview;

          const updatedReviews = oldReview.reviews.map((review) => {
            const isCurrentReview = review.id === reviewId;
            return {
              ...review,
              isLikedByUser: isCurrentReview
                ? data.isLikedByUser
                : review.isLikedByUser,
              helpfulCount: isCurrentReview
                ? data.helpfulCount
                : review.helpfulCount,
            };
          });

          return {
            ...oldReview,
            reviews: updatedReviews,
          };
        });
      }
    },
    onError: (err, newReview, onMutateResult, context) => {
      context.client.setQueryData(
        ["products", productId, "reviews", { filter, page }],
        onMutateResult?.prevReview
      );
    },
  });
}
