import {
  Heart,
  MapPin,
  Package,
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
