import { DiscountType } from "@/app/(shared)/_types/promotion";

export default function sortPromotion<
  T extends {
    minPurchase: number;
    maxDiscount: number | null;
    type: DiscountType;
    value: number;
  },
>(promotions: T[], basePrice: number) {
  return promotions
    .filter((promo) => basePrice >= promo.minPurchase)
    .map((promotion) => {
      let discount = 0;
      if (promotion.type === "PERCENTAGE") {
        discount = Math.min(
          basePrice * (promotion.value / 100),
          promotion.maxDiscount ?? Infinity
        );
      } else if (promotion.type === "FIXED_AMOUNT") {
        discount = Math.min(promotion.value, basePrice);
      }

      return {
        ...promotion,
        discount,
        finalPrice: Math.max(0, basePrice - discount),
      };
    });
}
