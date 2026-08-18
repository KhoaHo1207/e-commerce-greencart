"use client";

import { REVIEW_RATING_OPTIONS } from "@/features/reviews/utils/reviews";
import type { ReviewRatingFilter } from "@/features/reviews/types/review.types";

function filterLabel(rating: ReviewRatingFilter) {
  return rating === "all" ? "All" : `${rating} Star${rating === 1 ? "" : "s"}`;
}

type ReviewFilterProps = {
  rating: ReviewRatingFilter;
  counts: Record<ReviewRatingFilter, number>;
  onRatingChange: (rating: ReviewRatingFilter) => void;
};

export default function ReviewFilter({
  rating,
  counts,
  onRatingChange,
}: ReviewFilterProps) {
  return (
    <nav aria-label="Filter reviews by rating" className="mt-8">
      <ul className="flex flex-wrap gap-2 items-center">
        {REVIEW_RATING_OPTIONS.map((option) => {
          const isActive = option === rating;

          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => onRatingChange(option)}
                aria-pressed={isActive}
                className={`text-sm border border-border rounded px-4 py-2 hover:bg-muted transition-all duration-300 ${
                  isActive ? "bg-muted" : ""
                }`}
              >
                {filterLabel(option)} ({counts[option]})
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
