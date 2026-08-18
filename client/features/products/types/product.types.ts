import { StaticImageData } from "next/image";

export type ProductImage = StaticImageData | string;

export type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  offerPrice: number;
  image: ProductImage[];
  rating: number;
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
};
