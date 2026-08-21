import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { TbShoppingCartSearch } from "react-icons/tb";

const gridVariants = cva("grid", {
  variants: {
    variant: {
      linear:
        "grid-cols-1 gap-y-1 [&_.button]:mt-1 [&_.title]:mt-2 [&>.action-container]:justify-self-center [&>.action-container>.button]:px-9 [&>.desc-container]:text-center [&>.icon-container]:justify-self-center",
      grid: "grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-x-6 gap-y-2 [&_.button]:py-4 [&>.action-container]:col-start-2 [&>.action-container]:row-start-3 [&>.action-container]:self-center [&>.action-container>.button]:px-12 [&>.desc-container]:col-start-2 [&>.icon-container]:row-span-3",
    },
    size: {
      default: "[&>.icon-container>.icon]:size-23",
      lg: "[&>.icon-container>.icon]:size-30",
    },
  },
  defaultVariants: {
    variant: "linear",
    size: "default",
  },
});

export const CartPreviewEmpty = ({
  className,
  variant = "linear",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof gridVariants>) => {
  return (
    <div
      className={cn("flex h-78 w-full items-center justify-center", className)}
      {...props}
    >
      <div className="">
        <div className="icon-container">
          <TbShoppingCartSearch className="icon text-primary" />
        </div>
        <div className="title-container min-h-0">
          <h1 className="title w-full text-xl font-semibold">
            Oops, Your cart seems empty
          </h1>
        </div>
        <div className="desc-container">
          <p className="text-sm text-muted-foreground">
            Let&apos;s fill your cart with items you like!
          </p>
        </div>
        <div className="action-container">
          <Button variant="outline" size="sm" className="button" asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
