export type Distribution = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

export type Review = {
  id: string;
  userName: string;
  updatedAt: Date;
  rating: number;
  content: string | null;
  isThumbsUp: boolean;
  helpfulCount: number;
};

export type Rating = {
  distribution: Distribution;
  reviewCount: number;
  avgRating: number;
  reviews: Review[];
};
