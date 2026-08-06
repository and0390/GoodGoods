import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Button } from "@/components/ui/button";
import ButtonPrimitive from "@/components/ui/ButtonPrimitive";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { IconMessage2, IconShoppingCart } from "@tabler/icons-react";
import { LogIn, SearchIcon } from "lucide-react";
import Link from "next/link";

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
      <InputGroup className="h-9 p-1 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupInput placeholder="Search on GoodGoods" className="h-7" />
        <InputGroupAddon align="inline-end" className="p-0 has-[>button]:mr-0">
          <InputGroupButton
            size="icon-sm"
            variant="default"
            className="size-7 rounded-full border-0"
          >
            <SearchIcon />
            <span className="sr-only">search</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <HeaderActions />
    </header>
  );
}
