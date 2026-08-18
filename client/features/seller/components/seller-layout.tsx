"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import SellerNavbar from "./seller-navbar";
import SellerSidebar from "./seller-sidebar";

export default function SellerLayout({ children }: { children: ReactNode }) {
  const { user } = useAppContext();
  const router = useRouter();
  const allowed = user?.role === "seller";

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    if (user.role !== "seller") {
      router.replace("/");
    }
  }, [user, router]);

  if (!allowed) return null;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <SellerSidebar />
        <SidebarInset id="main-content">
          <SellerNavbar />
          <div className="flex-1 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
