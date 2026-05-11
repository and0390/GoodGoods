import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { MapPin, SearchIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { CartButtonMenu } from "./CartButtonMenu";
import { UserAvatarMenu } from "./UserAvatarMenu";

const CartButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const href = session ? `/cart/${session.user.id}` : `/login?next=/cart`;

  return <CartButtonMenu href={href} isLoggedIn={!!session} />;
};

const AuthButtons = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return <UserAvatarMenu session={session} />;
  }

  return (
    <div className="flex flex-none gap-2">
      <Button size="lg" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button size="lg" variant="secondary" asChild>
        <Link href="/login">Log In</Link>
      </Button>
    </div>
  );
};

const TopNav = () => {
  return (
    <div className="flex items-center gap-5">
      <InputGroup className="me-3">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm">
            <SearchIcon />
            <span className="sr-only">search</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <CartButton />

      <Separator orientation="vertical" />

      <AuthButtons />
    </div>
  );
};

export default function MainNav() {
  return (
    <header className="flex w-full">
      <div className="container mx-auto w-full flex-1 py-4">
        {/* Branding Navbar */}
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-4 gap-y-2">
          <div className="row-span-2 place-self-center">
            <Link href="/">
              <h1 className="text-2xl font-bold">GoodGoods</h1>
            </Link>
          </div>

          {/* Top Navbar */}
          <TopNav />

          {/* Botton Navbar */}
          <div className="col-start-2 justify-self-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MapPin />
                  <span>Sent to Central Jakarta</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Test</DialogTitle>
                  <DialogDescription>
                    Lorem ipsum dolor blablabla
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
