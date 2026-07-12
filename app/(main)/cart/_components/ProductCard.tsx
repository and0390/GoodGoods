"use client";

import { ProductPreview } from "@/app/(shared)/_types/product";

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
import { Ellipsis, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useAddToCart from "../_hooks/useAddToCart";
import useAddToFavorites from "../_hooks/useAddToFavorites";

type ProductCardProps = {
  product: ProductPreview;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCartMutation = useAddToCart();
  const addToFavoritesMutation = useAddToFavorites();

  const handleAddToCart = () => {
    addToCartMutation.mutate({ product });
  };

  const handleAddToFavorites = () => {
    addToFavoritesMutation.mutate(product.id);
  };

  return (
    <Card className="relative isolate w-full rounded-xl py-0">
      <CardContent className="w-full px-0">
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10"
        />
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={80}
          height={80}
          className="aspect-square w-full"
        />
        <div className="flex flex-col p-2">
          <h2 className="mb-1.5 truncate text-sm">{product.name}</h2>
          <p className="mb-1.5 text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="mb-1.5 flex items-center gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>4.8</span>
            </div>
            <span aria-disabled>&middot;</span>
            <span>2k+ sold</span>
          </div>

          <div className="relative z-30 mb-1.5 flex w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <span className="sr-only">more options</span>
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={handleAddToFavorites}
                    disabled={addToFavoritesMutation.isPending}
                  >
                    Add to Favorites
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            size="lg"
            variant="outline"
            className="relative z-30"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
