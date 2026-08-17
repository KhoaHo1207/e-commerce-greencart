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

  if (isAuthPath) {
    return <>{children}</>;
  }

  return (
    <>
      {isSellerPath ? null : <Navbar />}
      <main
        id="main-content"
        className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}
      >
        {children}
      </main>
      {isSellerPath ? null : <Footer />}
    </>
  );
}
