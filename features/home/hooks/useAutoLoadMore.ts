"use client";

import React from "react";
import { useInView } from "react-intersection-observer";

export default function useAutoLoadMore({
  batchSize,
  hasNextPage,
  isFetchingNextPage,
  pageCount,
  fetchNextPage,
}: {
  batchSize: number;
  pageCount: number;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const autoScrollEnabled = pageCount % batchSize !== 0;

  const { ref, inView } = useInView({
    skip: !autoScrollEnabled,
    rootMargin: "100px 0px 0px 0px",
  });

  React.useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return { ref, autoScrollEnabled };
}
