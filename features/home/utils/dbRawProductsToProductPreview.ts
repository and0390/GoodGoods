import { ProductPreview } from "@/app/(shared)/_types/product";
import getProductsByCursor from "../repository/getProductsByCursor";
import getBestPromotion from "@/features/products/utils/getBestPromotion";
import { DiscountType, PromotionSource } from "@/app/(shared)/_types/promotion";
import discountAmountToPercentage from "@/features/cart/utils/discountAmountToPercentage";

export default function dbRawProductsToPreview<
  CatPromo extends {
    id: string;
    name: string;
    categoryId: string | null;
    value: number;
    minPurchase: number;
    maxDiscount: number | null;
    type: DiscountType;
    source: PromotionSource;
  },
>({
  categoryPromos,
  products,
  reviewAggregate,
}: {
  products: Awaited<ReturnType<typeof getProductsByCursor>>;
  categoryPromos: Record<string, CatPromo[]>;
  reviewAggregate: Record<string, number>;
}) {
  return products.map((rawProduct): ProductPreview => {
    const productCatIds = [
      rawProduct.category.id,
      rawProduct.category.parent?.id,
      rawProduct.category.parent?.parent?.id,
    ].filter((id): id is string => Boolean(id));

    const matchedCatPromos = productCatIds.flatMap(
      (id) => categoryPromos[id] ?? []
    );

    const applicable = [...rawProduct.promotions, ...matchedCatPromos];

    const bestPromo = getBestPromotion(applicable, rawProduct.price);

    return {
      id: rawProduct.id,
      imageUrl: rawProduct.imageUrls[0],
      name: rawProduct.name,
      basePrice: rawProduct.price,
      slug: rawProduct.slug,
      sold: rawProduct.sold,
      stock: rawProduct.stock,
      avgRating: reviewAggregate[rawProduct.id] ?? 0, // fallback to 0 if the product doesn't exist in the entry (the product has no reviews yet)
      promotion: bestPromo
        ? {
            source: bestPromo.source,
            discountPercent:
              bestPromo.type === "PERCENTAGE"
                ? bestPromo.value
                : discountAmountToPercentage(
                    bestPromo.discountPrice,
                    rawProduct.price
                  ),
            finalPrice: bestPromo.finalPrice,
          }
        : null,
    };
  });
}
