import Logo from "@/components/layout/logo";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="px-6 md:px-16 lg:px-24 xl:px-32 py-4">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
