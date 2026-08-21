import { DiscountType } from "@/app/generated/prisma/enums";

/**
 * Determines the best applicable promotion for a given base price.
 *
 * A promotion is considered applicable when `basePrice` meets its
 * minimum purchase requirement. Among all applicable promotions,
 * the promotion that produces the lowest final price is selected.
 *
 * @param promotions - List of candidate promotions.
 * @param promotions[].id - Unique promotion ID.
 * @param promotions[].minPurchase - Minimum purchase amount required
 *   for the promotion to be applicable.
 * @param promotions[].value - Promotion value.
 *   - `PERCENTAGE`: represents the discount percentage (e.g. `10` = 10%).
 *   - `FIXED_AMOUNT`: represents the fixed discount amount.
 * @param promotions[].maxDiscount - Maximum discount amount allowed.
 *   Primarily applies to `PERCENTAGE` promotions. `null` means no cap.
 * @param promotions[].type - Promotion discount type:
 *   `PERCENTAGE` or `FIXED_AMOUNT`.
 * @param promotions[].source - Source of the promotion, such as
 *   a voucher or flash sale.
 * @param basePrice - Original product price before applying any promotion.
 *
 * @returns The best applicable promotion with:
 *   - All original promotion properties.
 *   - `discount`: Actual amount deducted from `basePrice`.
 *   - `finalPrice`: Price after applying the discount.
 *   Returns `null` when no promotion meets the minimum purchase requirement.
 *
 * @example
 * A product priced at 100,000 with:
 * - 10% off (max 15,000) → 10,000 discount → 90,000 final price
 * - 15,000 fixed discount → 15,000 discount → 85,000 final price
 *
 * The fixed 15,000 promotion is selected because it produces
 * the lowest final price.
 */

function calculateDiscountPrice(
  promotion: {
    type: DiscountType;
    value: number;
    maxDiscount: number | null;
  },
  basePrice: number
) {
  if (promotion.type === "PERCENTAGE") {
    return Math.min(
      basePrice * (promotion.value / 100),
      promotion.maxDiscount ?? basePrice
    );
  }

  return Math.min(promotion.value, basePrice);
}

export default function getBestPromotion<
  T extends {
    minPurchase: number;
    maxDiscount: number | null;
    type: DiscountType;
    value: number;
  },
>(promotions: T[], basePrice: number) {
  return promotions.reduce<
    | (T & {
        discountPrice: number;
        finalPrice: number;
      })
    | null
  >((best, promo) => {
    if (basePrice < promo.minPurchase) return best;

    const discountPrice = calculateDiscountPrice(promo, basePrice);
    const finalPrice = basePrice - discountPrice;

    if (!best || finalPrice < best.finalPrice) {
      return {
        ...promo,
        discountPrice,
        finalPrice,
      };
    }

    return best;
  }, null);
}
