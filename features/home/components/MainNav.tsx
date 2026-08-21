import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CartHoverCardStreaming } from "@/features/cart/components/CartHoverCardStreaming";
import { cn } from "@/lib/utils";
import { IconCategory } from "@tabler/icons-react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { AuthActions } from "../../../app/(main)/_components/avatar/AuthActions";
import HeaderSearch from "./HeaderSearch";
import TopNav from "./TopNav";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

// const TopNav = () => {
//   return (
//     <div className="w-full border-b border-sidebar-border">
//       <div className="container mx-auto flex w-full items-center pt-7 pb-4">
//         {/* Branding Navbar */}

//         <div className="me-20">
//           <Link href="/">
//             <h1 className="text-3xl font-bold">GoodGoods</h1>
//           </Link>
//         </div>

//         {/* <InputGroup className="me-9">
//           <InputGroupInput placeholder="Search on GoodGoods" />
//           <InputGroupAddon align="inline-end">
//             <InputGroupButton size="icon-sm">
//               <SearchIcon />
//               <span className="sr-only">search</span>
//             </InputGroupButton>
//           </InputGroupAddon>
//         </InputGroup> */}
//         {/*
//          <InputGroup className="h-9 p-1 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
//         <InputGroupInput placeholder="Search on GoodGoods" className="h-7" />
//         <InputGroupAddon align="inline-end" className="p-0 has-[>button]:mr-0">
//           <InputGroupButton
//             size="icon-sm"
//             variant="default"
//             className="size-7 rounded-full border-0"
//           >
//             <SearchIcon />
//             <span className="sr-only">search</span>
//           </InputGroupButton>
//         </InputGroupAddon>
//       </InputGroup> */}

//         <SearchBar />

//         <div className="flex items-center gap-6">
//           <CartHoverCardStreaming />

//           <Separator orientation="vertical" className="hidden sm:block" />

//           <AuthActions />
//         </div>
//       </div>
//     </div>
//   );
// };

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

export default function MainNav({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-100 w-full bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div className="flex w-full flex-col">
        <TopNav
          authActions={<AuthActions />}
          cartAction={<CartHoverCardStreaming />}
        />
        <BottomNav />
      </div>
    </header>
  );
}
