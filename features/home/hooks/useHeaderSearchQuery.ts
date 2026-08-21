import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { PopularSearch, SearchQuery } from "@/app/(shared)/_types/search";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounceValue } from "usehooks-ts";

export default function useHeaderSearchQuery({ open }: { open: boolean }) {
  const [query, setQuery] = React.useState("");

  const [debouncedQuery] = useDebounceValue(query, 300);

  const isSearching = debouncedQuery.trim().length >= 1;

  const searchQuery = useQuery({
    queryKey: ["search-query", { query: debouncedQuery }],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();

      params.set("limit", "10");
      params.set("q", debouncedQuery);

      const { body } = await apiSchema.parse(
        await fetcher.get(`/api/search/?${params.toString()}`, { signal })
      );
      return body as SearchQuery;
    },
    staleTime: 0,
    gcTime: 0,
    enabled: isSearching && open,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    placeholderData: keepPreviousData,
  });

  const popularSearchQuery = useQuery({
    queryKey: ["search-query", "popular"],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();
      params.set("limit", "8");

      const { body } = await apiSchema.parse(
        await fetcher.get(`/api/search/popular/?${params.toString()}`, {
          signal,
        })
      );

      return body as PopularSearch[];
    },
    staleTime: 0,
    gcTime: 0,
    enabled: open && !isSearching,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  const searchItems = React.useMemo(() => {
    const products = searchQuery.data?.products ?? [];
    const categories = searchQuery.data?.categories ?? [];
    const resultIsEmpty = products.length === 0 && categories.length === 0;

    if (isSearching && resultIsEmpty) {
      return [
        {
          value: "Product",
          items: [{ id: "1", name: `Search product "${query}"` }],
        },
        {
          value: "Category",
          items: [{ id: "2", name: `Search category "${query}"` }],
        },
      ];
    }

    return [
      { value: "Product", items: products },
      { value: "Category", items: categories },
    ].filter((item) => item.items.length > 0);
  }, [searchQuery.data, isSearching, query]);

  return {
    searchQuery,
    popularSearchQuery,
    query,
    setQuery,
    searchItems,
    isSearching,
  };
}
