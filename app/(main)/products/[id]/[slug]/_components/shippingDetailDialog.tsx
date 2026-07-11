import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight, Flame, MoveRight, Truck, Zap } from "lucide-react";

export default function ShippingDetailDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="plain">
          <Truck className="size-6 text-primary" /> Free Shipping warranty
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shipping Detail(s)</DialogTitle>
          <DialogDescription className="sr-only">
            shipping detail(s) dialog
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="flex w-full justify-between font-semibold">
              <h2>Instant</h2>
              <span className="flex gap-2.5">
                <span className="text-muted-foreground/80 line-through">
                  {formatCurrency(43000)}
                </span>
                {formatCurrency(0)} - {formatCurrency(15000)}
              </span>
            </div>
            <div className="flex flex-col text-xs text-muted-foreground/80">
              <div className="flex gap-2">
                4-Hours Guarantee
                <div className="relative inline-flex">
                  <Truck className="size-4" />
                  <Zap className="absolute top-1/2 -left-1 size-2.5 -translate-y-1/2 rotate-90 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <p>Enjoy {formatCurrency(30000)} Discount for new users</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
