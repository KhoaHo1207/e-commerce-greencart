"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { ACCOUNT_MENU_ITEMS } from "@/features/account/constants/account-menu";
import SellerMenuItem from "./seller-menu-item";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const { user, setUser } = useAppContext();

  if (!user) return null;

  return (
    <div className="relative group">
      <button
        type="button"
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        <Image
          src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS3-qUFHc6o5XswicZQl5jKr5cIVdGxgeLQIpUAJ1p_uPEw7AkUVT_ExNQFEeVPAJgFK43j0ug13MfDoEg6iI5tyMWZYNSpCZwYz8wHhPC1affM4V1PrVL-V37f1IvbBF6zPgv9txQuJyY&s=19"
          alt={`${user.fullName} profile`}
          width={32}
          height={32}
          className="rounded-full object-cover size-8"
        />
      </button>

      <div className="absolute right-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-40">
        <div
          role="menu"
          className="bg-background shadow-md border border-border py-2 w-56 rounded-md text-sm"
        >
          <div className="px-3 py-2 border-b border-border">
            <p className="font-medium text-foreground truncate">{user.fullName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          <ul className="py-1">
            {ACCOUNT_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <SellerMenuItem className="flex w-full items-center gap-2 px-3 py-2 hover:bg-primary/10 transition-colors text-left" />
            </li>
          </ul>

          <div className="border-t border-border pt-1">
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-primary/10 transition-colors text-left"
              onClick={() => setUser(null)}
            >
              <LogOut className="size-4 text-muted-foreground" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
