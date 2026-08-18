"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlistItem } from "../hooks/use-wishlist";

export default function WishlistButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { isSaved, toggle } = useWishlistItem(productId);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => {
        toggle();
        toast.success(
          isSaved
            ? `${productName} removed from wishlist`
            : `${productName} added to wishlist`,
        );
      }}
      aria-pressed={isSaved}
      aria-label={
        isSaved
          ? `Remove ${productName} from wishlist`
          : `Add ${productName} to wishlist`
      }
    >
      <Heart
        className={`size-5 ${isSaved ? "fill-primary text-primary" : "text-muted-foreground"}`}
      />
    </Button>
  );
}
