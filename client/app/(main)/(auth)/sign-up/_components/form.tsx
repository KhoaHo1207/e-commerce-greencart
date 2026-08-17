"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: SignUpSchema) {
    console.log(data);
  }

  return (
    <form
      id="sign-up-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full"
      noValidate
    >
      <FieldSet>
        <FieldLegend className="sr-only">Create account</FieldLegend>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="john.doe@example.com"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="At least 8 characters"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <p className="mt-4 text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary font-medium hover:underline"
        >
          Sign In
        </Link>
      </p>

      <Button
        type="submit"
        form="sign-up-form"
        className="w-full mt-4 h-11"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
