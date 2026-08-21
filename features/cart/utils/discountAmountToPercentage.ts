export default function discountAmountToPercentage(
  discount: number,
  originalPrice: number
) {
  return (discount / originalPrice) * 100;
}
