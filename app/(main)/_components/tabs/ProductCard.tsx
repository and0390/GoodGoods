import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageId: string;
};

export const ProductCard = ({
  id,
  title,
  price,
  rating,
  imageId,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className="rounded-md">
        <CardContent>
          <div className="aspect-square w-full bg-red-50" />
          <div className="mt-3 flex flex-col gap-1">
            <h1 className="truncate text-base">{title}</h1>
            <p className="text-base font-semibold">{formatCurrency(price)}</p>
            <div className="flex gap-1">
              <span>⭐ {rating}+</span>
              <span>&middot;</span>
              <span>2k+ sold</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
