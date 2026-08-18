"use client";

import { useWishlist } from "../hooks/use-wishlist";
import WishlistEmpty from "./wishlist-empty";
import WishlistItem from "./wishlist-item";

export default function WishlistView() {
  const { items, isEmpty } = useWishlist();

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">Wishlist</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      {isEmpty ? (
        <div className="mt-8">
          <WishlistEmpty />
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mt-8">
          {items.map((product) => (
            <li key={product._id} className="min-w-0">
              <WishlistItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
