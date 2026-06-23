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
import { CartHoverCard } from "./cartHoverCard/CartHoverCard";
import { PiSquaresFour } from "react-icons/pi";

const TopNav = () => {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto w-full py-2.5">
        <div className="flex w-full items-center justify-stretch gap-5 px-0">
          {/* Branding Navbar */}

          <div className="row-span-2 hidden place-self-center sm:block">
            <Link href="/">
              <h1 className="text-2xl font-bold">GoodGoods</h1>
            </Link>
          </div>

          <InputGroup className="me-3">
            <InputGroupInput placeholder="Search on GoodGoods" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-sm">
                <SearchIcon />
                <span className="sr-only">search</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          <Button
            variant="ghost"
            size="icon-lg"
            className="flex sm:hidden"
            asChild
          >
            <Link href="/notifications">
              <Bell />
              <span className="sr-only">notification</span>
            </Link>
          </Button>

          <CartHoverCard />

          <Separator orientation="vertical" className="hidden sm:block" />

          <UserMenuOrAuthButtons />
        </div>
      </div>
    </div>
  );
};

const BottomNav = () => {
  return (
    <div className="relative w-full border-b border-border">
      <div className="container mx-auto w-full pt-2.5">
        <div className="flex w-full items-baseline justify-between">
          <Button variant="ghost">
            <PiSquaresFour className="size-6" />
            Category
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="rounded-b-none">
                <MapPin />
                Sent to <span className="font-semibold">Central Jakarta</span>
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
  );
};

export default function MainNav() {
  return (
    <header className="sticky top-0 z-100 flex w-full bg-muted">
      <div className="flex w-full flex-col">
        <TopNav />
        <BottomNav />
      </div>
    </header>
  );
}
