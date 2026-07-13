import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Category } from "@/app/(shared)/_types/Category";
import { ProductDetail } from "@/app/(shared)/_types/product";
import { getCategoryAncestors } from "@/app/generated/prisma/sql/getCategoryAncestors";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import formatCount from "@/lib/formatCount";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Share2, Star } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import ProductPurchaseAction from "./_components/ProductPurchaseAction";
import ProductCarousel from "./productCarousel";
import ToggleFavoriteButton from "./_components/ToggleFavoriteButton";

export async function getProductBreadcrumbs(
  categoryId: string,
  productName: string,
  productSlug: string
): Promise<Category[]> {
  const ancestors = await prisma.$queryRawTyped(
    getCategoryAncestors(categoryId)
  );

  const orderedBreadcrumbs = ancestors
    .map((cat) => {
      const category: Category = {
        id: cat.id!,
        name: cat.name!,
        slug: `/${cat.slug!}`,
      };
      return category;
    })
    .reverse();

  return [
    ...orderedBreadcrumbs,
    { id: crypto.randomUUID(), name: productName, slug: productSlug },
  ];
}

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

const getProductById = async (
  productId: string,
  userId: string | null
): Promise<ProductDetail | null> => {
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
      _count: {
        select: {
          favorites: true,
        },
      },
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
    favoritesCount: rawProduct._count.favorites,
    categories: breadcrumbs,
    description: rawProduct.description,
    specifications,
  };
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;

  const session = await getSessionCached();

  const product = await getProductById(id, session?.user.id ?? null);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col bg-background">
      <ProductBreadcrumbs categories={product.categories} className="my-3" />
      <div className="mb-6 flex w-full gap-8 bg-card py-4 ps-3 pe-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <ProductCarousel product={product} className="mb-6" />
          <div className="flex items-start justify-end gap-3.5">
            <ToggleFavoriteButton
              IsFavorited={product.isFavorited}
              isAuthenticated={!!session}
              productId={product.id}
              favoritesCount={product.favoritesCount}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="plain">
                  <Share2 className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-2 flex-col text-sm">
          <div className="flex w-full items-center justify-between">
            <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
            <Button variant="plain">Report</Button>
          </div>

          <div className="mb-3.5 flex items-center gap-4">
            <span className="flex items-center gap-1">
              Sold <span className="text-muted-foreground">{product.sold}</span>
            </span>
            <Separator orientation="vertical" />
            <div className="flex w-full items-center justify-start gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>4.8</span>
            </div>
          </div>

          <span className="mb-4 ps-3.5 text-4xl font-semibold">
            {formatCurrency(product.price)}
          </span>
          <ProductPurchaseAction
            isAuthenticated={!!session}
            product={product}
          />
        </div>
      </div>
      <div className="flex w-full flex-col bg-card px-10 py-8">
        <h2 className="mb-6 text-lg font-semibold">Product specification</h2>
        <div className="mb-8 flex flex-col gap-6 text-sm">
          <div className="flex items-center">
            <span className="shrink-0 basis-[200px] text-muted-foreground">
              Category
            </span>
            <ProductBreadcrumbs categories={product.categories} />
          </div>
          {product.specifications.map((spec, index) => (
            <div className="flex items-center" key={index}>
              <span className="shrink-0 basis-[200px] text-muted-foreground">
                {spec.name}
              </span>
              {spec.value}
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-lg font-semibold">Description</h2>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
}
