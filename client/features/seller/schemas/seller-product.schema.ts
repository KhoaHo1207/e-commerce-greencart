import { z } from "zod";

export const SELLER_PRODUCT_MAX_IMAGES = 4;

export const sellerProductSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(2, { error: "Name must be at least 2 characters" })
      .max(80, { error: "Name cannot exceed 80 characters" }),
    category: z
      .string({ error: "Category is required" })
      .min(1, { error: "Category is required" }),
    price: z
      .number({ error: "Price is required" })
      .positive({ error: "Price must be greater than 0" }),
    offerPrice: z
      .number({ error: "Offer price is required" })
      .positive({ error: "Offer price must be greater than 0" }),
    description: z
      .string({ error: "Description is required" })
      .trim()
      .min(4, { error: "Description must be at least 4 characters" }),
    inStock: z.boolean(),
  })
  .strict()
  .refine((value) => value.offerPrice <= value.price, {
    error: "Offer price cannot exceed price",
    path: ["offerPrice"],
  });

export type SellerProductSchema = z.infer<typeof sellerProductSchema>;
