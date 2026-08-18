import SignUpView from "@/features/auth/components/sign-up-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your GreenCart account",
};

export default function SignUpPage() {
  return <SignUpView />;
}
