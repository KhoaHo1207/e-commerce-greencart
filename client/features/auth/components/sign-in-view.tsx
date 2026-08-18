import SignInForm from "@/features/auth/components/sign-in-form";

export default function SignInView() {
  return (
    <section
      aria-labelledby="sign-in-heading"
      className="w-full max-w-md rounded-lg border border-border bg-card text-card-foreground p-6 sm:p-8"
    >
      <h1
        id="sign-in-heading"
        className="text-2xl font-semibold text-center mb-6 text-foreground"
      >
        <span className="text-primary">User</span> Sign In
      </h1>
      <SignInForm />
    </section>
  );
}
