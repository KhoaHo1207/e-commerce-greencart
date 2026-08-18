import { assets } from "@/constants/assets";
import type { Review } from "@/features/reviews/types/review.types";
import { format } from "date-fns";
import Image from "next/image";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <article className="border border-border rounded-md bg-card p-4 md:p-5">
      <div className="flex items-start gap-3">
        <Image
          src={review.avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-medium text-foreground">{review.name}</p>
            <time
              dateTime={review.dateReview}
              className="text-sm text-muted-foreground"
            >
              {format(new Date(review.dateReview), "MMM d, yyyy")}
            </time>
          </div>
          <div
            className="flex items-center gap-0.5 mt-1"
            aria-label={`Rating ${review.rating} out of 5`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Image
                key={i}
                src={
                  i < Math.round(review.rating)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt=""
                width={14}
                height={13}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {review.content}
      </p>

      {review.imageReview.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mt-4">
          {review.imageReview.map((image, index) => (
            <li key={`${review.name}-${index}`}>
              <Image
                src={image}
                alt={`Photo ${index + 1} from ${review.name}`}
                width={72}
                height={72}
                className="size-16 object-contain rounded border border-border bg-background"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
