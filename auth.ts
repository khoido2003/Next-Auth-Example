import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";

import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,

  //---------------------------------

  // Customize signIn, error page
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  // events: {},

  // callbacks: {
  //   // async signIn({ account, user }) {
  //   //   // // Allow Oauth without email verification
  //   //   // if (account?.provider !== "credentials") return true;
  //   //   // // user object is the response returned from the authorize callback
  //   //   // const existingUser = await getUserById(user.id);
  //   //   return true;
  //   // },
  //   // async session({ session, token }) {
  //   //   // if (session.user && token.sub) {
  //   //   //   session.user.id = token.sub;
  //   //   // }
  //   //   // if (session.user && token.)
  //   // },
  // },
});
