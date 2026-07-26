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
import React from "react";
import getProductById from "@/product/services/getProductById";
import ProductHeroHorizontal from "@/product/components/ProductHeroHorizontal";
import ProductHeroVertical from "@/product/components/ProductHeroVertical";
import { notFound } from "next/navigation";
import ProductReviewsStreamer from "@/product-reviews/components/ProductReviewsStreamer";

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
    <div className="container mx-auto flex w-full flex-1 flex-col gap-4 lg:mb-6">
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

      <div className="flex flex-col bg-card p-3 md:p-8">
        <h2 className="mb-3 text-sm font-bold text-card-foreground md:mb-7 md:text-lg">
          Description
        </h2>
        <p className="text-sm font-normal text-muted-foreground">
          {product.description}
        </p>
      </div>

      <ProductReviewsStreamer productId={product.id} />
    </div>
  );
}
