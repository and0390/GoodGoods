import "server-only";
import getAvgRatingFromProductIds from "../repository/getAvgRatingFromProductIds";
import getCategoryPromotionsGroupedById from "../repository/getCategoryPromotionsGroupedById";
import getProductsByCursor from "../repository/getProductsByCursor";
import dbRawProductsToPreview from "../utils/dbRawProductsToProductPreview";
import handleCursor from "../utils/handleCursor";
import getDistinctCategoryIds from "../utils/categoryHierarchy";
import { WHERE_ACTIVE_PROMOTIONS } from "../utils/promotionQuery";

export default async function getPopularProducts({
  category,
  excludeIds,
  limit,
  cursor,
}: {
  excludeIds: string[];
  category: string | null;
  limit: number;
  cursor: string | null;
}) {
  const rawProducts = await getProductsByCursor({
    where: { categoryId: category ?? undefined, id: { notIn: excludeIds } },
    cursor,
    limit,
    orderBy: [{ sold: "desc" }, { favoriteCount: "desc" }],
  });

  const { items, nextCursor } = handleCursor(rawProducts, limit);
  if (items.length === 0) return { products: [], nextCursor: null };

  const allCategoryIds = getDistinctCategoryIds(
    rawProducts.map((rawProduct) => rawProduct.category)
  );

  const productIds = rawProducts.map((product) => product.id);
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

  const products = dbRawProductsToPreview({
    categoryPromos,
    products: rawProducts,
    reviewAggregate,
  });

  return {
    products,
    nextCursor,
  };
}
