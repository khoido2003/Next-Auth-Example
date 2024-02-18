import { v4 as uuidv4 } from "uuid";
import {
  createVerificationToken,
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from "./action-verification-token";

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
