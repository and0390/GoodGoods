import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { Cart } from "@/app/(shared)/_types/cart";
import {
  DefaultError,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  UndefinedInitialDataOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type DefinedInitialDataOptionCart<TError, TData> = Pick<
  DefinedInitialDataOptions<Cart, TError, TData, string[]>,
  "enabled" | "initialData"
>;
type UndefinedInitialDataOptionsCart<TError, TData> = Pick<
  UndefinedInitialDataOptions<Cart, TError, TData, string[]>,
  "enabled" | "initialData"
>;
type UseQueryOptionsCart<TError, TData> = Pick<
  UseQueryOptions<Cart, TError, TData, string[]>,
  "enabled" | "initialData"
>;

export function useCartQuery<TError = DefaultError>(
  options: DefinedInitialDataOptionCart<TError, Cart>
): DefinedUseQueryResult<NoInfer<Cart>, TError>;

export function useCartQuery<TError = DefaultError>(
  options: UndefinedInitialDataOptionsCart<TError, Cart>
): UseQueryResult<NoInfer<Cart>, TError>;

export function useCartQuery<TError = DefaultError>(
  options: UseQueryOptionsCart<TError, Cart>
): UseQueryResult<NoInfer<Cart>, TError>;

export function useCartQuery<TError = DefaultError>(
  options:
    | UseQueryOptionsCart<TError, Cart>
    | DefinedInitialDataOptionCart<TError, Cart>
    | UndefinedInitialDataOptionsCart<TError, Cart>
):
  | UseQueryResult<NoInfer<Cart>, TError>
  | UseQueryResult<NoInfer<Cart>, TError>
  | DefinedUseQueryResult<NoInfer<Cart>, TError> {
  return useQuery<Cart, TError, Cart, string[]>({
    queryKey: ["cart"],
    queryFn: async ({ signal }) => {
      const { body } = apiSchema.parse(
        await fetcher.get("/api/cart", { signal })
      );
      return body as Cart;
    },
    staleTime: 300000, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  });
}
