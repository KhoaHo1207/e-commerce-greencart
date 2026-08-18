import { List, Package, Plus, type LucideIcon } from "lucide-react";

export type SellerNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const SELLER_NAV_ITEMS: SellerNavItem[] = [
  { label: "Product list", href: "/seller/products", icon: List },
  { label: "Add product", href: "/seller/products/add", icon: Plus },
  { label: "Orders", href: "/seller/orders", icon: Package },
];
