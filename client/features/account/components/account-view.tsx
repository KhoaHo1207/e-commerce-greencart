"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountView() {
  const { user } = useAppContext();

  if (!user) {
    return (
      <div className="mt-16">
        <p className="text-muted-foreground">Sign in to manage your account.</p>
        <Button asChild className="mt-4">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">My Profile</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <dl className="mt-8 max-w-md border border-border rounded-lg bg-card divide-y divide-border">
        <div className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-sm text-muted-foreground">Name</dt>
          <dd className="text-sm font-medium">{user.fullName}</dd>
        </div>
        <div className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-sm text-muted-foreground">Email</dt>
          <dd className="text-sm font-medium">{user.email}</dd>
        </div>
        <div className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-sm text-muted-foreground">Role</dt>
          <dd className="text-sm font-medium capitalize">{user.role}</dd>
        </div>
      </dl>
    </div>
  );
}
