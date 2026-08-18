import SellerLayout from "@/features/seller/components/seller-layout";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Seller",
    template: "%s | Seller | GreenCart",
  },
  description: "Manage your GreenCart store, products, and orders.",
};

export default function SellerRootLayout({ children }: { children: ReactNode }) {
  return <SellerLayout>{children}</SellerLayout>;
}
