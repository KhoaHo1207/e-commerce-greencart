"use client";

import { useOrders } from "../hooks/use-orders";
import OrderCard from "./order-card";
import OrdersEmpty from "./orders-empty";

export default function OrdersView() {
  const { orders, isSignedIn } = useOrders();

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">My Orders</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      {orders.length === 0 ? (
        <div className="mt-8">
          <OrdersEmpty isSignedIn={isSignedIn} />
        </div>
      ) : (
        <ul className="mt-8 space-y-6">
          {orders.map((order) => (
            <li key={order._id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
