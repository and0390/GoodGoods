import { Review } from "@/app/(shared)/_types/productReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import maskName from "@/lib/maskName";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import React from "react";
import ButtonPrimitive from "../../../components/ui/ButtonPrimitive";
import HelpfulButton from "../../products/components/HelpfulButton";
import formatDate from "../utis/formatDate";
import { ReviewState } from "../utis/reviewReducer";
import ImageWithSkeleton from "./ImageWithSkeleton";
import RatingStars from "./RatingStars";
import ReviewDetailModal from "./ReviewDetailModal";

type ProductReviewCardProps = {
  review: Review;
  productId: string;
  filterState: ReviewState;
  isAuthenticated: boolean;
  className?: string;
};

export default function ProductReviewCard({
  review,
  filterState,
  productId,
  isAuthenticated,
  className,
}: ProductReviewCardProps) {
  const [modalState, setModalState] = React.useState({
    openDialog: false,
    current: 0,
  });

  const setModalOpen = (open: boolean) =>
    setModalState((prev) => ({
      ...prev,
      openDialog: open,
    }));

  return (
    <article
      className={cn("flex flex-col items-start gap-3 p-3 md:p-0", className)}
    >
      <header className="flex w-full justify-between">
        <div className="flex flex-col items-start gap-1 md:flex-row">
          <div className="flex items-center gap-2.5 md:gap-3">
            <Avatar className="size-8 md:size-10">
              <AvatarImage
                src={review.userAvatar ?? undefined}
                alt={review.userName}
              />
              <AvatarFallback>{review.userName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0.5">
              <h3 className="text-xs font-semibold text-card-foreground md:font-normal">
                {maskName(review.userName)}
              </h3>
              {/* Rendered in larger Screen */}
              <RatingStars className="hidden md:flex" rating={review.rating} />

              <time
                dateTime={review.updatedAt}
                className="hidden text-xs font-normal text-muted-foreground md:inline"
              >
                {formatDate(review.updatedAt)}
              </time>
            </div>
          </div>

          {/* Rendered in Smaller Screen */}
          <RatingStars className="flex md:hidden" rating={review.rating} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="size-[18px] md:size-5"
            aria-label="Review options"
          >
            <Ellipsis className="size-full md:rotate-90" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-105 md:z-50">
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <p className="text-sm font-normal text-card-foreground">
        {review.content}
      </p>

      {review.imageUrls.length > 0 && (
        <div className="flex gap-2">
          {review.imageUrls.slice(0, 4).map((url, index) => {
            const totalImages = review.imageUrls.length;
            const shouldShowOverlay = index === 3 && totalImages > 4;
            const remainingCount = totalImages - 3;
            return (
              <div key={index} className="relative">
                <ButtonPrimitive
                  key={index}
                  onClick={() =>
                    setModalState({ openDialog: true, current: index })
                  }
                  className="size-16 cursor-zoom-in border-0 md:size-19"
                  asChild
                >
                  <ImageWithSkeleton
                    imageProps={{
                      fill: true,
                      sizes: "(min-width: 768px) 76px, 64px",
                      src: url,
                      alt: `${review.userName}'s review photo ${index + 1}`,
                      className: "object-cover",
                    }}
                  />
                </ButtonPrimitive>
                {shouldShowOverlay && (
                  <>
                    <span className="absolute inset-0 z-10 flex items-center justify-center text-xs font-normal text-white">
                      +{remainingCount}
                    </span>
                    <div className="absolute inset-0 z-5 bg-black/40" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ReviewDetailModal
        current={modalState.current}
        open={modalState.openDialog}
        setOpen={setModalOpen}
        review={review}
        filterState={filterState}
        isAuthenticated={isAuthenticated}
        productId={productId}
      />
      <HelpfulButton
        filterState={filterState}
        isAuthenticated={isAuthenticated}
        isLikedByUser={review.isLikedByUser}
        productId={productId}
        review={review}
      />
    </article>
  );
}
