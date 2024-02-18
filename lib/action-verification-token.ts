import { db } from "./db";

// Find verification token
export const getVerificationToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (e) {
    return null;
  }
};

///////////////////////////////////////////

/**
 * Find corresponding token to the email need verified
 */

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (e) {
    return null;
  }
};

///////////////////////////////////////////////////////

/**
 * Delete old token if the token is already existed
 * @param id
 * @returns
 */
export const deleteVerificationTokenById = async (id: string) => {
  try {
    await db.verificationToken.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    return { error: "Can't delete verification token!" };
  }
};

///////////////////////////////////////////////////////////

/**
 * Create a new verification token
 */
export const createVerificationToken = async ({
  email,
  token,
  expires,
}: {
  email: string;
  token: string;
  expires: Date;
}) => {
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
