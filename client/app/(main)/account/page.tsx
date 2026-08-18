import AccountView from "@/features/account/components/account-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your GreenCart account details.",
};

export default function AccountPage() {
  return <AccountView />;
}
