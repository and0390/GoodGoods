import { ProductsWithCursor } from "@/app/(shared)/_types/product";
import "server-only";
import getAvgRatingFromProductIds from "../repository/getAvgRatingFromProductIds";
import getCategoryPromotionsGroupedById from "../repository/getCategoryPromotionsGroupedById";
import getProductsByCursor from "../repository/getProductsByCursor";
import dbRawProductsToPreview from "../utils/dbRawProductsToProductPreview";
import handleCursor from "../utils/handleCursor";
import getSummarizedTopCategories from "./getSummarizedTopCategories";
import getPopularProducts from "./getPopularProducts";
import { decodeCursor, encodeCursor } from "../utils/combinedCursor";
import { WHERE_ACTIVE_PROMOTIONS } from "../utils/promotionQuery";
import getDistinctCategoryIds from "../utils/categoryHierarchy";

export default async function getPersonalizedFeed({
  limit = 10,
  cursor,
  category,
  userId,
  anonymousId,
}: {
  limit?: number;
  cursor: string | null;
  category: string | null;
  userId: string | null;
  anonymousId: string | null;
}): Promise<ProductsWithCursor> {
  const { scores, topCategories, alreadyViewedProducts, hasEnoughData } =
    category
      ? {
          scores: {},
          topCategories: [],
          alreadyViewedProducts: [],
          hasEnoughData: false,
        }
      : await getSummarizedTopCategories(userId, anonymousId);

  const hasCategory = !!category;

  if (!hasCategory && !hasEnoughData) {
    return getPopularProducts({ category, limit, cursor, excludeIds: [] });
  }

  const PERSONALIZED_RATIO = topCategories.length < 3 ? 0.7 : 0.8;
  const personalizedCount = Math.round(limit * PERSONALIZED_RATIO);
  const popularCount = limit - personalizedCount;

  const { personalizedCursor, popularCursor } = decodeCursor(cursor);

  const rawProducts = await getProductsByCursor({
    cursor: personalizedCursor,
    where: {
      category: { id: { in: category ? [category] : topCategories } },
      id: { notIn: alreadyViewedProducts },
    },
    limit: personalizedCount,
  });

  const { items, nextCursor: newPersonalizedCursor } = handleCursor(
    rawProducts,
    personalizedCount
  );
  if (items.length === 0) return { products: [], nextCursor: null };

  const productIds = items.map((product) => product.id);

  const popularProducts = await getPopularProducts({
    category,
    limit: popularCount,
    cursor: popularCursor,
    excludeIds: productIds,
  });

  const allCategoryIds = getDistinctCategoryIds(
    rawProducts.map((rawProduct) => rawProduct.category)
  );

  const [categoryPromos, reviewAggregate] = await Promise.all([
    getCategoryPromotionsGroupedById({
      where: {
        category: { id: { in: allCategoryIds } },
        scope: "CATEGORY",
        ...WHERE_ACTIVE_PROMOTIONS,
      },
    }),
    getAvgRatingFromProductIds(productIds),
  ]);

  const suitableProducts = items
    .map((rawProduct) => {
      const categoryScore = scores[rawProduct.category.id] ?? 0;
      const popularityScore = Math.log1p(rawProduct.sold);
      const ratingScore = reviewAggregate[rawProduct.id] ?? 0;

      const W_CATEGORY = 0.5;
      const W_POPULARITY = 0.35;
      const W_RATING = 0.15;

      const finalScore =
        W_CATEGORY * categoryScore +
        W_POPULARITY * popularityScore +
        W_RATING * ratingScore;

      return { ...rawProduct, score: finalScore };
    })
    .sort((a, b) => b.score - a.score);

  const products = dbRawProductsToPreview({
    categoryPromos,
    products: suitableProducts,
    reviewAggregate,
  });
  return {
    products: [...products, ...popularProducts.products],
    nextCursor: encodeCursor({
      personalizedCursor: newPersonalizedCursor,
      popularCursor: popularProducts.nextCursor,
    }),
  };
}
