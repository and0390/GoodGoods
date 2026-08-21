"use client";

import { useMediaQuery } from "usehooks-ts";

export default function useIsDesktop({
  defaultValue = false,
}: {
  defaultValue?: boolean;
} = {}) {
  return useMediaQuery("(min-width: 1024px)", {
    defaultValue,
    initializeWithValue: false,
  });
}
