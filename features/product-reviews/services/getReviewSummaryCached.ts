import getProductReviewSummary from "@/app/(shared)/_lib/getProductReviewSummary";
import { cache } from "react";
import "server-only";

const getProductReviewSummaryCached = cache(async (productId: string) => {
  return await getProductReviewSummary(productId);
});

export default getProductReviewSummaryCached;
