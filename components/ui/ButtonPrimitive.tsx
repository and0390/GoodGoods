import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

export default function ButtonPrimitive({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant">) {
  return (
    <Button
      {...props}
      className={cn(
        "relative isolate inline-block size-auto translate-y-0! overflow-hidden rounded-sm bg-transparent p-0 text-foreground transition-none! hover:bg-transparent",
        className
      )}
    />
  );
}

export function ButtonPrimitive2({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button-primitive"
      className={cn(
        "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}
