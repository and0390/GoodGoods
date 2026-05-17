"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const TriggerToast = () => {
  return (
    <Button onClick={() => toast.success("This is a toaster")}>Toast</Button>
  );
};
