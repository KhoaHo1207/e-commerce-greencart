import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartEmpty() {
  return (
    <Empty className="border border-dashed border-border py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle className="text-xl">Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Add fresh groceries to your cart and they will show up here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
