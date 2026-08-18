"use client";

import ReviewFilter from "@/features/reviews/components/review-filter";
import ReviewItem from "@/features/reviews/components/review-item";
import ReviewPagination from "@/features/reviews/components/review-pagination";
import { useReviews } from "@/features/reviews/hooks/use-reviews";

export default function ReviewSection() {
  const {
    items,
    totalItems,
    totalAll,
    rating,
    counts,
    currentPage,
    totalPages,
    setRating,
    setPage,
  } = useReviews();

  return (
    <section className="mt-16" aria-labelledby="reviews-heading">
      <div className="flex flex-col items-end w-max">
        <h2 id="reviews-heading" className="text-2xl font-medium uppercase">
          Reviews ({totalAll})
        </h2>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <ReviewFilter
        rating={rating}
        counts={counts}
        onRatingChange={setRating}
      />

      <p className="mt-6">
        Results: <span className="font-bold text-primary">{totalItems}</span>{" "}
        found
      </p>

      {items.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {items.map((review) => (
            <li key={`${review.name}-${review.dateReview}`}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-muted-foreground italic">
          No reviews in this rating.
        </p>
      )}

      <ReviewPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
