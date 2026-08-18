import AccountPlaceholder from "@/features/account/components/account-placeholder";
import { Ticket } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vouchers",
  description: "View your GreenCart vouchers and promo codes.",
};

export default function VouchersPage() {
  return (
    <AccountPlaceholder
      title="Vouchers"
      description="Promo codes and shop vouchers will appear here when you have them."
      icon={Ticket}
    />
  );
}
