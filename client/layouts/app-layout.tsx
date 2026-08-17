"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const pathname = usePathname();

  const isSellerPath = pathname.startsWith("/seller");

  const isAuthPath =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  return (
    <>
      {isSellerPath || isAuthPath ? null : <Navbar />}
      <main className={`${isSellerPath ? "" : "md:px-16 lg:px-24 xl:px-32"}`}>
        {children}
      </main>
      {isSellerPath || isAuthPath ? null : <Footer />}
    </>
  );
}
