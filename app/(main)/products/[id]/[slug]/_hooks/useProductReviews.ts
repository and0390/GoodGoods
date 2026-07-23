import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FilterValue } from "../_lib/reviewFilter";
import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { reviewKeys } from "../_lib/reviewKeys";

export default function useProductReviews({
  productId,
  filter,
  page,
  initialData,
}: {
  productId: string;
  filter: FilterValue;
  page: number;
  initialData?: PaginatedReview;
}) {
  return useQuery({
    queryKey: reviewKeys.list(productId, { filter, page }),

    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();

      params.set("page", page.toString());

      if (filter !== "all") {
        params.set("rating", filter);
      }

      const { body } = apiSchema.parse(
        await fetcher.get(`/api/products/${productId}/reviews?${params}`, {
          signal,
        })
      );

      return body as PaginatedReview;
    },

    initialData: filter === "all" && page === 1 ? initialData : undefined,

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
}
