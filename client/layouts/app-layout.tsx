"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const pathname = usePathname();

  const isSeller = pathname.startsWith("/seller");
  return (
    <main className={`${isSeller ? "" : "md:px-16 lg:px-24 xl:px-32"}`}>
      {children}
    </main>
  );
}
