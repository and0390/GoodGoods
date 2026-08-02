"use client";

import { Review } from "@/app/(shared)/_types/productReview";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import maskName from "@/lib/maskName";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React from "react";
import HelpfulButton from "../../products/components/HelpfulButton";
import formatDate from "../utis/formatDate";
import { ReviewPaginationState } from "../utis/reviewPaginationReducer";
import ImageWithSkeleton from "./ImageWithSkeleton";
import RatingStars from "./RatingStars";
import ThumbnailButton from "./ThumbnailButton";

type ReviewDetailDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  current: number;
  review: Review;
  filterState: ReviewPaginationState;
  isAuthenticated: boolean;
  productId: string;
};

export default function ReviewDetailDialog({
  open,
  setOpen,
  current,
  review,
  filterState,
  isAuthenticated,
  productId,
}: ReviewDetailDialogProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageLoading, setImageLoading] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;

    api.scrollTo(current, true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="isolate w-max max-w-none!">
          <DialogHeader>
            <DialogTitle>Review Detail</DialogTitle>
            <DialogDescription className="sr-only">
              Review Detail dialog
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4">
            <Carousel className="size-[504px]" setApi={setApi}>
              <CarouselContent className="size-full">
                {review.imageUrls.map((url, index) => {
                  return (
                    <CarouselItem key={index}>
                      <ImageWithSkeleton
                        imageProps={{
                          width: 504,
                          height: 504,
                          src: url,
                          alt: `Photo ${index + 1} from ${review.userName}'s review`,
                          className:
                            "h-full aspect-square flex-none object-contain",
                        }}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="size-10" />
              <CarouselNext className="size-10" />
            </Carousel>

            <section className="flex w-[330px] shrink-0 flex-col">
              <header className="flex justify-between">
                <div className="flex flex-col items-start gap-1 md:flex-row">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-xs font-semibold text-card-foreground md:font-normal">
                        {maskName(review.userName)}
                      </h3>
                      {/* Rendered in larger Screen */}
                      <RatingStars
                        className="hidden md:flex"
                        rating={review.rating}
                      />
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="size-[18px] md:size-5"
                    aria-label="Review options"
                  >
                    <Ellipsis className="size-full md:rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-100" align="end">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>

              <p className="text-sm font-normal text-card-foreground">
                {review.content}
              </p>

              <div className="flex w-full items-end justify-between">
                <HelpfulButton
                  filterState={filterState}
                  isAuthenticated={isAuthenticated}
                  isLikedByUser={review.isLikedByUser}
                  productId={productId}
                  review={review}
                />

                <div className="flex items-center gap-1">
                  <time
                    dateTime={review.updatedAt}
                    className="hidden text-xs leading-none font-normal text-muted-foreground md:inline"
                  >
                    {formatDate(review.updatedAt)}
                  </time>
                  <span aria-hidden="true" className="leading-none">
                    &middot;
                  </span>
                  <span className="text-xs leading-none font-normal text-muted-foreground">
                    {review.userName}
                  </span>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-1">
              {review.imageUrls.map((url, index) => {
                const isCurrentIndex = index === currentIndex;
                return (
                  <ThumbnailButton
                    onClick={() => api?.scrollTo(index)}
                    key={index}
                    className={cn(
                      "relative border border-border bg-transparent p-0 hover:bg-transparent",
                      isCurrentIndex && "border-primary"
                    )}
                  >
                    {imageLoading && <Skeleton />}
                    <Image
                      width={64}
                      height={64}
                      src={url}
                      alt={`Photo ${index + 1} from ${review.userName}'s review`}
                      className="size-16 flex-none object-fill"
                      onLoadingComplete={() => setImageLoading(false)}
                    />
                  </ThumbnailButton>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
