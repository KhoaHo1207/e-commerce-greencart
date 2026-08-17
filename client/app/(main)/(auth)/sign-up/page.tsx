import SignUpForm from "./_components/form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-md border border-border p-4 rounded w-full">
      <span className="text-2xl font-semibold mb-6">
        <span className="text-primary">User</span> Sign Up
      </span>

      <SignUpForm />
    </div>
  );
}
