import { FilterValue } from "./reviewFilter";

export type PaginationState = {
  filter: FilterValue;
  page: number;
};

export type PaginationAction =
  | {
      type: "SET_FILTER";
      payload: FilterValue;
    }
  | {
      type: "SET_PAGE";
      payload: number;
    }
  | {
      type: "NEXT_PAGE";
      totalPages: number;
    }
  | {
      type: "PREV_PAGE";
    }
  | {
      type: "RESET_PAGE";
    };

export function PaginationReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        filter: action.payload,
        page: 1,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "NEXT_PAGE":
      return {
        ...state,
        page: Math.min(state.page + 1, action.totalPages),
      };

    case "PREV_PAGE":
      return {
        ...state,
        page: Math.max(1, state.page - 1),
      };

    default:
      return state;
  }
}
