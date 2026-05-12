import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type CartPreviewItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
} & ComponentProps<"div">;

export const CartPreviewItem = ({
  quantity,
  id,
  name,
  price,
  className,
  ...props
}: CartPreviewItemProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-x-3 gap-y-1",
        className
      )}
      {...props}
    >
      <div className="row-span-2">
        <Image src="" alt="Product" className="size-14" />
      </div>
      <div className="min-w-0">
        <Button variant="plain" asChild>
          <Link
            href={`/products/${id}`}
            className="w-full justify-stretch p-0!"
          >
            <h1 className="truncate text-base">{name}</h1>
          </Link>
        </Button>
      </div>
      <div className="col-start-2 row-start-2">variant</div>
      <div className="col-start-3 row-start-1 flex min-w-0 items-center gap-1 justify-self-end font-semibold">
        <span>{quantity}</span>
        <span>x</span>
        <span className="truncate text-sm">{formatCurrency(price)}</span>
      </div>
      <div className="col-start-3 flex items-center gap-1.5 justify-self-end">
        <p className="text-muted-foreground">
          {formatCurrency(quantity * price)}
        </p>
      </div>
    </div>
  );
};
