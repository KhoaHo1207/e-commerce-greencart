import type { StaticImageData } from "next/image";

export type Shop = {
  _id: string;
  slug: string;
  name: string;
  avatar: StaticImageData;
  isOnline: boolean;
  rating: number;
  ratingCount: number;
  productCount: number;
  responseRate: number;
  responseTimeMinutes: number;
  joinedAt: string;
  followerCount: number;
};
