import { Category } from "./category";

export type ProductBase = {
  id: string;
  name: string;
  price: number;
  stock: number;
  slug: string;
};

export type ProductPreview = ProductBase & { imageUrl: string };

export type ProductDetail = ProductBase & {
  description: string;
  sold: number;
  isFavorited: boolean;
  specifications: { name: string; value: string }[];
  favoritesCount: number;
  categories: Category[];
  imageUrls: string[];
};
