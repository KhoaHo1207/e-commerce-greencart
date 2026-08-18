import { z } from "zod";

export const CART_STORAGE_KEY = "greencart.cart";
export const CART_ITEM_MAX_QUANTITY = 99;
export const CART_TAX_RATE = 0.02;

export const cartItemQuantitySchema = z
  .number({ error: "Quantity is required" })
  .int({ error: "Quantity must be a whole number" })
  .positive({ error: "Quantity must be greater than 0" })
  .max(CART_ITEM_MAX_QUANTITY, {
    error: `Quantity cannot exceed ${CART_ITEM_MAX_QUANTITY}`,
  });

export const cartUpdateQuantitySchema = z
  .number({ error: "Quantity is required" })
  .int({ error: "Quantity must be a whole number" })
  .min(0, { error: "Quantity cannot be negative" })
  .max(CART_ITEM_MAX_QUANTITY, {
    error: `Quantity cannot exceed ${CART_ITEM_MAX_QUANTITY}`,
  });

export const cartItemSchema = z
  .object({
    productId: z.string().min(1, { error: "Product is required" }),
    quantity: cartItemQuantitySchema,
  })
  .strict();

export const cartSchema = z.array(cartItemSchema);

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;

export function parseCart(value: unknown): Cart | null {
  const result = cartSchema.safeParse(value);
  return result.success ? result.data : null;
}
