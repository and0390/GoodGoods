import { PaginatedReview, Review } from "@/app/(shared)/_types/productReview";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { executeSafeAction } from "@/lib/safeTransition";
import { InfiniteData, useMutation } from "@tanstack/react-query";
import toggleThumbsUp from "../../products/actions/toggleThumbsUp";
import { reviewKeys } from "../utis/reviewKeys";
import { ReviewState } from "../utis/reviewReducer";

const toggleReviewHelpful = (reviews: Review[], reviewId: string) => {
  return reviews.map((review) => {
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
};

export default function useThumbsUp({
  productId,
  filterState,
}: {
  productId: string;
  filterState: ReviewState;
}) {
  const queryKey = reviewKeys.list(productId, filterState);
  return useMutation({
    onMutate: async (reviewId, context) => {
      await context.client.cancelQueries({
        queryKey,
      });

      const previousQueries = context.client.getQueriesData<
        PaginatedReview | InfiniteData<PaginatedReview, number>
      >({ queryKey: reviewKeys.reviews(productId) });

      context.client.setQueriesData<
        PaginatedReview | InfiniteData<PaginatedReview, number>
      >({ queryKey: reviewKeys.reviews(productId) }, (oldData) => {
        if (!oldData) return oldData;

        if ("pages" in oldData) {
          return {
            ...oldData,
            pages: oldData.pages.map((item) => ({
              ...item,
              reviews: toggleReviewHelpful(item.reviews, reviewId),
            })),
          };
        }

        return {
          ...oldData,
          reviews: toggleReviewHelpful(oldData.reviews, reviewId),
        };
      });

      return { previousQueries, reviewId };
    },
    mutationFn: async (reviewId: string) => {
      return await executeSafeAction(toggleThumbsUp(reviewId));
    },
    onSuccess: (res, reviewId, onMutateResult, context) => {
      context.client.setQueriesData<
        PaginatedReview | InfiniteData<PaginatedReview, number>
      >({ queryKey: reviewKeys.reviews(productId) }, (oldData) => {
        if (!oldData) return oldData;

        if ("pages" in oldData) {
          return {
            ...oldData,
            pages: oldData.pages.map((item) => ({
              ...item,
              reviews: item.reviews.map((review) => {
                const isCurrentReview = review.id === reviewId;
                return {
                  ...review,
                  isLikedByUser: isCurrentReview
                    ? res.isLikedByUser
                    : review.isLikedByUser,
                  helpfulCount: isCurrentReview
                    ? res.helpfulCount
                    : review.helpfulCount,
                };
              }),
            })),
          };
        }

        return {
          ...oldData,
          reviews: oldData.reviews.map((review) => {
            const isCurrentReview = review.id === reviewId;
            return {
              ...review,
              isLikedByUser: isCurrentReview
                ? res.isLikedByUser
                : review.isLikedByUser,
              helpfulCount: isCurrentReview
                ? res.helpfulCount
                : review.helpfulCount,
            };
          }),
        };
      });
      // }
    },
    onError: (err, newReview, onMutateResult, context) => {
      console.warn(err);

      onMutateResult?.previousQueries.forEach(([queryKey, data]) => {
        context.client.setQueryData(queryKey, data);
      });

      toastWithButton({
        type: "error",
        message: "Failed to give a thumbs up. Please try again later.",
      });
    },
  });
}
