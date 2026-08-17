"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function Form() {
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
    >
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
                aria-invalid={fieldState.invalid}
                placeholder="john.doe@example.com"
                autoComplete="off"
                className="border border-border rounded p-3"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                aria-invalid={fieldState.invalid}
                placeholder="password"
                autoComplete="off"
                className="border border-border rounded p-3"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-4">
        Don&apos;t have an account?{" "}
        <Link
          href={"/sign-up"}
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </Link>
        <Button
          type="submit"
          form="sign-in-form"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4 py-5"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
}
