import { MainFooter } from "@/app/(main)/_components/MainFooter";
import MainNav from "@/app/(main)/_components/MainNav";
import React from "react";
import ProductCompactNav from "../../../../../features/products/components/ProductCompactNav";

export default function ProductDetailLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <MainNav className="hidden lg:block" />
      <ProductCompactNav />
      <main className="flex w-full flex-1 flex-col">{children}</main>
      <MainFooter className="hidden lg:flex" />
    </div>
  );
}
