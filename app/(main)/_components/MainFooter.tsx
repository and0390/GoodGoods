import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "w-full border-t border-sidebar-border bg-sidebar py-7 text-sidebar-foreground",
        className
      )}
      {...props}
    >
      <div className="container mx-auto flex">
        <Link href="/" className="px-12">
          <h1 className="text-3xl font-bold">GoodGoods</h1>
        </Link>

        <div className="flex gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold">Category</h2>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-normal">Electornics</p>
              <p className="text-sm font-normal">Beauty & Personal care</p>
              <p className="text-sm font-normal">Food & Beverages</p>
              <p className="text-sm font-normal">Smartphones</p>
              <p className="text-sm font-normal">Laptops</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold">Support</h2>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-normal">Help Center</p>
              <p className="text-sm font-normal">Track Shipping</p>
              <p className="text-sm font-normal">Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
