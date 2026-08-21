import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import HeaderSearch from "./HeaderSearch";
import HeaderSearchStreamer from "./HeaderSearchStreamer";

export default function TopNav({
  authActions,
  cartAction,
}: {
  authActions: React.ReactNode;
  cartAction: React.ReactNode;
}) {
  return (
    <div className="w-full border-b border-sidebar-border">
      <div className="container mx-auto flex w-full items-center pt-7 pb-4">
        {/* Branding Navbar */}

        <div className="me-20">
          <Link href="/">
            <h1 className="text-3xl font-bold">GoodGoods</h1>
          </Link>
        </div>

        <HeaderSearchStreamer />

        <div className="flex items-center gap-6">
          {cartAction}

          <Separator orientation="vertical" className="hidden sm:block" />

          {authActions}
        </div>
      </div>
    </div>
  );
}
