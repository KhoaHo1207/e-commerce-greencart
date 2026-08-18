"use client";

import { Button } from "@/components/ui/button";
import { assets } from "@/constants/assets";
import { MessageCircle, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useShop } from "../hooks/use-shop";
import {
  formatShopCount,
  formatShopJoined,
  formatShopResponseTime,
} from "../utils/shop";

export default function ShopCard({
  headingAs = "h2",
}: {
  headingAs?: "h1" | "h2";
}) {
  const shop = useShop();
  const pathname = usePathname();
  const isShopPage = pathname === "/shop";
  const Heading = headingAs;

  const stats = [
    {
      label: "Ratings",
      value: `${shop.rating} (${formatShopCount(shop.ratingCount)})`,
    },
    {
      label: "Products",
      value: formatShopCount(shop.productCount),
    },
    {
      label: "Response rate",
      value: `${shop.responseRate}%`,
    },
    {
      label: "Response time",
      value: formatShopResponseTime(shop.responseTimeMinutes),
    },
    {
      label: "Joined",
      value: formatShopJoined(shop.joinedAt),
    },
    {
      label: "Followers",
      value: formatShopCount(shop.followerCount),
    },
  ];

  return (
    <section className="mt-16" aria-labelledby="shop-heading">
      <div className="flex flex-col items-end w-max">
        <Heading id="shop-heading" className="text-2xl font-medium uppercase">
          Shop
        </Heading>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <div className="mt-6 border border-border rounded-lg bg-card p-4 md:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src={shop.avatar}
              alt={`${shop.name} avatar`}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover border border-border shrink-0"
            />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{shop.name}</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <span
                  className={`size-2 rounded-full ${
                    shop.isOnline ? "bg-primary" : "bg-muted-foreground"
                  }`}
                  aria-hidden
                />
                {shop.isOnline ? "Online" : "Offline"}
              </p>
              <div
                className="flex items-center gap-0.5 mt-1"
                aria-label={`Shop rating ${shop.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Image
                    key={i}
                    src={
                      i < Math.round(shop.rating)
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt=""
                    width={12}
                    height={11}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => toast.info("Chat is coming soon.")}
            >
              <MessageCircle />
              Chat now
            </Button>
            {isShopPage ? null : (
              <Button asChild>
                <Link href="/shop">
                  <Store />
                  View shop
                </Link>
              </Button>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5 pt-4 border-t border-border">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="text-sm font-medium text-foreground mt-0.5">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
