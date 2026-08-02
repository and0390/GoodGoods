"use client";

import { useMediaQuery } from "usehooks-ts";

export default function useLg() {
  return useMediaQuery("(min-width: 1024px)", {
    defaultValue: false,
    initializeWithValue: false,
  });
}
