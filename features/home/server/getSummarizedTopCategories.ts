import prisma from "@/lib/prisma";
import "server-only";

export default async function getSummarizedTopCategories(
  userId: string | null,
  anonymousId: string | null,
  limit = 50,
  minViewThreshold = 3
) {
  const views = await prisma.userProductView.findMany({
    where: userId ? { userId } : { anonymousId: anonymousId ?? undefined },
    include: { product: { select: { categoryId: true } } },
    take: limit,
    orderBy: { viewedAt: "desc" },
  });

  if (views.length < minViewThreshold) {
    return {
      hasEnoughData: false,
      topCategories: [],
      scores: {} as Record<string, number>,
      alreadyViewedProducts: views.map(({ productId }) => productId),
    };
  }

  const categoryScores: Record<string, number> = {};

  for (const view of views) {
    const catId = view.product.categoryId;
    const daysAgo =
      (Date.now() - view.viewedAt.getTime()) / (1000 * 60 * 60 * 24);
    const recencyWeight = Math.max(0, 1 - daysAgo / 14); // 14 days
    categoryScores[catId] = (categoryScores[catId] ?? 0) + recencyWeight;
  }

  return {
    hasEnoughData: true,
    topCategories: Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([id]) => id),
    scores: categoryScores,
    alreadyViewedProducts: views.map(({ productId }) => productId),
  };
}
