import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function AccountPlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">{title}</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <Empty className="border border-dashed border-border py-16 mt-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon />
          </EmptyMedia>
          <EmptyTitle className="text-xl">Nothing here yet</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
