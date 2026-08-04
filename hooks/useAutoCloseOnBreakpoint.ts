"use client";

import React from "react";
import { useMediaQuery } from "usehooks-ts";

const BREAKPOINTS = {
  desktop: "1024px",
  mobile: "768px",
} as const;

type Breakpoints = keyof typeof BREAKPOINTS;

export default function useAutoCloseOnBreakpoint(
  open: boolean,
  onOpenChange: (open: boolean) => void,
  breakpoint: Breakpoints
) {
  const matches = useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]})`, {
    defaultValue: false,
    initializeWithValue: false,
  });

  React.useEffect(() => {
    if (matches && open) {
      onOpenChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);
}
