import type { Product } from "@/types/product";
import type { CartItem } from "./types";

export function addCartItem(
  cartItems: CartItem[],
  products: Product[],
  productId: string,
  quantity = 1,
): CartItem[] {
  if (!Number.isFinite(quantity) || quantity <= 0) return cartItems;

  const existing = cartItems.find((item) => item.product._id === productId);

  if (existing) {
    if (!existing.product.inStock) return cartItems;

    return cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  const product = products.find((item) => item._id === productId);
  if (!product?.inStock) return cartItems;

  return [...cartItems, { product, quantity }];
}

export function updateCartItem(
  cartItems: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] {
  if (!Number.isFinite(quantity)) return cartItems;

  const existing = cartItems.find((item) => item.product._id === productId);
  if (!existing) return cartItems;

  if (quantity <= 0) {
    return removeCartItem(cartItems, productId);
  }

  return cartItems.map((item) =>
    item.product._id === productId ? { ...item, quantity } : item,
  );
}

export function removeCartItem(
  cartItems: CartItem[],
  productId: string,
): CartItem[] {
  return cartItems.filter((item) => item.product._id !== productId);
}
