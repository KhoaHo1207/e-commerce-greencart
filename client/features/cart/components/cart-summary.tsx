"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/components/providers/app-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CART_TAX_RATE } from "../schemas/cart.schema";
import type { CartTotals } from "../types/cart.types";
import { formatCartMoney } from "../utils/cart";

type CartSummaryProps = {
  totals: CartTotals;
};

export default function CartSummary({ totals }: CartSummaryProps) {
  const { currency, user } = useAppContext();
  const router = useRouter();
  const taxPercent = Math.round(CART_TAX_RATE * 100);

  function handleCheckout() {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    toast.info("Checkout is coming soon.");
  }

  return (
    <aside className="border border-border rounded-lg bg-card p-5 h-fit">
      <h2 className="text-lg font-medium text-foreground">Order Summary</h2>
      <Separator className="my-4" />

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">
            Subtotal ({totals.itemCount}{" "}
            {totals.itemCount === 1 ? "item" : "items"})
          </dt>
          <dd className="font-medium">
            {formatCartMoney(currency, totals.subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Tax ({taxPercent}%)</dt>
          <dd className="font-medium">
            {formatCartMoney(currency, totals.tax)}
          </dd>
        </div>
      </dl>

      <Separator className="my-4" />

      <div className="flex items-center justify-between text-base font-medium">
        <p>Total</p>
        <p className="text-primary">
          {formatCartMoney(currency, totals.total)}
        </p>
      </div>

      <Button
        type="button"
        className="w-full mt-6 h-11"
        onClick={handleCheckout}
      >
        {user ? "Proceed to Checkout" : "Sign in to Checkout"}
      </Button>
    </aside>
  );
}
