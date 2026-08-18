"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ProductSearch({
  id,
  className,
  autoFocus = false,
}: {
  id: string;
  className?: string;
  autoFocus?: boolean;
}) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
    <form
      role="search"
      action="/products"
      className={cn(
        "flex items-center text-sm gap-2 border border-border px-3 rounded-full",
        className
      )}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        name="q"
        key={q}
        defaultValue={q}
        autoFocus={autoFocus}
        className="py-1.5 w-full bg-transparent outline-none placeholder-muted-foreground"
        type="search"
        placeholder="Search products"
      />
      <button
        type="submit"
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <Search className="size-4" />
      </button>
    </form>
  );
}
