import prisma from "@/lib/prisma";
import { RatingDistribution, ReviewSummary } from "../_types/productReview";

export default async function getProductReviewSummary(
  productId: string
): Promise<ReviewSummary> {
  const [aggregateRating, groupByRating] = await Promise.all([
    prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { _all: true },
    }),
    prisma.review.groupBy({
      where: { productId },
      by: ["rating"],
      _count: { _all: true },
    }),
  ]);

  const ratingDistribution = groupByRating.reduce<RatingDistribution>(
    (acc, item) => {
      acc[item.rating as keyof RatingDistribution] = item._count._all;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  return {
    avgRating: aggregateRating._avg.rating ?? 0,
    totalReviews: aggregateRating._count._all,
    ratingDistribution,
  };
}
