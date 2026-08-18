"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { dummyAddress } from "@/constants/assets";
import Link from "next/link";

export default function AddressesView() {
  const { user } = useAppContext();

  if (!user) {
    return (
      <div className="mt-16">
        <p className="text-muted-foreground">Sign in to manage addresses.</p>
        <Button asChild className="mt-4">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">Addresses</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {dummyAddress.map((address) => (
          <li
            key={address._id}
            className="border border-border rounded-lg bg-card p-4 text-sm"
          >
            <p className="font-medium text-foreground">
              {address.firstName} {address.lastName}
            </p>
            <p className="text-muted-foreground mt-2">
              {address.street}
              <br />
              {address.city}, {address.state} {address.zipcode}
              <br />
              {address.country}
            </p>
            <p className="text-muted-foreground mt-2">{address.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
