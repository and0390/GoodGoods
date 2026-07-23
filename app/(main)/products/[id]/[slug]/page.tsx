import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Category } from "@/app/(shared)/_types/category";
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
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import ProductPurchaseAction from "./_components/ProductPurchaseAction";
import ProductCarousel from "./productCarousel";
import ToggleFavoriteButton from "./_components/ToggleFavoriteButton";
import {
  FaHeart,
  FaRegStar,
  FaShareAlt,
  FaShieldAlt,
  FaStar,
  FaTruck,
} from "react-icons/fa";
import ProductReviews from "./_components/ProductReviews";
import { Badge } from "@/components/ui/badge";
import ProductCarouselMobile from "./_components/ProductCarouselMobile";
import getPaginatedProductReview from "@/app/(shared)/_lib/getPaginatedProductReview";
import getProductReviewSummary from "@/app/(shared)/_lib/getProductReviewSummary";

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <React.Fragment key={i}>
      {i < Math.round(rating) ? (
        <FaStar className="size-4 fill-current text-amber-500" />
      ) : (
        <FaRegStar className="size-4 text-muted-foreground/40" />
      )}
    </React.Fragment>
  ));
};

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

type ProductsPageProps = {
  params: Promise<{ id: string; slug: string }>;
};

type ProductDetailPreviewProps = {
  product: ProductDetail;
  isAuthenticated: boolean;
};

function ProductDetailPreview({
  product,
  isAuthenticated,
}: ProductDetailPreviewProps) {
  return (
    <div className="flex flex-col bg-card md:flex-row md:gap-6 md:px-3 md:pt-14 md:pb-3 lg:pt-3">
      <div className="hidden flex-col gap-5 p-3 lg:flex">
        <ProductCarousel product={product} />
        <ToggleFavoriteButton
          IsFavorited={product.isFavorited}
          isAuthenticated={isAuthenticated}
          productId={product.id}
          favoritesCount={product.favoritesCount}
        />
      </div>

      <ProductCarouselMobile productDetail={product} />

      <div className="hidden min-w-0 flex-1 flex-col gap-1 px-3 py-2 lg:flex">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <Button variant="ghost">Report</Button>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-normal">
          <p className="text-card-foreground">
            Sold <span className="text-muted-foreground">{product.sold}</span>
          </p>
          <Separator orientation="vertical" />
          <div className="flex items-center justify-start gap-1">
            <Star className="size-4 fill-rating text-rating" />
            <p className="text-card-foreground">
              4.8 <span className="text-muted-foreground">(8.3K+ reviews)</span>
            </p>
          </div>
        </div>

        <p className="my-6 text-3xl font-semibold text-red-700">
          {formatCurrency(product.price)}
        </p>

        <ProductPurchaseAction
          isAuthenticated={isAuthenticated}
          product={product}
        />
      </div>

      {/* MOBILE PRODUCT DETAIL */}
      <div className="flex flex-1 flex-col md:p-3 lg:hidden">
        <div className="flex flex-col gap-3 p-3 md:p-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-red-700 md:text-3xl">
              {formatCurrency(product.price)}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm font-normal text-muted-foreground">
                10k+ Sold
              </p>
              <button className="flex items-center justify-center rounded-full border-border bg-card md:size-11 md:border">
                <Heart className="size-4 fill-muted-foreground text-muted-foreground md:size-6" />
              </button>
            </div>
          </div>

          <h1 className="text-base font-semibold md:text-xl">{product.name}</h1>
        </div>

        <div className="flex flex-col px-3 py-3 md:px-0">
          <div className="flex gap-2">
            <Truck className="size-5 flex-none text-green-600" />
            <button className="flex items-center gap-2 text-start text-sm font-normal break-normal">
              Guaranteed delivery July 19 and July 24
              <ChevronRight className="size-4 flex-none text-muted-foreground" />
            </button>
          </div>
          <p className="ms-7 text-xs font-normal text-muted-foreground">
            Get a voucher up to Rp10.000 if your order is late
          </p>
        </div>

        <Separator />

        <div className="my-3 flex items-center gap-2">
          <ShieldCheck className="size-5 flex-none text-primary" />
          <p className="min-w-0 text-sm font-normal text-card-foreground">
            10 - Day Return Policy &middot; 100% Original &middot; Cash On
            Delivery
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { id } = await params;

  const session = await getSessionCached();

  const product = await getProductById(id, session?.user.id ?? null);

  if (!product) {
    notFound();
  }

  const [paginatedProductReview, productReviewSummary] = await Promise.all([
    getPaginatedProductReview(
      product.id,
      session?.user.id ?? null,
      null /// fetch all reviews
    ),
    getProductReviewSummary(product.id),
  ]);

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col gap-4 lg:mb-6">
      <ProductBreadcrumbs
        categories={product.categories}
        className="hidden pt-4 lg:block"
      />

      <ProductDetailPreview isAuthenticated={!!session} product={product} />

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

      <ProductReviews
        productId={product.id}
        paginatedReview={paginatedProductReview}
        reviewSummary={productReviewSummary}
        isAuthenticated={!!session}
      />
    </div>
  );
}
