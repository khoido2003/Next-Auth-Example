import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

/////////////////////////////////

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      async authorize(credentials, req) {
        // Check Email and password submitted by user through https
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          // After successful check, email and pasword are saved in data object from zod
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.password as string
          );

          // Any object returned will be saved in `user` property of the JWT
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
