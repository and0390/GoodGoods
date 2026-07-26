import { Review } from "@/app/(shared)/_types/productReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import maskName from "@/lib/maskName";
import { cn } from "@/lib/utils";
import { Ellipsis, Star } from "lucide-react";
import React from "react";
import HelpfulButton from "../../products/components/HelpfulButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterValue } from "../utis/reviewFilter";
import formatDate from "../utis/formatDate";

const RatingStars = ({
  rating,
  className,
  ...props
}: { rating: number } & React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-[18px] text-rating md:size-3",
            index < Math.round(rating) && "fill-current"
          )}
        />
      ))}
    </div>
  );
};

type ProductReviewCardProps = {
  review: Review;
  productId: string;
  filter: FilterValue;
  page: number;
  isAuthenticated: boolean;
};

export default function ProductReviewCard({
  review,
  filter,
  page,
  productId,
  isAuthenticated,
}: ProductReviewCardProps) {
  return (
    <article className="flex flex-col items-start gap-3 p-3 md:p-0">
      <header className="flex w-full justify-between">
        <div className="flex flex-col items-start gap-1 md:flex-row">
          <div className="flex items-center gap-2.5 md:gap-3">
            <Avatar size="lg">
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <p className="text-sm font-normal text-card-foreground">
        {review.content}
      </p>

      <HelpfulButton
        filter={filter}
        isAuthenticated={isAuthenticated}
        isLikedByUser={review.isLikedByUser}
        page={page}
        productId={productId}
        review={review}
      />
    </article>
  );
}
