"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

type ImageWithSkeletonProps = {
  imageProps: ImageProps;
} & React.ComponentProps<"div">;

export default function ImageWithSkeleton({
  imageProps,
  className,
  ...props
}: ImageWithSkeletonProps) {
  const { onLoad, onError, ...rest } = imageProps;
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={cn("relative isolate", className)} {...props}>
      {!loaded && <Skeleton className="absolute inset-0 z-10" />}

      <Image
        {...rest}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
        className={cn(
          "transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
          rest.className
        )}
      />
    </div>
  );
}
