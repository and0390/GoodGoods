import prisma from "@/lib/prisma";

export default async function getReviewAggregate(productId: string) {
  return prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { _all: true },
  });
}
