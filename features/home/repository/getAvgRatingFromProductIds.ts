import prisma from "@/lib/prisma";
import "server-only";

export default async function getAvgRatingFromProductIds(productIds: string[]) {
  if (productIds.length === 0) return {};
  const reviewAggregate = await prisma.review.groupBy({
    where: { productId: { in: productIds } },
    by: ["productId"],
    _avg: {
      rating: true,
    },
  });
  return Object.fromEntries(
    reviewAggregate.map((item) => [item.productId, item._avg.rating ?? 0])
  );
}
