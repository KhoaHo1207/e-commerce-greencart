"use client";

import { useAppContext } from "@/components/providers/app-provider";
import {
  getSellerMenuItem,
  SELLER_DASHBOARD_HREF,
} from "@/features/account/constants/account-menu";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import { toast } from "sonner";

export default function SellerMenuItem({
  className,
}: {
  className?: string;
}) {
  const { user, setIsSeller } = useAppContext();
  const router = useRouter();

  if (!user) return null;

  const item = getSellerMenuItem(user.role);
  const Icon = item.icon;
  const isSeller = user.role === "seller";

  return (
    <button
      type="button"
      role="menuitem"
      className={className}
      onClick={() => {
        if (!isSeller) {
          flushSync(() => setIsSeller(true));
          toast.success("You are now a seller");
        }
        router.push(SELLER_DASHBOARD_HREF);
      }}
    >
      <Icon className="size-4 text-muted-foreground" />
      {item.label}
    </button>
  );
}
