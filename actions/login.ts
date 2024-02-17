"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Check if the
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  // Get the user from the provided email`
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // TODO: Implement two factor authentication

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Successfully login!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password!",
          };

        default:
          return {
            error: "Something went wrong! Try again later",
          };
      }
    }

    // Must have this line so it can redirect
    throw error;
  }
};
