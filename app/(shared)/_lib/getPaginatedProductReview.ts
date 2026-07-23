import prisma from "@/lib/prisma";
import { PaginatedReview, Review } from "../_types/productReview";

export const LIMIT_PER_PAGE = 5;

export default async function getPaginatedProductReview(
  productId: string,
  userId: string | null,
  rating: number | null,
  page: number = 1,
  limit: number = LIMIT_PER_PAGE
): Promise<PaginatedReview> {
  const skip = (page - 1) * limit;

  const totalReviews = await prisma.review.count({
    where: { productId, rating: rating ?? undefined },
  });

  const totalPages = Math.ceil(totalReviews / limit);

  if (skip >= totalReviews) {
    return {
      reviews: [],
      pagination: {
        currentPage: page,
        limit,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  const rawReviews = await prisma.review.findMany({
    where: {
      productId,
      rating: rating ?? undefined,
    },
    skip,
    take: limit,
    select: {
      id: true,
      rating: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      helpfulCount: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      reviewHelpful: userId
        ? {
            where: { userId },
            select: { id: true },
          }
        : undefined,
    },
  });

  const reviews = rawReviews.map((review): Review => {
    const isLikedByUser = review.reviewHelpful?.length > 0 ?? false;
    return {
      content: review.content,
      helpfulCount: review.helpfulCount,
      id: review.id,
      isLikedByUser,
      rating: review.rating,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
      userName: review.user.name,
      userAvatar: review.user.image,
    };
  });

  return {
    reviews,
    pagination: {
      currentPage: page,
      limit,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
