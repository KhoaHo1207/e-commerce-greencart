import { z } from "zod";
import { ORDER_STATUSES } from "../types/order.types";

export const ORDER_PATCH_STORAGE_KEY = "greencart.orders";

export const orderStatusSchema = z.enum(ORDER_STATUSES);

export const orderPatchSchema = z
  .object({
    orderId: z.string().min(1),
    status: orderStatusSchema,
    isPaid: z.boolean(),
  })
  .strict();

export const orderPatchesSchema = z.array(orderPatchSchema);

export type OrderPatch = z.infer<typeof orderPatchSchema>;
export type OrderPatches = z.infer<typeof orderPatchesSchema>;

export function parseOrderPatches(value: unknown): OrderPatches | null {
  const result = orderPatchesSchema.safeParse(value);
  return result.success ? result.data : null;
}
