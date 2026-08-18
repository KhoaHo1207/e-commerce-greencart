import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistEmpty() {
  return (
    <Empty className="border border-dashed border-border py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Heart />
        </EmptyMedia>
        <EmptyTitle className="text-xl">Your wishlist is empty</EmptyTitle>
        <EmptyDescription>
          Tap the heart on a product and it will show up here.
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
