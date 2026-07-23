import { Button } from "@/components/ui/button";
import { CarouselBanner } from "./_components/banner/CarouselBanner";
import { ProductTabs } from "./_components/tabs/ProductTabs";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FiSmartphone } from "react-icons/fi";
import { IoLaptopSharp } from "react-icons/io5";
import {
  Shirt,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Sofa,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductTabSkeleton } from "./_components/tabs/ProductTabSkeleton";
import { Suspense } from "react";
import { TriggerToast } from "./_components/TriggerToast";
import { Separator } from "@/components/ui/separator";

const CategoryAction = () => {
  const config = [
    { Icon: RiShoppingBag2Fill, name: "Mall", className: "text-primary" },
    { Icon: Shirt, name: "Fashion", className: " text-pink-500" },
    { Icon: Laptop, name: "Laptop", className: "text-sky-500" },
    { Icon: Smartphone, name: "Gadget", className: "text-emerald-500" },
    { Icon: Headphones, name: "Audio", className: "text-violet-500" },
    { Icon: Watch, name: "Watch", className: "text-amber-500" },
    { Icon: Camera, name: "Camera", className: "text-rose-500" },
    { Icon: Gamepad2, name: "Gaming", className: "text-indigo-500" },
    { Icon: Sofa, name: "Furniture", className: "text-orange-500" },
  ] as const;
  return (
    <div className="no-scrollbar flex w-full items-center justify-around overflow-x-auto">
      {config.map(({ Icon, name, className }) => (
        <Button key={name} className="h-auto! flex-col gap-1">
          <Icon className={cn("size-6 sm:size-8", className)} />
          <span className="truncate text-xs sm:text-sm">{name}</span>
        </Button>
      ))}
    </div>
  );
};

export default function Page() {
  const productCards = [
    { title: "Wireless Headphones", price: "299000", rating: "4.8" },
    { title: "Gaming Mouse", price: "185000", rating: "4.6" },
    { title: "Mechanical Keyboard", price: "450000", rating: "4.9" },
    { title: "Smart Watch", price: "799000", rating: "4.7" },
    { title: "Bluetooth Speaker", price: "259000", rating: "4.5" },
    { title: "Laptop Stand", price: "120000", rating: "4.4" },
    { title: "USB-C Hub", price: "99000", rating: "4.3" },
    { title: "Webcam HD", price: "349000", rating: "4.6" },
    { title: "Portable SSD", price: "899000", rating: "4.8" },
    { title: "Gaming Chair", price: "1250000", rating: "4.7" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="w-full bg-muted py-2 sm:py-6">
        <div className="container mx-auto space-y-6 px-4 sm:px-0">
          <CarouselBanner />
          <CategoryAction />
        </div>
      </div>
      <div className="w-full bg-muted">
        <div className="py-7">
          <Suspense fallback={<ProductTabSkeleton />}>
            <ProductTabs />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
