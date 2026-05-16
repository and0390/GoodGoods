import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const EmptyWishlist = () => {
  return (
    <div className="relative flex size-40 items-center justify-center">
      {/* glow background */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />

      <svg
        viewBox="0 0 200 200"
        className="size-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* floating shape */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="currentColor"
          className="text-primary/20"
        />

        {/* box */}
        <rect
          x="60"
          y="85"
          width="80"
          height="50"
          rx="10"
          className="fill-background stroke-border"
          strokeWidth="2"
        />

        {/* heart */}
        <path
          d="M100 70c-6-10-20-10-20 4 0 14 20 26 20 26s20-12 20-26c0-14-14-14-20-4z"
          className="fill-primary/30"
        />

        {/* dots */}
        <circle cx="55" cy="60" r="3" className="fill-muted-foreground/40" />
        <circle cx="150" cy="65" r="2.5" className="fill-muted-foreground/30" />
        <circle cx="140" cy="140" r="3" className="fill-muted-foreground/40" />
      </svg>
    </div>
  );
};

export const CartPreviewEmpty = () => {
  return (
    <div className="flex w-full flex-col items-center pb-7">
      <EmptyWishlist />
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg font-semibold">Your cart seems empty</h1>
        <p className="text-base text-muted-foreground">
          let&apos;s start shopping!
        </p>
        <Button size="lg" asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    </div>
  );
};
