"use client";

import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { ProductsWithCursor } from "@/app/(shared)/_types/product";
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

type ProductInitialData = InfiniteData<ProductsWithCursor>;

type OptionsWithInitialData = {
  limit?: number;
  category: string;
  initialData: ProductInitialData;
};

type OptionsWithoutInitialData = {
  limit?: number;
  category: string;
  initialData?: ProductInitialData;
};

export function useHomeFeedQuery(
  options: OptionsWithInitialData
): DefinedUseInfiniteQueryResult<ProductInitialData>;

export function useHomeFeedQuery(
  options: OptionsWithoutInitialData
): UseInfiniteQueryResult<ProductInitialData>;

export function useHomeFeedQuery({
  initialData,
  limit = 20,
  category,
}: OptionsWithInitialData | OptionsWithoutInitialData):
  | DefinedUseInfiniteQueryResult<ProductInitialData>
  | UseInfiniteQueryResult<ProductInitialData> {
  return useInfiniteQuery({
    queryKey: ["home-feed", { category }],
    queryFn: async ({ signal, pageParam }) => {
      const params = new URLSearchParams();

      params.set("limit", limit.toString());
      params.set("category", category);

      if (pageParam) {
        params.set("cursor", String(pageParam));
      }

      const { body } = apiSchema.parse(
        await fetcher.get(`/api/products?${params.toString()}`, { signal })
      );

      return body as ProductsWithCursor;
    },
    initialPageParam: null as unknown as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    staleTime: 0,
    gcTime: Infinity,
    initialData,
    refetchOnWindowFocus: false,
  });
}
