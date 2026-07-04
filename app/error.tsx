"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="container mx-auto flex flex-1 flex-col px-4">
        <header className="flex w-full items-start py-6">
          <h1 className="text-2xl font-bold">GoodGoods</h1>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <TriangleAlert className="size-40 text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re currently unavailable at the moment, Please come back
            later
          </p>
          <Button
            onClick={() => unstable_retry()}
            variant="secondary"
            size="lg"
            className="px-20"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
