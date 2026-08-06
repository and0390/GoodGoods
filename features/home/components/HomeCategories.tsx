import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  IconBrandBeats,
  IconDeviceMobileFilled,
  IconKeyboard,
} from "@tabler/icons-react";
import {
  CupSoda,
  Gamepad2,
  Shirt,
  SoapDispenserDroplet,
  Sofa,
} from "lucide-react";
import { RiShoppingBag2Fill } from "react-icons/ri";

const CATEGORY_ITEMS = [
  { Icon: RiShoppingBag2Fill, name: "Mall", className: "text-primary" },
  { Icon: Shirt, name: "Fashion", className: " text-pink-500 fill-pink-500" },
  {
    Icon: IconKeyboard,
    name: "Computer & Accessories",
    className: "text-sky-500",
  },
  {
    Icon: IconDeviceMobileFilled,
    name: "Mobile Credit & Bills",
    className: "text-emerald-500",
  },
  {
    Icon: IconBrandBeats,
    name: "Headphones & Speakers",
    className: "text-violet-500",
  },
  { Icon: CupSoda, name: "Food & Beverages", className: "text-amber-500" },
  {
    Icon: SoapDispenserDroplet,
    name: "Beauty & Skincare",
    className: "text-rose-500",
  },
  { Icon: Gamepad2, name: "Gaming & Consoles", className: "text-indigo-500" },
  { Icon: Sofa, name: "Home & Living", className: "text-orange-500" },
] as const;

export default function HomeCategories() {
  return (
    <ScrollArea className="w-full" type="always">
      <div className="flex w-full items-start justify-around gap-4 overflow-x-auto pb-2 md:py-0">
        {CATEGORY_ITEMS.map(({ Icon, className, name }) => (
          <div key={name} className="flex flex-1 flex-col items-center px-4">
            <Button
              key={name}
              variant="outline"
              className="size-10 flex-none border-border! bg-transparent! lg:size-11"
              size="icon-lg"
            >
              <Icon className={cn("size-7 lg:size-9", className)} />
            </Button>
            <p className="line-clamp-2 text-center text-xs font-normal wrap-break-word md:text-sm">
              {name}
            </p>
          </div>
        ))}
      </div>
      <ScrollBar
        orientation="horizontal"
        className="right-0! left-1/2! h-1! w-6! -translate-x-1/2 rounded-full border-0! bg-muted p-0 data-[state=hidden]:hidden! [&:not(:has([data-slot=scroll-area-thumb]))]:hidden! [&>[data-slot=scroll-area-thumb]]:h-full! [&>[data-slot=scroll-area-thumb]]:border-0! [&>[data-slot=scroll-area-thumb]]:bg-primary"
      />
    </ScrollArea>
  );
}
