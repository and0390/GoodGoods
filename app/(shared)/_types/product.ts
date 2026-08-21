import { Category } from "./category";
import { DiscountSource, DiscountType } from "./promotion";

export type ProductBase = {
  id: string;
  name: string;
  basePrice: number;
  stock: number;
  slug: string;
  sold: number;
};

export type ProductCartItem = ProductBase & {
  imageUrl: string;
  promotion: {
    id: string;
    discountPercent: number;
    finalPrice: number;
  } | null;
};

export type ProductPreview = ProductBase & {
  imageUrl: string;
  avgRating: number;
  promotion: {
    discountPercent: number;
    finalPrice: number;
    source: DiscountSource;
  } | null;
};

export type ProductDetail = ProductBase & {
  description: string;
  isFavorited: boolean;
  specifications: { name: string; value: string }[];
  favoriteCount: number;
  categories: Category[];
  imageUrls: string[];
  vouchers: {
    id: string;
    name: string;
    type: DiscountType;
    endDate: string;
    minPurchase: number;
  }[];
};

export type ProductsWithCursor = {
  products: ProductPreview[];
  nextCursor: string | null;
};

export type FavoriteProducts = Pick<
  ProductPreview,
  "id" | "imageUrl" | "name" | "basePrice" | "slug"
> & {
  discountPercent: number | null;
  categoryName: string | null;
};
