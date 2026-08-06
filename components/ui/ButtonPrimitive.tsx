import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ButtonPrimitive({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size">) {
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
