export type RatingDistribution = Record<1 | 2 | 3 | 4 | 5, number>;

export type Review = {
  id: string;
  userName: string;
  userAvatar: string | null;
  updatedAt: string;
  createdAt: string;
  rating: number;
  content: string | null;
  isLikedByUser: boolean;
  helpfulCount: number;
  imageUrls: string[];
};

export type ReviewSummary = {
  avgRating: number;
  totalReviews: number;
  totalReviewsWithImages: number;
  ratingDistribution: RatingDistribution;
};

export type Rating = {
  distribution: RatingDistribution;
  reviewCount: number;
  avgRating: number;
  reviews: Review[];
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginatedReview = {
  reviews: Review[];
  pagination: Pagination;
};
