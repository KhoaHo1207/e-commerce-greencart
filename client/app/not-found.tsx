import Logo from "@/components/layout/logo";
import { Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="px-6 md:px-16 lg:px-24 xl:px-32 py-4">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-secondary">
          <Leaf className="size-8 text-primary" />
        </div>

        <p className="text-7xl md:text-8xl font-bold text-primary leading-none">
          404
        </p>
        <h1 className="mt-5 text-2xl md:text-4xl font-semibold text-foreground">
          This page is out of stock
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
          The page you are looking for is not on our shelves. Go back home or
          browse fresh products.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center px-7 md:px-9 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
          >
            Back to home
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center px-7 md:px-9 py-3 rounded border border-border text-foreground hover:bg-muted transition"
          >
            Browse products
          </Link>
        </div>
      </main>
    </div>
  );
}
