import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Truck } from "lucide-react";
import ShippingButton from "./ShippingButton";

export default function ShippingInformationDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 text-start text-sm font-normal break-normal"
        asChild
      >
        <ShippingButton />
      </DialogTrigger>
      <DialogContent className="max-w-lg!">
        <DialogHeader>
          <DialogTitle>Shipping Information</DialogTitle>
          <DialogDescription className="sr-only">
            shipping Information dialog
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex gap-2.5 border-b border-border py-3 pt-0">
            <Truck className="size-4 flex-none text-green-600" />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm leading-none font-normal">Regular</h3>
              <p className="text-xs font-normal text-muted-foreground">
                Enjoy 30% off for new buyer
              </p>
            </div>
          </div>
          <div className="flex flex-col border-b border-border py-3">
            <h3 className="text-sm font-normal">Instant</h3>
          </div>
          <div className="flex flex-col py-3 pb-0">
            <h3 className="text-sm font-normal">Cargo</h3>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
