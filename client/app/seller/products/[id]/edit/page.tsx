import SellerEditProduct from "@/features/seller/components/seller-edit-product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit product",
};

export default function SellerEditProductPage() {
  return <SellerEditProduct />;
}
