import type { StaticImageData } from "next/image";

export type Review = {
  avatar: StaticImageData;
  name: string;
  rating: number;
  dateReview: string;
  imageReview: StaticImageData[];
  content: string;
};

export type ReviewRatingFilter = "all" | 1 | 2 | 3 | 4 | 5;
