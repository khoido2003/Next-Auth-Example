"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/getTwoFactorConfirmationByUserId";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Check if the
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  // Get the user from the provided email.
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // Checking if the user is already have email verified or not. If not, create a new token and resend it to the user.
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    // Sending token through user email
    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return { success: "Confirmation email sent!" };
  }

  // TODO: Implement two factor authentication
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Vertify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code has expired!" };
      }

      // delete the twoFactorToken that has been used
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // delete the old confirmation
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      // Create a new confirmation
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

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
