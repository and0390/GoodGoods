import { ProductDetail } from "@/app/(shared)/_types/product";
import prisma from "@/lib/prisma";
import "server-only";
import getProductBreadcrumbs from "./getProductBreadCrumbs";

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
    price: rawProduct.price,
    slug: rawProduct.slug,
    stock: rawProduct.stock,
    isFavorited,
    favoriteCount: rawProduct.favoriteCount,
    categories: breadcrumbs,
    description: rawProduct.description,
    specifications,
  };
}
