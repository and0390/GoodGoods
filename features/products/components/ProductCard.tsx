import { ProductPreview } from "@/app/(shared)/_types/product";
import { ImageWithSkeleton2 } from "@/features/product-reviews/components/ImageWithSkeleton";
import formatRating from "@/features/product-reviews/utils/formatRating";
import formatCount from "@/lib/formatCount";
import { cn, formatCurrency } from "@/lib/utils";
import { IconTicketFilled } from "@tabler/icons-react";
import { Check, Star, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";
import DiscountBadge from "./DiscountBadge";

function RenderPrice({
  promotion,
  basePrice,
}: {
  promotion: ProductPreview["promotion"] | null;
  basePrice: number;
}) {
  const hasPromo = !!promotion;
  const fromVoucher = hasPromo && promotion.source === "VOUCHER";

  if (hasPromo) {
    return (
      <div className="mb-2 flex items-center gap-0.5">
        <p
          className={cn(
            "flex-none truncate text-base font-semibold",
            fromVoucher && "text-primary"
          )}
        >
          {formatCurrency(promotion.finalPrice)}
        </p>
        {fromVoucher && (
          <div className="relative">
            <IconTicketFilled className="size-4 text-primary" />
            <div className="absolute right-0 bottom-0 rounded-full border border-primary-foreground bg-primary p-px">
              <Check className="size-1 text-primary-foreground" />
            </div>
          </div>
        )}
        <p className="truncate text-xs font-normal text-muted-foreground/60 line-through">
          {formatCurrency(basePrice)}
        </p>
      </div>
    );
  }

  return (
    <p className="mb-2 text-base font-semibold">{formatCurrency(basePrice)}</p>
  );
}

export type ProductCardProps = {
  product: ProductPreview;
  action?: React.ReactNode;
};

function ProductCard({
  product,
  className,
  action,
  ...props
}: ProductCardProps & React.ComponentProps<"div">) {
  const {
    id,
    imageUrl,
    name,
    basePrice: price,
    slug,
    avgRating,
    sold,
    promotion,
  } = product;

  const hasPromo = !!promotion;

  return (
    <div className={cn("relative isolate rounded-t-sm", className)} {...props}>
      <Link href={`/products/${id}/${slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">{name}</span>
      </Link>
      <div className="relative [&>div]:overflow-hidden [&>div]:first:mb-2 [&>div]:first:aspect-square [&>div]:first:rounded-sm">
        <ImageWithSkeleton2
          src={imageUrl}
          alt={name}
          fill
          className="w-full object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 160px"
        />
        {hasPromo && <DiscountBadge value={promotion.discountPercent} />}
        <h3 className="mb-2 line-clamp-2 min-w-0 text-sm font-normal md:truncate">
          {name}
        </h3>

        <RenderPrice basePrice={price} promotion={promotion} />
        {/* <RenderPriceMobile basePrice={price} promotion={promotion} /> */}

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-rating text-rating" />
            <span className="text-xs font-normal">
              {formatRating(avgRating)}
            </span>
          </div>
          <span aria-hidden="true" className="text-xs font-normal">
            &middot;
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {formatCount(sold)} sold
          </span>
        </div>
        {action && (
          <div className="relative z-20 me-1 flex w-full justify-end">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
