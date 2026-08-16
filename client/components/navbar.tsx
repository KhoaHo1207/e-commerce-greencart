"use client";

import { useAppContext } from "@/contexts/app-provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Products",
    href: "/products",
  },
  {
    label: "My Orders",
    href: "/my-orders",
    auth: true,
  },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { user, setUser } = useAppContext();
  const visibleMenuItems = menuItems.filter((item) => !item.auth || user);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-border bg-background relative transition-all">
      <Logo />

      <div className="hidden sm:flex items-center gap-8">
        {visibleMenuItems.map((item) => (
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
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <div className="hidden lg:flex items-center text-sm gap-2 border border-border px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-muted-foreground"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-primary-foreground bg-primary w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        {!user ? (
          <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary/80 transition text-primary-foreground rounded-full">
            Login
          </button>
        ) : (
          <div className="relative group">
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS3-qUFHc6o5XswicZQl5jKr5cIVdGxgeLQIpUAJ1p_uPEw7AkUVT_ExNQFEeVPAJgFK43j0ug13MfDoEg6iI5tyMWZYNSpCZwYz8wHhPC1affM4V1PrVL-V37f1IvbBF6zPgv9txQuJyY&s=19"
              }
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full object-cover size-8"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-background shadow border border-border py-2.5 w-30 rounded-md text-sm z-40">
              <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                <Link href="/my-orders">My Orders</Link>
              </li>
              <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                <button onClick={() => setUser(null)}>Logout</button>
              </li>
            </ul>
          </div>
        )}

        <ModeToggle />
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
        >
          <rect width="21" height="1.5" rx=".75" fill="currentColor" />
          <rect
            x="8"
            y="6"
            width="13"
            height="1.5"
            rx=".75"
            fill="currentColor"
          />
          <rect
            x="6"
            y="13"
            width="15"
            height="1.5"
            rx=".75"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-background shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        {visibleMenuItems.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            {item.label}
          </Link>
        ))}
        {!user ? (
          <Link href="/login" className="block">
            Login
          </Link>
        ) : (
          <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary/80 transition text-primary-foreground rounded-full text-sm">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
