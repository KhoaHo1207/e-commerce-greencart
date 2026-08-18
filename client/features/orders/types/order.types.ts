import type { Product } from "@/features/products/types/product.types";

export const ORDER_STATUSES = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderAddress = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
  phone: string;
};

export type OrderItem = {
  _id: string;
  product: Product;
  quantity: number;
};

export type OrderPaymentType = "Online" | "COD";

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: OrderAddress;
  status: OrderStatus;
  paymentType: OrderPaymentType;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
};
