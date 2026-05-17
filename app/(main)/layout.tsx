import { ReactNode } from "react";
import MainNav from "./_components/MainNav";
import { MainFooter } from "./_components/MainFooter";

export default function MainLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
      <MainFooter />
    </div>
  );
}
