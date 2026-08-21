import { ProductDetail } from "@/app/(shared)/_types/product";
import prisma from "@/lib/prisma";
import "server-only";
import getProductBreadcrumbs from "./getProductBreadCrumbs";
import {
  WHERE_ACTIVE_PROMOTIONS,
  MIN_PROMOTION_FIELDS_TO_COMPUTE,
} from "@/features/home/utils/promotionQuery";
import getDistinctCategoryIds, {
  getCategoryHierarchyIds,
} from "@/features/home/utils/categoryHierarchy";
import getCategoryPromotionsGroupedById from "@/features/home/repository/getCategoryPromotionsGroupedById";
import sortPromotion from "../utils/sortPromotion";

export default async function getProductById(
  productId: string,
  userId: string | null
): Promise<ProductDetail | null> {
  const rawProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      price: true,
      slug: true,
      imageUrls: true,
      description: true,
      stock: true,
      sold: true,
      favoriteCount: true,
      promotions: {
        where: {
          products: { some: { id: productId } },
          ...WHERE_ACTIVE_PROMOTIONS,
          source: "VOUCHER",
          scope: "PRODUCT",
        },
        select: {
          id: true,
          ...MIN_PROMOTION_FIELDS_TO_COMPUTE,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          parent: {
            select: {
              id: true,
              name: true,
              slug: true,
              parent: {
                select: { id: true, parent: { select: { id: true } } },
              },
            },
          },
          attributeTemplates: {
            select: {
              name: true,
              productValues: {
                where: { productId },
                select: {
                  value: true,
                },
              },
            },
          },
        },
      },
      favorites: userId
        ? {
            where: { userId },
            select: { id: true },
            take: 1,
          }
        : false,
    },
  });

  if (!rawProduct) return rawProduct;

  const categoryVouchers = await prisma.promotion.findMany({
    where: {
      ...WHERE_ACTIVE_PROMOTIONS,
      scope: "CATEGORY",
      source: "VOUCHER",
    },
    select: {
      id: true,
      ...MIN_PROMOTION_FIELDS_TO_COMPUTE,
    },
  });

  const sortedVoucher = sortPromotion(
    [...rawProduct.promotions, ...categoryVouchers],
    rawProduct.price
  );

  const breadcrumbs = await getProductBreadcrumbs(
    rawProduct.category.id,
    rawProduct.name,
    rawProduct.slug
  );

  const isFavorited = rawProduct.favorites?.length > 0 ?? false;

  const specifications = rawProduct.category.attributeTemplates.map((attr) => ({
    name: attr.name,
    value: attr.productValues[0].value,
  }));

  return {
    id: rawProduct.id,
    imageUrls: rawProduct.imageUrls,
    name: rawProduct.name,
    sold: rawProduct.sold,
    basePrice: rawProduct.price,
    slug: rawProduct.slug,
    stock: rawProduct.stock,
    isFavorited,
    favoriteCount: rawProduct.favoriteCount,
    categories: breadcrumbs,
    description: rawProduct.description,
    specifications,
    vouchers: sortedVoucher,
  };
}
