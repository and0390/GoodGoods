"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { IconType } from "react-icons/lib";
import { VscDebugDisconnect, VscError, VscLock } from "react-icons/vsc";

type ErrorConfigBase = {
  Icon: IconType;
  title: string;
  desc: string;
};

type ErrorConfig =
  | (ErrorConfigBase & {
      action: () => void;
      actionLabel: string;
    })
  | (ErrorConfigBase & {
      action?: never;
      actionLabel?: never;
    });

const gridVariants = cva("grid", {
  variants: {
    variant: {
      linear:
        "grid-col-1 gap-y-1 [&_.desc]:max-w-65 [&_.title]:mt-2 [&>.desc-container]:justify-self-center [&>.icon-container]:justify-self-center",
      grid: "gap-x-4 gap-y-2 [&_.desc]:max-w-80 [&_.desc]:text-start",
    },
    size: {
      default: "[&>.icon-container>.icon]:size-23",
      lg: "[&>.icon-container>.icon]:size-30",
    },
    row: {
      two: "grid-cols-[auto_1fr] grid-rows-[auto_1fr] [&>.icon-container]:row-span-2",
      three:
        "grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] [&_.action-container]:col-start-2 [&_.action-container]:row-start-3 [&>.icon-container]:row-span-3",
    },
  },
  defaultVariants: {
    variant: "linear",
    size: "default",
  },
});

export const CartPreviewError = ({
  className,
  variant = "linear",
  size = "default",
  statusCode,
  onRetry,
  ...props
}: ComponentProps<"div"> & {
  statusCode?: number;
  onRetry?: () => void;
} & Pick<VariantProps<typeof gridVariants>, "variant" | "size">) => {
  const router = useRouter();

  const getErrorConfig = (): ErrorConfig => {
    if (statusCode === 401 || statusCode === 403) {
      return {
        Icon: VscLock,
        title: "Session has expired",
        desc: "Please log in again to gain your access to your account",
        actionLabel: "Back to Log In",
        action: () => router.push("/login"),
      };
    }

    if (statusCode && statusCode >= 500) {
      return {
        Icon: VscError,
        title: "Internal Server Error",
        desc: "Our systems are having some problems right now, We'll come back later!",
        actionLabel: "Try Again",
        action: () => onRetry,
      };
    }

    return {
      Icon: VscDebugDisconnect,
      title: "Connection Lost",
      desc: "Looks like something isn't quite right, Please check your internet connection and try again later",
      action: () => onRetry,
      actionLabel: "Try Again",
    };
  };

  const Icon = getErrorConfig().Icon;

  return (
    <div
      className={cn("flex h-78 w-full items-center justify-center", className)}
      {...props}
    >
      <div
        className={gridVariants({
          variant,
          size,
          row: onRetry ? "three" : "two",
        })}
      >
        <div className="icon-container">
          {<Icon className="icon text-primary" />}
        </div>
        <div className="title-container">
          <p className="title text-xl font-semibold">
            {getErrorConfig().title}{" "}
            {statusCode && (
              <span className="font-mono font-extrabold">[{statusCode}]</span>
            )}
          </p>
        </div>
        <div className="desc-container">
          <p className="desc text-center text-sm text-muted-foreground">
            {getErrorConfig().desc}
          </p>
        </div>
        {onRetry && (
          <div className="action-container">
            <Button size="lg" onClick={onRetry} className="px-12">
              {getErrorConfig().actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
