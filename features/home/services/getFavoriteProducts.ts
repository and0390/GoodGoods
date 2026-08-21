import { FavoriteProducts } from "@/app/(shared)/_types/product";
import { getTopCategoryWithPromotion } from "@/app/generated/prisma/sql/getTopCategoryWithPromotion";
import prisma from "@/lib/prisma";
import "server-only";

export default async function getFavoriteProducts(limit: number) {
  const productsRaw = await prisma.$queryRawTyped(
    getTopCategoryWithPromotion(limit)
  );

  const categoryIds = productsRaw.flatMap((p) => [
    p.category_id,
    p.parent_category_id,
    p.grandparent_category_id,
  ]);

  // console.log("categoryIds", categoryIds);

  const categoryPromotion = await prisma.promotion.findMany({
    where: {
      scope: "CATEGORY",
      categoryId: { in: categoryIds },
      type: "PERCENTAGE",
      isActive: true,
      endDate: { gte: new Date() },
      startDate: { lte: new Date() },
      OR: [
        { usageLimit: null },
        { usedCount: { lt: prisma.promotion.fields.usageLimit } },
      ],
    },
    select: {
      categoryId: true,
      value: true,
      id: true,
      minPurchase: true,
      maxDiscount: true,
      name: true,
      type: true,
      source: true,
      category: { select: { name: true } },
    },
  });

  // const discountByCategory = categoryPromotion.reduce<{ id: string; name: string; }, number>

  const mostLikedProducts = productsRaw.map(
    ({
      product_name,
      product_id,
      imageUrls,
      slug,
      price,
      category_id,
      parent_category_id,
      grandparent_category_id,
      category_name,
    }): FavoriteProducts => {
      const productCategoryIds = new Set([
        category_id,
        parent_category_id,
        grandparent_category_id,
      ]);

      const promos = categoryPromotion.filter(
        (promo) => promo.categoryId && productCategoryIds.has(promo.categoryId)
      );

      const highestDiscountPercent = promos.reduce((max, item) => {
        return Math.max(max, item.value);
      }, 0);

      return {
        id: product_id,
        imageUrl: imageUrls![0],
        name: product_name,
        basePrice: price,
        slug,
        categoryName: category_name,
        discountPercent: highestDiscountPercent,
      };
    }
  );

  return mostLikedProducts;
}
