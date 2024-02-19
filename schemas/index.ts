import * as z from "zod";

////////////////////////////////////////////

// Login form
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),

  code: z.optional(z.string()),
});

//////////////////////////////////////////////

// Register form
export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required!",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters!" }),

    passwordConfirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    name: z.string().min(1, {
      message: "Name is required!",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password don't match!",
    path: ["passwordConfirm"],
  });

///////////////////////////////////////////////

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});
