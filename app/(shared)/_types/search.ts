export type SearchQuery = {
  products: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
  }[];
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export type PopularSearch = {
  query: string;
  imageUrl: string;
};
