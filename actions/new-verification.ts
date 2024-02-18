"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/lib/action-verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  // NOTICE: since react will call this twice so it will call it even when the token has been deleted so it causing the error token not exists even if verified successfully user, this will be fixed in production.

  //  Check if the token exists or not
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }
  // Check if the token has expired (Each token has 1 hour expiration)
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error:
        "Token has expired! Please request a new verification email by login again.",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Update the date with the email verification inside User database
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified!" };
};
