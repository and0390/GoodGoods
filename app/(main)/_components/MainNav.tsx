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
import { Bell, MapPin, SearchIcon } from "lucide-react";
import Link from "next/link";
import { UserMenuOrAuthButtons } from "./avatar/UserMenuOrAuthButtons";
import { CartHoverCard } from "./cart/CartHoverCard";

const TopNav = () => {
  return (
    <div className="flex w-full items-center justify-between px-4 sm:justify-stretch sm:gap-5 sm:px-0">
      <InputGroup className="me-3">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm">
            <SearchIcon />
            <span className="sr-only">search</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <Button variant="ghost" size="icon-lg" className="flex sm:hidden" asChild>
        <Link href="/notifications">
          <Bell />
          <span className="sr-only">notification</span>
        </Link>
      </Button>

      <CartHoverCard />

      <Separator orientation="vertical" className="hidden sm:block" />

      <UserMenuOrAuthButtons />
    </div>
  );
};

export default function MainNav() {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-background">
      <div className="absolute inset-0 -z-10 bg-muted/75" />
      <div className="container mx-auto w-full flex-1 py-4">
        {/* Branding Navbar */}
        <div className="flex w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] sm:grid sm:gap-x-4 sm:gap-y-2">
          <div className="row-span-2 hidden place-self-center sm:block">
            <Link href="/">
              <h1 className="text-2xl font-bold">GoodGoods</h1>
            </Link>
          </div>

          {/* Top Navbar */}
          <TopNav />

          {/* Botton Navbar */}
          <div className="col-start-2 hidden justify-self-end sm:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MapPin />
                  <p>
                    Sent to{" "}
                    <span className="font-semibold">Central Jakarta</span>
                  </p>
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
