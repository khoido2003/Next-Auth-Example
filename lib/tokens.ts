import { v4 as uuidv4 } from "uuid";
import {
  createVerificationToken,
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from "./action-verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { db } from "./db";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

///////////////////////////////////////////////////////////

// Generate email verified token when user register with Credentials

export const generateVerificationToken = async (email: string) => {
  // Create token
  const token = uuidv4();

  // Create expires token times: 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Check if database already contains old verification token then delete it and add the new one
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  // Create new verification token and add it to the database
  const verifcationToken = await createVerificationToken({
    email,
    token,
    expires,
  });

  return verifcationToken;
};

/////////////////////////////////////////////

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 900 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

//////////////////////////////////////////

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();

  const expires = new Date(new Date().getTime() + 5 * 15 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
