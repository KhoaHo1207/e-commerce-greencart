import type { Product } from "@/features/products/types/product.types";
import type { Cart, CartItem } from "../schemas/cart.schema";

export type { Cart, CartItem };

export type CartLine = CartItem & {
  product: Product;
  lineTotal: number;
};

export type CartTotals = {
  itemCount: number;
  uniqueCount: number;
  subtotal: number;
  tax: number;
  total: number;
};
