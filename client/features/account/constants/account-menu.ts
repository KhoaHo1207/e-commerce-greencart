import type { User as UserAccount } from "@/features/auth/types/user.types";
import {
  Heart,
  MapPin,
  Package,
  Store,
  Ticket,
  User,
  type LucideIcon,
} from "lucide-react";

export type AccountMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const ACCOUNT_MENU_ITEMS: AccountMenuItem[] = [
  { label: "My profile", href: "/account", icon: User },
  { label: "My orders", href: "/my-orders", icon: Package },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Addresses", href: "/addresses", icon: MapPin },
  { label: "Vouchers", href: "/vouchers", icon: Ticket },
];

export const SELLER_DASHBOARD_HREF = "/seller/products";

export function getSellerMenuItem(role: UserAccount["role"]): AccountMenuItem {
  if (role === "seller") {
    return { label: "Manage store", href: SELLER_DASHBOARD_HREF, icon: Store };
  }

  return { label: "Become a seller", href: SELLER_DASHBOARD_HREF, icon: Store };
}
