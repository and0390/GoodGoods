import { ReviewRating } from "./reviewFilter";

export type ReviewPaginationState = {
  rating: ReviewRating | null;
  page: number;
  hasImages: boolean;
  hasReviews: boolean;
};

export const DEFAULT_STATE: ReviewPaginationState = {
  page: 1,
  hasImages: false,
  hasReviews: false,
  rating: null,
} as const;

export type ReviewPaginationAction =
  | {
      type: "SET_RATING";
      rating: ReviewRating | null;
    }
  | {
      type: "SET_HAS_IMAGES";
      value: boolean;
    }
  | {
      type: "SET_HAS_REVIEWS";
      value: boolean;
    }
  | {
      type: "SET_PAGE";
      page: number;
    }
  | {
      type: "NEXT_PAGE";
      totalPages: number;
    }
  | {
      type: "PREV_PAGE";
    }
  | {
      type: "RESET_STATE";
    };

export function reviewPaginationReducer(
  state: ReviewPaginationState,
  action: ReviewPaginationAction
): ReviewPaginationState {
  switch (action.type) {
    case "SET_RATING":
      return {
        ...state,
        rating: action.rating,
      };

    case "SET_HAS_IMAGES":
      return {
        ...state,
        hasImages: action.value,
      };

    case "SET_HAS_REVIEWS":
      return {
        ...state,
        hasReviews: action.value,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };

    case "NEXT_PAGE":
      return {
        ...state,
        page: Math.min(state.page + 1, action.totalPages),
      };

    case "RESET_STATE":
      return { ...DEFAULT_STATE };

    case "PREV_PAGE":
      return {
        ...state,
        page: Math.max(1, state.page - 1),
      };

    default:
      return state;
  }
}
