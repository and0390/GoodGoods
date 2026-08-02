"use client";

import React from "react";
import {
  reviewPaginationReducer,
  DEFAULT_STATE,
} from "../utis/reviewPaginationReducer";

export default function useReviewFilter() {
  return React.useReducer(reviewPaginationReducer, DEFAULT_STATE);
}
