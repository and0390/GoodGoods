import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Button } from "@/components/ui/button";
import ButtonPrimitive from "@/components/ui/ButtonPrimitive";
import { cn } from "@/lib/utils";
import { IconMessage2, IconShoppingCart } from "@tabler/icons-react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import HeaderSearchStreamer from "./HeaderSearchStreamer";

function AuthenticatedActions() {
  return (
    <div className="flex gap-3">
      <ButtonPrimitive className="size-6">
        <IconShoppingCart className="size-[23px] text-muted-foreground" />
      </ButtonPrimitive>
      <ButtonPrimitive className="size-6">
        <IconMessage2 className="size-[23px] text-muted-foreground" />
      </ButtonPrimitive>
    </div>
  );
}

async function HeaderActions() {
  const session = await getSessionCached();

  return session ? (
    <AuthenticatedActions />
  ) : (
    <Button className="h-9 gap-1.5 text-base" asChild>
      <Link href="/login">
        <LogIn className="size-5" />
        Log In
      </Link>
    </Button>
  );
}

export default function CompactNav({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-100 flex w-full items-center gap-3 bg-sidebar p-4",
        className
      )}
      {...props}
    >
      <HeaderSearchStreamer />

      <HeaderActions />
    </header>
  );
}
