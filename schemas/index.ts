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
