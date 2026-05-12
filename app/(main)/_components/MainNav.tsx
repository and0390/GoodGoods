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
import { MapPin, SearchIcon } from "lucide-react";
import Link from "next/link";
import { UserMenuOrAuthButtons } from "./avatar/UserMenuOrAuthButtons";
import { CartHoverCard } from "./cart/CartHoverCard";

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

      <CartHoverCard />

      <Separator orientation="vertical" />

      <UserMenuOrAuthButtons />
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
