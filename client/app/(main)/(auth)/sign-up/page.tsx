import { Metadata } from "next";
import SignUpForm from "./_components/form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your GreenCart account",
};

export default function SignUpPage() {
  return (
    <section
      aria-labelledby="sign-up-heading"
      className="w-full max-w-md rounded-lg border border-border bg-card text-card-foreground p-6 sm:p-8"
    >
      <h1
        id="sign-up-heading"
        className="text-2xl font-semibold text-center mb-6 text-foreground"
      >
        <span className="text-primary">User</span> Sign Up
      </h1>
      <SignUpForm />
    </section>
  );
}
