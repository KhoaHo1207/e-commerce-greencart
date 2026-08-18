"use client";

import { dummyReviews } from "@/constants/assets";
import { useCallback, useMemo, useState } from "react";
import type { Review, ReviewRatingFilter } from "../types/review.types";
import {
  filterReviews,
  getReviewRatingCounts,
  paginateReviews,
} from "../utils/reviews";

export function useReviews() {
  const reviews = dummyReviews as Review[];
  const [rating, setRatingState] = useState<ReviewRatingFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterReviews(reviews, rating),
    [rating, reviews],
  );

  const counts = useMemo(() => getReviewRatingCounts(reviews), [reviews]);

  const pagination = useMemo(
    () => paginateReviews(filtered, page),
    [filtered, page],
  );

  const setRating = useCallback((next: ReviewRatingFilter) => {
    setRatingState(next);
    setPage(1);
  }, []);

  return {
    ...pagination,
    rating,
    counts,
    totalAll: reviews.length,
    setRating,
    setPage,
  };
}
