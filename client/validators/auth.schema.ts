import { z } from "zod";

export const signInSchema = z
  .object({
    email: z
      .string({
        error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z
      .string({
        error: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
  })
  .strict();

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z
      .string({
        error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z
      .string({
        error: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
    name: z
      .string({
        error: "Name is required",
      })
      .min(1, {
        message: "Name must be at least 1 character long",
      }),
  })
  .strict();

export type SignUpSchema = z.infer<typeof signUpSchema>;
