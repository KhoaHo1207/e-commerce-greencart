"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const pathname = usePathname();

  const isAuthPath =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isAuthPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="px-6 md:px-16 lg:px-24 xl:px-32">
        {children}
      </main>
      <Footer />
    </>
  );
}
