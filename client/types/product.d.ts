import { StaticImageData } from "next/image";

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  image: StaticImageData[];
  rating: number;
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
};
