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

/**
 * Updated Version
 */

export function ImageWithSkeleton2({
  className,
  onError,
  onLoad,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  return (
    <div
      data-slot="image-container"
      className={cn("relative isolate", props.fill && "size-full")}
    >
      {!loaded && <Skeleton className="absolute inset-0 z-10" />}
      {isError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-secondary">
          <p className="text-base font-bold text-muted-foreground/30">
            GoodGoods
          </p>
        </div>
      )}

      <Image
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsError(true);
          setLoaded(true);
          onError?.(event);
        }}
        className={cn(
          "transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
