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
import { signInSchema, SignInSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: SignInSchema) => {
    console.log(data);
  };

  return (
    <form
      id="sign-in-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full"
      noValidate
    >
      <FieldSet>
        <FieldLegend className="sr-only">Sign in</FieldLegend>
        <FieldGroup>
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
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
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
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>

      <Button
        type="submit"
        form="sign-in-form"
        className="w-full mt-4 h-11"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
