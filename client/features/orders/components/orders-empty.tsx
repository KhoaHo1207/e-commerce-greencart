import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Package } from "lucide-react";
import Link from "next/link";

export default function OrdersEmpty({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  return (
    <Empty className="border border-dashed border-border py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Package />
        </EmptyMedia>
        <EmptyTitle className="text-xl">
          {isSignedIn ? "No orders yet" : "Sign in to see your orders"}
        </EmptyTitle>
        <EmptyDescription>
          {isSignedIn
            ? "When you place an order, it will show up here."
            : "Log in to view your past grocery orders and buy items again."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href={isSignedIn ? "/products" : "/sign-in"}>
            {isSignedIn ? "Browse products" : "Sign in"}
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
