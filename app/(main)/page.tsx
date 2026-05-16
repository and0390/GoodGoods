import { CarouselBanner } from "./_components/banner/CarouselBanner";
import { ProductTabs } from "./_components/tabs/ProductTabs";

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
    <div className="flex flex-1 flex-col gap-4">
      <div className="w-full bg-muted/75 py-2 sm:py-6">
        <div className="container mx-auto px-4 sm:px-0">
          <CarouselBanner />
        </div>
      </div>
      <div className="w-full bg-muted/75">
        <div className="container mx-auto px-4 py-6 sm:px-0">
          <ProductTabs />
        </div>
      </div>
    </div>
  );
}
