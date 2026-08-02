import "server-only";

import getProductReviewSummary from "@/app/(shared)/_lib/getProductReviewSummary";
import ProductReviewSummary from "@/features/product-reviews/components/ProductReviewsSummary";

type ProductReviewsPageProps = {
  params: Promise<{ id: string; slug: string }>;
};

export default async function ProductReviewsPage({
  params,
}: ProductReviewsPageProps) {
  const { id } = await params;

  const reviewSummary = getProductReviewSummary(id);

  return (
    <div className="flex w-full flex-1 flex-col">
      <ProductReviewSummary reviewSummary={reviewSummary} />
    </div>
  );
}
