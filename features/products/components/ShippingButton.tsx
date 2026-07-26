import { ChevronRight, Truck } from "lucide-react";

export default function ShippingButton(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-transparent bg-clip-padding p-3 text-start text-sm font-normal whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:px-0 md:py-3 lg:w-auto lg:justify-center lg:py-0"
    >
      <div className="flex min-w-0 gap-2 lg:hidden">
        <Truck className="size-5 flex-none text-green-600" />
        <div className="flex min-w-0 flex-col text-sm font-normal">
          <p className="truncate"> Guaranteed delivery July 19 and July 24</p>
          <p className="truncate text-xs font-normal text-muted-foreground lg:hidden">
            Get a voucher up to Rp10.000 if your order is late
          </p>
        </div>
      </div>
      <p className="hidden text-sm font-normal lg:inline-block">
        Guaranteed delivery July 19 and July 24
      </p>
      <ChevronRight className="size-4 flex-none" />
    </button>
  );
}
