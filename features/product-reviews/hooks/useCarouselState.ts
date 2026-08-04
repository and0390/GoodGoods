"use client";

import { CarouselApi } from "@/components/ui/carousel";
import React from "react";

export default function useCarouselState({
  skipTo = 0,
}: { skipTo?: number } = {}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    api.scrollTo(skipTo, true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, skipTo]);

  return {
    api,
    setApi,
    current,
    count,
  };
}
