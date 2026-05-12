"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthNav() {
  const router = useRouter();
  return (
    <header className="flex w-full justify-center">
      <div className="min flex max-w-md min-w-sm flex-1 justify-start py-2">
        <Button variant="ghost" size="icon-lg" onClick={() => router.back()}>
          <ArrowLeft className="size-6" />
          <span className="sr-only">back</span>
        </Button>
      </div>
    </header>
  );
}
