import type { Review, ReviewRatingFilter } from "../types/review.types";

export const REVIEWS_PAGE_SIZE = 5;
export const REVIEW_RATING_OPTIONS: ReviewRatingFilter[] = [
  "all",
  5,
  4,
  3,
  2,
  1,
];

export function filterReviews(
  reviews: Review[],
  rating: ReviewRatingFilter,
) {
  if (rating === "all") return reviews;
  return reviews.filter((review) => Math.round(review.rating) === rating);
}

export function paginateReviews(
  reviews: Review[],
  page: number,
  pageSize = REVIEWS_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(reviews.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: reviews.slice(start, start + pageSize),
    currentPage,
    totalPages,
    totalItems: reviews.length,
  };
}

export function getReviewRatingCounts(reviews: Review[]) {
  const counts = {
    all: reviews.length,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (const review of reviews) {
    const star = Math.round(review.rating);
    if (star >= 1 && star <= 5) {
      counts[star as 1 | 2 | 3 | 4 | 5] += 1;
    }
  }

  return counts;
}
