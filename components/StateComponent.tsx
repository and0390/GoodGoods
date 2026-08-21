import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { AlertCircleIcon, InboxIcon, SearchXIcon } from "lucide-react";

function isReactNode(value: unknown): value is React.ReactNode {
  // 1. Check for primitives and empty states
  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return true;
  }

  // 2. Check for valid React elements (JSX objects)
  if (React.isValidElement(value)) {
    return true;
  }

  // 3. Check for arrays/iterables of ReactNodes
  if (Array.isArray(value)) {
    return value.every(isReactNode);
  }

  // 4. Reject objects, functions, or symbols that don't match above
  return false;
}

type MessageAction =
  | React.ReactNode
  | (React.ComponentProps<typeof Button> & { label: React.ReactNode });

function RenderActionButton({ element }: { element: MessageAction }) {
  if (isReactNode(element)) {
    console.log("Here");
    return element;
  }

  return (
    <Button data-slot="state-action" variant="outline" size="lg" {...element}>
      {element.label}
    </Button>
  );
}

type StateComponentProps = {
  icon?: React.ReactNode;
  header: React.ReactNode;
  message?: React.ReactNode;
  variant?: "message" | "error" | "not-found" | "empty";
  action?: MessageAction;
} & React.ComponentProps<"div">;

export default function StateComponent({
  icon,
  header,
  message,
  variant = "message",
  action,
  className,
  ...props
}: StateComponentProps) {
  const defaultIcons = {
    error: <AlertCircleIcon />,
    empty: <InboxIcon />,
    "not-found": <SearchXIcon />,
    message: <></>,
  };
  return (
    <div
      data-variant={variant}
      data-slot="state-container"
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 bg-card md:h-72 [&_svg]:flex-none [&_svg:not([class*='size-'])]:size-[46px] md:[&_svg:not([class*='size-'])]:size-[64px] [&_svg:not([class*='text-'])]:text-primary data-[variant=error]:[&_svg:not([class*='text-'])]:text-destructive",
        className
      )}
      {...props}
    >
      {icon ?? defaultIcons[variant]}

      <h3
        data-slot="state-header"
        className="message-icon-header text-base leading-tight font-medium md:text-lg"
      >
        {header}
      </h3>
      {message && (
        <p
          data-slot="state-message"
          className="message-icon-message text-center text-sm leading-tight font-medium text-muted-foreground md:text-base"
        >
          {message}
        </p>
      )}
      {action && <RenderActionButton element={action} />}
    </div>
  );
}
