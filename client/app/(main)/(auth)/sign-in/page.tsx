import { Metadata } from "next";
import Link from "next/link";
import SignInForm from "./_components/form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-md border border-border p-4 rounded w-full">
      <span className="text-2xl font-semibold mb-6">
        <span className="text-primary">User</span> Sign In
      </span>

      <SignInForm />

      <Link href={"/"} className="text-primary hover:underline mt-6 text-sm">
        Back to Home
      </Link>
    </div>
  );
}
