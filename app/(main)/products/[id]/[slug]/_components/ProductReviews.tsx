import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  MessageCircleMore,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import "server-only";
import prisma from "@/lib/prisma";
import { Distribution, Rating, Review } from "@/app/(shared)/_types/review";
import maskName from "@/lib/maskName";
import { cn } from "@/lib/utils";
import ThumbsUpButton from "./ThumbsUpButton";

// ==========================================
// 💎 REALISTIC HARDCODED DATA
// ==========================================
const MOCK_REVIEWS_SUMMARY = {
  averageRating: 4.7,
  totalReviews: 18,
  distribution: {
    5: 12, // 12 people gave 5 stars
    4: 4, // 4 people gave 4 stars
    3: 1, // 1 person gave 3 stars
    2: 1, // 1 person gave 2 stars
    1: 0, // 0 people gave 1 star
  },
};

const MOCK_REVIEWS_LIST = [
  {
    id: "rev-001",
    userName: "Alex Harrison",
    rating: 5,
    date: "July 12, 2026",
    comment:
      "Absolutely incredible quality! The Cotton Combed fabric feels premium, heavy but breathable. The oversized fit is perfectly cut—not just baggy, but structurally draped. Will definitely order in other colors.",
  },
  {
    id: "rev-002",
    userName: "Sarah Jenkins",
    rating: 5,
    date: "July 08, 2026",
    comment:
      "Exceeded my expectations. The stitching is tight and professional, completely lining up with luxury marketplace standards. Took it through the wash twice already and zero shrinkage or fading.",
  },
  {
    id: "rev-003",
    userName: "Michael Chen",
    rating: 4,
    date: "June 29, 2026",
    comment:
      "Super comfortable for everyday wear. Dropped one star only because shipping took an extra day, but the product itself is flawless. Highly recommend following the size chart closely!",
  },
  {
    id: "rev-004",
    userName: "Emma Watson",
    rating: 2,
    date: "June 15, 2026",
    comment:
      "The material quality is fantastic, but the oversized cut runs way too big for my frame. Make sure to size down if you prefer a more traditional standard fit.",
  },
];

const Stars = ({
  rating,
  className,
  ...props
}: { rating: number } & React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex items-center space-x-0.5", className)} {...props}>
      {Array.from({ length: 5 }).map((_, index) => (
        <React.Fragment key={index}>
          {index < Math.round(rating) ? (
            <FaStar className="size-4 fill-current text-amber-500" />
          ) : (
            <FaRegStar className="size-4 text-muted-foreground/30" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ==========================================
// 🛠️ FRONTEND UI COMPONENT
// ==========================================

const getReviewsByProductId = async (
  productId: string,
  userId: string | null
): Promise<Rating> => {
  const [rawReviews, reviewsAggr] = await Promise.all([
    prisma.review.findMany({
      where: { productId },
      select: {
        content: true,
        id: true,
        updatedAt: true,
        helpfulCount: true,
        rating: true,
        reviewHelpful: userId
          ? {
              where: { userId },
              select: {
                userId: true,
              },
            }
          : false,
        user: {
          select: {
            name: true,
          },
        },
      },
      take: 5,
    }),
    prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { id: true },
    }),
  ]);

  const reviews = rawReviews.map((rawReview): Review => {
    const isThumbsUp = rawReview.reviewHelpful?.length > 0 ?? false;

    return {
      id: rawReview.id,
      isThumbsUp,
      content: rawReview.content,
      rating: rawReview.rating,
      updatedAt: rawReview.updatedAt,
      userName: rawReview.user.name,
      helpfulCount: rawReview.helpfulCount,
    };
  });

  const reviewCount = reviewsAggr._count.id ?? 0;
  const avgRating = reviewsAggr._avg.rating
    ? parseFloat(reviewsAggr._avg.rating.toFixed(1))
    : 0;

  const distribution: Distribution = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating as keyof Distribution]++;
    }
  });

  return {
    distribution: distribution,
    avgRating,
    reviewCount,
    reviews: reviews,
  };
};

type ProductReviewsProps = {
  productId: string;
  isAuthenticated: boolean;
  userId: string | null;
};

export default async function ProductReviews({
  productId,
  isAuthenticated,
  userId,
}: ProductReviewsProps) {
  //   const { averageRating, totalReviews, distribution } = MOCK_REVIEWS_SUMMARY;

  const { avgRating, distribution, reviews, reviewCount } =
    await getReviewsByProductId(productId, userId);
  const hasReviews = reviewCount > 0;

  // Helper function to render star layouts

  return (
    <div className="w-full bg-card px-10 py-8 select-none">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Product Ratings</h3>
      </div>

      {/* 📊 SUMMARY ROW PANEL */}
      <div className="mb-5 grid grid-cols-1 gap-6 border border-border bg-muted/20 p-6 md:grid-cols-3">
        {/* Left Side: Big Score Indicator */}
        <div className="flex flex-col items-center justify-center gap-1 pb-6 text-center md:pb-0">
          <div className="flex items-center gap-3">
            <FaStar className="size-8 fill-current text-amber-500" />

            <h4 className="text-4xl font-black tracking-tight text-foreground">
              {avgRating}
              <span className="text-base text-muted-foreground">/ 5.0</span>
            </h4>
          </div>

          <p className="text-sm text-muted-foreground">{reviewCount} Reviews</p>
        </div>

        {/* Right Side: Visual Progress Breakdown Bars */}
        <div className="grid grid-cols-2 grid-rows-3 justify-center gap-y-2.5 md:col-span-2">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = distribution[star];
            const percentage =
              reviewCount > 0 ? (count / reviewCount) * 100 : 0;

            return (
              <div key={star} className="flex items-center text-sm">
                {/* Label */}

                <div className="flex w-14 items-center justify-end gap-1.5 pr-3">
                  <FaStar className="size-3.5 fill-current text-amber-500" />
                  <span className="text-right font-medium text-muted-foreground">
                    {star}
                  </span>
                </div>

                {/* Track bar line container */}
                <div className="relative h-3 flex-1 overflow-hidden rounded-full border border-border/40 bg-muted">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Total Count Value */}
                <span className="w-10 pl-4 text-left font-light text-muted-foreground">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-5 no-scrollbar flex gap-3 overflow-x-auto">
        <ToggleGroup
          type="single"
          variant="outline"
          size="lg"
          defaultValue="All"
        >
          {["All", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Stars"].map(
            (text, index) => (
              <ToggleGroupItem value={text} key={index}>
                {text}
              </ToggleGroupItem>
            )
          )}
        </ToggleGroup>
      </div>

      {/* 💬 INDIVIDUAL CRITICS FEEDBACK LIST */}
      {hasReviews ? (
        <div className="flex w-full flex-col">
          {reviews.map((review) => (
            <div key={review.id} className="my-6 flex w-full items-start gap-3">
              <Avatar size="lg">
                <AvatarImage src={undefined} alt={undefined} />
                <AvatarFallback>{review.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <div className="mb-4 w-full space-y-3">
                  {/* Review Header (User Info & Date Meta) */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <p className="mb-1 text-xs font-semibold tracking-tight text-foreground">
                        {maskName(review.userName)}
                      </p>
                      <Stars rating={review.rating} className="mb-1.5" />
                      <span className="text-xs font-light tracking-wide text-muted-foreground">
                        {new Date(review.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Review Paragraph Comment Body */}
                  <p className="wrap-break-words max-w-4xl text-sm leading-relaxed font-normal text-muted-foreground">
                    {review.content}
                  </p>
                </div>
                <ThumbsUpButton
                  review={review}
                  isThumbsUp={review.isThumbsUp}
                  isAuthenticated={isAuthenticated}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-60 w-full flex-col items-center justify-center gap-4">
          <MessageSquareText className="size-10 text-primary" />
          <p className="text-base tracking-wide text-muted-foreground">
            There&apos;s no review yet, Be the first to share your thoughts!
          </p>
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
