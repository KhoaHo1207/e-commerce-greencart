"use client";

import Logo from "@/components/layout/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useAppContext } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserMenu from "@/features/account/components/user-menu";
import { ACCOUNT_MENU_ITEMS } from "@/features/account/constants/account-menu";
import CartIcon from "@/features/cart/components/cart-icon";
import ProductSearch from "@/features/products/components/product-search";
import { cn } from "@/lib/utils";
import { LogOut, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Products",
    href: "/products",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser } = useAppContext();

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-border bg-background relative transition-all">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="flex items-center justify-between gap-3 px-6 md:px-16 lg:px-24 xl:px-32 py-3 md:py-4">
        <div className="min-w-0 shrink">
          <Logo />
        </div>

        <nav aria-label="Primary" className="hidden sm:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                pathname === item.href ? "text-primary" : "text-foreground"
              } font-medium transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-8">
          <Suspense fallback={<SearchFallback className="hidden lg:flex w-52" />}>
            <ProductSearch id="site-search" className="hidden lg:flex w-52" />
          </Suspense>

          <button
            type="button"
            className="lg:hidden text-foreground"
            onClick={toggleSearch}
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
          >
            <Search className="size-5" />
          </button>

          <CartIcon />

          {!user ? (
            <Link
              href="/sign-in"
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary/80 transition text-primary-foreground rounded-full"
            >
              Login
            </Link>
          ) : (
            <UserMenu />
          )}

          <ModeToggle />
        </div>

        <div className="flex shrink-0 items-center sm:hidden -mr-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
          >
            <Search className="size-5" />
          </Button>
          <CartIcon />
          <Sheet
            open={menuOpen}
            onOpenChange={(open) => {
              setMenuOpen(open);
              if (open) setSearchOpen(false);
            }}
          >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 px-4 py-3"
              >
                {menuItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 font-medium transition-colors hover:bg-muted",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/cart"
                    className="rounded-md px-3 py-2 font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Cart
                  </Link>
                </SheetClose>

                {user
                  ? ACCOUNT_MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-foreground transition-colors hover:bg-muted"
                          >
                            <Icon className="size-4 text-muted-foreground" />
                            {item.label}
                          </Link>
                        </SheetClose>
                      );
                    })
                  : null}
              </nav>

              <SheetFooter>
                <div className="flex items-center justify-between gap-3 pb-1">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ModeToggle />
                </div>
                {!user ? (
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/sign-in">Login</Link>
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setUser(null)}
                    >
                      <LogOut className="size-4" />
                      Logout
                    </Button>
                  </SheetClose>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen ? (
        <div
          id="mobile-search"
          className="lg:hidden px-6 md:px-16 lg:px-24 xl:px-32 pb-4"
        >
          <Suspense fallback={<SearchFallback className="w-full" />}>
            <ProductSearch
              id="site-search-mobile"
              className="w-full"
              autoFocus
            />
          </Suspense>
        </div>
      ) : null}
    </header>
  );
}

function SearchFallback({ className }: { className?: string }) {
  return (
    <div
      className={`h-9 border border-border rounded-full ${className ?? ""}`}
      aria-hidden
    />
  );
}
