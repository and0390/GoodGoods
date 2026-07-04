import { ComponentProps } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export type AuthFormSubmitButtonProps = {
  loadingText?: string;
  isLoading: boolean;
} & ComponentProps<typeof Button>;

export function ButtonWithLoader({
  loadingText,
  disabled,
  isLoading,
  children,
  ...props
}: AuthFormSubmitButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
