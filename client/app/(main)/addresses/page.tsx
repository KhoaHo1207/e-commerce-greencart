import AddressesView from "@/features/account/components/addresses-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage delivery addresses for your GreenCart orders.",
};

export default function AddressesPage() {
  return <AddressesView />;
}
