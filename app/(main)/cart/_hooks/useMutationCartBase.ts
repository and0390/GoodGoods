"use client";

import { toastWithButton } from "@/components/ui/toastWithButton";
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

export default function useMutationCartBase<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
>({
  ...options
}: UseMutationOptions<TData, TError, TVariables, TOnMutateResult>) {
  return useMutation<TData, TError, TVariables, TOnMutateResult>({
    ...options,
    onSettled:
      options?.onSettled ??
      ((data, error, variables, onMutateResult, context) => {
        context.client.invalidateQueries({ queryKey: ["cart"], exact: true });
      }),
    onError: (err, newCart, onMutateResult, context) => {
      options?.onError?.(err, newCart, onMutateResult, context);
      console.warn(err);
      toastWithButton({
        type: "error",
        message:
          "Something went wrong, Please check your internet connection and try again later",
      });
    },
  });
}
