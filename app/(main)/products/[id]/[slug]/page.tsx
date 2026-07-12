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
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import ProductCarousel from "./productCarousel";
import { Button } from "@/components/ui/button";
import { MdAddShoppingCart } from "react-icons/md";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import ShippingDetailDialog from "./_components/shippingDetailDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import ToggleFavoriteButton from "./_components/ToggleFavoriteButton";
import AddToCartButton from "./_components/AddToCartButton";
import { QuantityInputGroup } from "@/app/(shared)/_components/QuantityInputGroup";
import ProductPurchaseAction from "./_components/ProductPurchaseAction";

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
        },
      },
      ...(userId
        ? {
            favorites: {
              where: { userId },
              select: { id: true },
            },
          }
        : {}),
    },
  });

  if (!rawProduct) return rawProduct;

  const breadcrumbs = await getProductBreadcrumbs(
    rawProduct.category.id,
    rawProduct.name,
    rawProduct.slug
  );

  const isFavorited = rawProduct.favorites?.length > 0 ?? false;

  return {
    id: rawProduct.id,
    imageUrls: rawProduct.imageUrls,
    name: rawProduct.name,
    sold: rawProduct.sold,
    price: rawProduct.price,
    slug: rawProduct.slug,
    stock: rawProduct.stock,
    isFavorited,
    categories: breadcrumbs,
    description: rawProduct.description,
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
          <div className="flex items-center justify-end gap-3.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleFavoriteButton
                  initialIsFavorited={product.isFavorited}
                  isAuthenticated={!!session}
                  productId={product.id}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Favorite</p>
              </TooltipContent>
            </Tooltip>

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
        <div className="mb-8 flex flex-col">
          <div className="flex items-center">
            <span className="shrink-0 basis-[200px] text-muted-foreground">
              Category
            </span>
            <ProductBreadcrumbs categories={product.categories} />
          </div>
        </div>

        <h2 className="mb-6 text-lg font-semibold">Description</h2>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
}
