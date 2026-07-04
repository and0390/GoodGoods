import { ExternalToast, toast } from "sonner";
import { Button } from "./button";

export type ToastType = "success" | "error";
export type ToastConfig = {
  type: ToastType;
  message: string;
  label?: string;
  data?: ExternalToast;
} & ExternalToast;

export const toastWithButton = ({
  type,
  message,
  label = "Ok",
  ...data
}: ToastConfig) => {
  const theToast = type === "success" ? toast.success : toast.error;

  let toastId: string | number;

  toastId = theToast(message, {
    action: (
      <Button
        variant="ghost"
        className="ms-(--toast-button-margin-start) mr-(--toast-button-margin-end)"
        onClick={() => toast.dismiss(toastId)}
      >
        {label}
      </Button>
    ),
    ...data,
  });

  return toastId;
};
