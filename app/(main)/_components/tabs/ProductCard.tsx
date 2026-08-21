import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { Dot, Ellipsis, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartDropdownItem } from "../../../../features/cart/components/AddToCartDropdownItem";
import { ProductPreview } from "@/app/(shared)/_types/product";

export type ProductCardProps = {
  product: ProductPreview;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, imageUrl, name, basePrice: price, slug } = product;
  return (
    <div className="relative transition-all duration-200 ease-out hover:-translate-y-1">
      <Link href={`/products/${id}/${slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">{name}</span>
      </Link>
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="mb-2 aspect-square w-full rounded-sm object-cover"
        />
        <h1 className="mb-2 truncate text-sm">{name}</h1>
        <p className="mb-2 text-sm font-semibold">{formatCurrency(price)}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>4.8</span>
          </div>
          <span aria-disabled>&middot;</span>
          <span>2k+ sold</span>
        </div>
        <div className="relative z-20 me-1 flex w-full justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto! p-0">
                <Ellipsis />
                <span className="sr-only">options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <AddToCartDropdownItem productId={id} />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
