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

type DefinedInitialDataOptionsWithoutKey<TError, TData> = Omit<
  DefinedInitialDataOptions<Cart, TError, TData, string[]>,
  "queryKey"
>;
type UndefinedInitialDataOptionsWithoutKey<TError, TData> = Omit<
  UndefinedInitialDataOptions<Cart, TError, TData, string[]>,
  "queryKey"
>;
type UseQueryOptionsWithoutKey<TError, TData> = Omit<
  UseQueryOptions<Cart, TError, TData, string[]>,
  "queryKey"
>;

export function useCartQuery<TError = DefaultError, TData = Cart>(
  options: DefinedInitialDataOptionsWithoutKey<TError, TData>
): DefinedUseQueryResult<NoInfer<TData>, TError>;

export function useCartQuery<TError = DefaultError, TData = Cart>(
  options: UndefinedInitialDataOptionsWithoutKey<TError, TData>
): UseQueryResult<NoInfer<TData>, TError>;

export function useCartQuery<TError = DefaultError, TData = Cart>(
  options: UseQueryOptionsWithoutKey<TError, TData>
): UseQueryResult<NoInfer<TData>, TError>;

export function useCartQuery<TError = DefaultError, TData = Cart>(
  options:
    | UseQueryOptionsWithoutKey<TError, TData>
    | DefinedInitialDataOptionsWithoutKey<TError, TData>
    | UndefinedInitialDataOptionsWithoutKey<TError, TData>
):
  | UseQueryResult<NoInfer<TData>, TError>
  | UseQueryResult<NoInfer<TData>, TError>
  | DefinedUseQueryResult<NoInfer<TData>, TError> {
  return useQuery<Cart, TError, TData, string[]>({
    ...options,
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
  });
}
