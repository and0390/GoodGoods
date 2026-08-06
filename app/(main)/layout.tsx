import { ReactNode } from "react";
import MainNav from "./_components/MainNav";
import { MainFooter } from "./_components/MainFooter";
import { IconMessage2 } from "@tabler/icons-react";
import CompactNav from "@/features/home/components/CompactNav";

export default function MainLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <MainNav className="hidden lg:block" />
      <CompactNav className="flex lg:hidden" />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
      <MainFooter className="hidden lg:flex" />
    </div>
  );
}
