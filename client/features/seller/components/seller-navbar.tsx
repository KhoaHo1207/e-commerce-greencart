"use client";

import Logo from "@/components/layout/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "@/features/account/components/user-menu";
import { Store } from "lucide-react";
import Link from "next/link";

export default function SellerNavbar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 md:px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="min-w-0 shrink">
        <Logo />
      </div>
      <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
        Seller
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <Store className="size-4" />
            <span className="hidden sm:inline">Back to shop</span>
          </Link>
        </Button>
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
