import { ReactNode } from "react";
import MainNav from "./_components/MainNav";

export default function MainLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
