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
import { CartHoverCard } from "../cart/_components/hover-card/CartHoverCard";
import { PiSquaresFour } from "react-icons/pi";
import { IconCategory } from "@tabler/icons-react";

const TopNav = () => {
  return (
    <div className="w-full border-b border-sidebar-border">
      <div className="container mx-auto flex w-full items-center pt-7 pb-4">
        {/* Branding Navbar */}

        <div className="me-20">
          <Link href="/">
            <h1 className="text-3xl font-bold">GoodGoods</h1>
          </Link>
        </div>

        <InputGroup className="me-9">
          <InputGroupInput placeholder="Search on GoodGoods" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-sm">
              <SearchIcon />
              <span className="sr-only">search</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-6">
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
    <div className="relative w-full border-b border-sidebar-border">
      <div className="container mx-auto w-full pt-4">
        <div className="flex w-full justify-between">
          <Button variant="ghost" size="lg" className="font-medium">
            <IconCategory />
            Category
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg" className="rounded-b-none">
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
    <header className="sticky top-0 z-100 hidden w-full bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex w-full flex-col">
        <TopNav />
        <BottomNav />
      </div>
    </header>
  );
}
