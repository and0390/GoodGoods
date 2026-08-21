export const productKeys = {
  all: ["products"] as const,
  product: (productId: string) => [...productKeys.all, productId] as const,
};
