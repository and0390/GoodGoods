import "server-only";
import getPaginatedProductReview from "@/app/(shared)/_lib/getPaginatedProductReview";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import getProductReviewSummaryCached from "../services/getReviewSummaryCached";
import ProductReviews from "./ProductReviews";

type ProductReviewsStreamerProps = {
  productId: string;
};

export default async function ProductReviewsStreamer({
  productId,
}: ProductReviewsStreamerProps) {
  const session = await getSessionCached();
  const paginatedProductReview = getPaginatedProductReview({
    productId,
    userId: session?.user.id ?? null,
  });
  const productReviewSummary = getProductReviewSummaryCached(productId);

  return (
    <ProductReviews
      productId={productId}
      paginatedReview={paginatedProductReview}
      reviewSummary={productReviewSummary}
      isAuthenticated={!!session}
    />
  );
}
