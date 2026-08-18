import SignInView from "@/features/auth/components/sign-in-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your GreenCart account",
};

export default function SignInPage() {
  return <SignInView />;
}
