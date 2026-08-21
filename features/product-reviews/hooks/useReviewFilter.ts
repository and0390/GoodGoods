"use client";

import React from "react";
import { reviewReducer, DEFAULT_STATE } from "../utils/reviewReducer";

export default function useReviewFilter() {
  return React.useReducer(reviewReducer, DEFAULT_STATE);
}
