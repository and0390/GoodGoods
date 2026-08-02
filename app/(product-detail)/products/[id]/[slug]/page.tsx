import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Category } from "@/app/(shared)/_types/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import AddToCartPanel from "@/features/product-reviews/components/AddToCartPanel";
import ProductDescription from "@/features/product-reviews/components/ProductDescription";
import { cn } from "@/lib/utils";
import ProductReviewsStreamer from "@/product-reviews/components/ProductReviewsStreamer";
import ProductHeroHorizontal from "@/product/components/ProductHeroHorizontal";
import ProductHeroVertical from "@/product/components/ProductHeroVertical";
import getProductById from "@/product/services/getProductById";
import { IconMessage2 } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import React from "react";

type ProductBreadcrumbsProps = {
  categories: Category[];
} & React.ComponentProps<typeof Breadcrumb>;

const ProductBreadcrumbs = ({
  categories,
  ...props
}: ProductBreadcrumbsProps) => {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {categories.map((cat, index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <React.Fragment key={cat.id}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{cat.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={cat.slug}>{cat.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

type ProductPageProps = {
  params: Promise<{ id: string; slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const session = await getSessionCached();

  const product = await getProductById(id, session?.user.id ?? null);

  if (!product) {
    notFound();
  }

  return (
    <div className="relative container mx-auto flex w-full flex-1 flex-col gap-4 pb-[72px] lg:mb-6 lg:pb-0">
      <ProductBreadcrumbs
        categories={product.categories}
        className="hidden pt-4 lg:block"
      />

      <ProductHeroHorizontal
        isAuthenticated={!!session}
        product={product}
        className="hidden lg:flex"
      />
      <ProductHeroVertical
        isAuthenticated={!!session}
        product={product}
        className="lg:hidden"
      />

      <div className="flex w-full flex-col bg-card p-3 md:p-8">
        <h2 className="mb-3 text-sm font-bold text-card-foreground md:mb-7 md:text-lg">
          Product specification
        </h2>
        <div className="flex flex-col gap-5">
          <div className="hidden items-center lg:flex">
            <p className="flex-none basis-[240px] text-sm font-normal text-muted-foreground">
              Category
            </p>
            <ProductBreadcrumbs categories={product.categories} />
          </div>
          {product.specifications.map((spec, index) => (
            <div className="flex items-center" key={index}>
              <p className="flex-none basis-40 text-sm font-normal text-muted-foreground md:basis-[240px]">
                {spec.name}
              </p>
              <p className="text-sm font-normal text-card-foreground">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProductDescription description={product.description} />

      <ProductReviewsStreamer productId={product.id} />

      <section
        aria-label="Product Actions"
        className="fixed inset-x-0 bottom-0 z-70 flex items-center gap-3 bg-card p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden"
      >
        <button
          type="button"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "size-12 flex-none rounded-full",
            })
          )}
        >
          <IconMessage2 className="size-8 text-primary" />
        </button>

        <AddToCartPanel isAuthenticated={!!session} product={product} />

        <button className="flex h-12 w-[216px] flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground md:flex-none">
          Buy now
        </button>
      </section>
    </div>
  );
}
