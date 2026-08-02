import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ThumbnailButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className={cn(
        "relative isolate inline-block size-auto translate-y-0 overflow-hidden rounded-sm bg-transparent p-0 transition-none! hover:bg-transparent",
        className
      )}
      variant="default"
      size="default"
    />
  );
}
