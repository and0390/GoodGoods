import AuthNav from "./_components/AuthNav";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AuthNav />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
    </div>
  );
}
