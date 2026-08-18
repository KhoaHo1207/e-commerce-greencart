import type { Product } from "@/features/products/types/product.types";
import {
  CART_ITEM_MAX_QUANTITY,
  CART_TAX_RATE,
  cartItemQuantitySchema,
  cartUpdateQuantitySchema,
  type Cart,
} from "../schemas/cart.schema";
import type { CartLine, CartTotals } from "../types/cart.types";

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function addCartItem(
  cartItems: Cart,
  products: Product[],
  productId: string,
  quantity = 1,
): Cart {
  const parsedQuantity = cartItemQuantitySchema.safeParse(quantity);
  if (!parsedQuantity.success) return cartItems;

  const product = products.find((item) => item._id === productId);
  if (!product?.inStock) return cartItems;

  const existing = cartItems.find((item) => item.productId === productId);

  if (existing) {
    const nextQuantity = Math.min(
      existing.quantity + parsedQuantity.data,
      CART_ITEM_MAX_QUANTITY,
    );

    return cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: nextQuantity }
        : item,
    );
  }

  return [
    ...cartItems,
    { productId, quantity: parsedQuantity.data },
  ];
}

export function updateCartItem(
  cartItems: Cart,
  productId: string,
  quantity: number,
): Cart {
  const parsedQuantity = cartUpdateQuantitySchema.safeParse(quantity);
  if (!parsedQuantity.success) return cartItems;

  const existing = cartItems.find((item) => item.productId === productId);
  if (!existing) return cartItems;

  if (parsedQuantity.data === 0) {
    return removeCartItem(cartItems, productId);
  }

  return cartItems.map((item) =>
    item.productId === productId
      ? { ...item, quantity: parsedQuantity.data }
      : item,
  );
}

export function removeCartItem(cartItems: Cart, productId: string): Cart {
  return cartItems.filter((item) => item.productId !== productId);
}

export function clearCartItems(): Cart {
  return [];
}

export function pruneCart(cartItems: Cart, products: Product[]): Cart {
  const productIds = new Set(products.map((product) => product._id));
  return cartItems.filter((item) => productIds.has(item.productId));
}

export function getCartLineCount(cartItems: Cart): number {
  return cartItems.length;
}

export function getCartUnitCount(cartItems: Cart): number {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

/** Badge count: unique product types (lines), not total units. */
export function getCartItemCount(cartItems: Cart): number {
  return getCartLineCount(cartItems);
}

export function getCartItemQuantity(
  cartItems: Cart,
  productId: string,
): number {
  return (
    cartItems.find((item) => item.productId === productId)?.quantity ?? 0
  );
}

export function resolveCartLines(
  cartItems: Cart,
  products: Product[],
): CartLine[] {
  return cartItems.flatMap((item) => {
    const product = products.find((entry) => entry._id === item.productId);
    if (!product) return [];

    return [
      {
        ...item,
        product,
        lineTotal: roundMoney(product.offerPrice * item.quantity),
      },
    ];
  });
}

export function getCartTotals(lines: CartLine[]): CartTotals {
  const unitCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = roundMoney(
    lines.reduce((sum, line) => sum + line.lineTotal, 0),
  );
  const tax = roundMoney(subtotal * CART_TAX_RATE);
  const total = roundMoney(subtotal + tax);

  return {
    itemCount: unitCount,
    uniqueCount: lines.length,
    subtotal,
    tax,
    total,
  };
}

export function formatCartMoney(currency: string, amount: number) {
  return `${currency}${amount.toFixed(2)}`;
}
