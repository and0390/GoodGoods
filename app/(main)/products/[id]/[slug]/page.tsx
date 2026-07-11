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

const getProductById = async (id: string): Promise<ProductDetail | null> => {
  const rawProduct = await prisma.product.findUnique({
    where: { id },
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
    },
  });

  if (!rawProduct) return rawProduct;

  const breadcrumbs = await getProductBreadcrumbs(
    rawProduct.category.id,
    rawProduct.name,
    rawProduct.slug
  );

  return {
    id: rawProduct.id,
    imageUrls: rawProduct.imageUrls,
    name: rawProduct.name,
    sold: rawProduct.sold,
    price: rawProduct.price,
    slug: rawProduct.slug,
    stock: rawProduct.stock,
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

  const product = await getProductById(id);

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
                <Button variant="plain">
                  <Heart className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Favourite</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="plain">
                  <Share2 className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
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

          <span className="mb-4 ps-3.5 text-2xl font-semibold">
            {formatCurrency(product.price)}
          </span>

          <dl className="mb-6 flex flex-col gap-3 ps-3.5 text-sm">
            <div className="flex items-center">
              <div className="basis-[100px]">
                <span className="text-muted-foreground">Shipping</span>
              </div>
              <div>
                <ShippingDetailDialog />
              </div>
            </div>
            <div className="flex items-center">
              <div className="basis-[100px]">
                <span className="text-muted-foreground">
                  GoodGoods
                  <br /> Guarantee
                </span>
              </div>
              <div className="flex items-center gap-2 ps-2.5">
                <ShieldCheck className="size-6 text-foreground" />
                10 - Day Return Policy &middot; 100% Original &middot; Cash On
                Delivery
              </div>
            </div>
            <div className="flex items-center">
              <div className="basis-[100px] text-muted-foreground">
                Quantity
              </div>
              <div className="ps-2.5">
                <InputGroup className="w-fit border-transparent hover:border-input has-disabled:bg-transparent has-disabled:opacity-100 dark:has-disabled:bg-input/30 dark:has-disabled:opacity-100">
                  <InputGroupInput className="w-7 text-center" value={1} />
                  <InputGroupAddon align="inline-start">
                    <InputGroupButton
                      aria-label="decrease quantity"
                      title="decrease"
                      size="icon-xs"
                    >
                      <Minus />
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="increase quantity"
                      title="increase"
                      size="icon-xs"
                      className=""
                    >
                      <Plus />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </dl>

          <div className="flex w-full gap-3">
            <Button variant="outline" size="lg" className="flex-1">
              <MdAddShoppingCart /> Add to Cart
            </Button>
            <Button variant="default" size="lg" className="flex-1">
              Buy Now
            </Button>
          </div>
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
