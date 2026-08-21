"use client";

import { Review } from "@/app/(shared)/_types/productReview";
import { Button } from "@/components/ui/button";
import {
  Carousel,
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import useAutoCloseOnBreakpoint from "@/hooks/useAutoCloseOnBreakpoint";
import maskName from "@/lib/maskName";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import { Ellipsis } from "lucide-react";
import React from "react";
import ButtonPrimitive from "../../../components/ui/ButtonPrimitive";
import HelpfulButton from "../../products/components/HelpfulButton";
import { PortalContainerProvider } from "../context/PortalContainerContext";
import useCarouselState from "../hooks/useCarouselState";
import formatDate from "../utils/formatDate";
import { ReviewState } from "../utils/reviewReducer";
import ImageWithSkeleton from "./ImageWithSkeleton";
import RatingStars from "./RatingStars";

type ReviewDetailModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  current: number;
  review: Review;
  filterState: ReviewState;
  isAuthenticated: boolean;
  productId: string;
};

export default function ReviewDetailModal({
  current,
  filterState,
  isAuthenticated,
  open,
  productId,
  review,
  setOpen,
}: ReviewDetailModalProps) {
  const isMobile = useIsMobile();

  if (!isMobile)
    return (
      <ReviewDetailDialog
        current={current}
        filterState={filterState}
        isAuthenticated={isAuthenticated}
        open={open}
        productId={productId}
        review={review}
        setOpen={setOpen}
      />
    );

  return (
    <ReviewDetailDrawer
      current={current}
      filterState={filterState}
      isAuthenticated={isAuthenticated}
      open={open}
      productId={productId}
      review={review}
      setOpen={setOpen}
    />
  );
}

type ReviewDetailDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  current: number;
  review: Review;
  filterState: ReviewState;
  isAuthenticated: boolean;
  productId: string;
};

function ReviewDetailDialog({
  open,
  setOpen,
  current: skipTo,
  review,
  filterState,
  isAuthenticated,
  productId,
}: ReviewDetailDialogProps) {
  const { current, setApi, api } = useCarouselState({ skipTo });

  useAutoCloseOnBreakpoint(open, setOpen, "mobile");

  return (
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
              const isCurrentIndex = index === current;
              return (
                <ButtonPrimitive
                  onClick={() => api?.scrollTo(index)}
                  key={index}
                  className={cn(
                    "relative border border-border bg-transparent p-0 hover:bg-transparent",
                    isCurrentIndex && "border-primary"
                  )}
                >
                  <ImageWithSkeleton
                    imageProps={{
                      width: 64,
                      height: 64,
                      src: url,
                      alt: `Photo ${index + 1} from ${review.userName}'s review`,
                      className: "size-16 flex-none object-fill",
                    }}
                  />
                </ButtonPrimitive>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ReviewDetailDrawerProps = {
  current: number;
  setOpen: (open: boolean) => void;
  open: boolean;
  review: Review;
  filterState: ReviewState;
  isAuthenticated: boolean;
  productId: string;
};

function ReviewDetailDrawer({
  current: skipTo,
  setOpen,
  open,
  review,
  filterState,
  isAuthenticated,
  productId,
}: ReviewDetailDrawerProps) {
  const { current, setApi, count } = useCarouselState({ skipTo });

  useAutoCloseOnBreakpoint(open, setOpen, "desktop");

  const [portalContainer, setPortalContainer] =
    React.useState<HTMLElement | null>(null);

  return (
    <Drawer direction="bottom" onOpenChange={setOpen} open={open}>
      <DrawerContent
        className="dark z-100 mt-0! h-dvh max-h-dvh! rounded-none!"
        ref={setPortalContainer}
      >
        <PortalContainerProvider container={portalContainer}>
          <DrawerHeader className="relative">
            <DrawerClose asChild className="absolute top-2 left-2">
              <Button variant="ghost" size="icon-lg" className="size-9">
                <IconArrowLeft className="size-full" />
              </Button>
            </DrawerClose>
            <DrawerTitle>Review Detail</DrawerTitle>
            <DrawerDescription className="sr-only">
              Review Detail Drawer
            </DrawerDescription>
            <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm border border-border p-1 text-base leading-none font-normal">
              {current + 1}/{count}
            </span>
          </DrawerHeader>
          <div className="flex size-full flex-col">
            <Carousel
              className="size-full [&>[data-slot=carousel-content]]:size-full"
              setApi={setApi}
            >
              <CarouselContent className="-ml-0 size-full">
                {review.imageUrls.map((url, index) => {
                  return (
                    <CarouselItem className="pl-0" key={index}>
                      <ImageWithSkeleton
                        className="h-full w-full"
                        imageProps={{
                          fill: true,
                          src: url,
                          alt: `Photo ${index + 1} from ${review.userName}'s review`,
                          className: "size-full flex-none object-contain",
                          sizes: "100vw",
                        }}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
          <DrawerFooter className="absolute inset-x-0 bottom-0 flex-row bg-card/30">
            <div className="flex flex-col gap-1">
              <RatingStars rating={review.rating} />
              <p className="text-sm font-normal text-card-foreground">
                {review.content}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 p-2">
              <HelpfulButton
                className={cn(
                  "m-0 flex-col items-center [&>p]:text-popover-foreground [&>svg]:size-8 [&>svg]:text-popover-foreground",
                  review.isLikedByUser && "[&>svg]:fill-popover-foreground"
                )}
                filterState={filterState}
                isAuthenticated={isAuthenticated}
                isLikedByUser={review.isLikedByUser}
                productId={productId}
                review={review}
              />
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex flex-col items-center"
                  aria-label="Review options"
                >
                  <Ellipsis className="size-8 rotate-90" />
                  More
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-100" align="end">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DrawerFooter>
        </PortalContainerProvider>
      </DrawerContent>
    </Drawer>
  );
}
