import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";

import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/getTwoFactorConfirmationByUserId";
import { getAccountByUserId } from "./data/account";

////////////////////////////////////////////

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

  events: {
    signIn({ user, account, profile, isNewUser }) {
      // console.log("User: ", user);
      // console.log("Account: ", account);
      // console.log("Profile: ", profile);
      // console.log("isNewUser: ", isNewUser);
    },

    // If user login with an google or github account then not need to check the email verified instead add the new Date to the email verified account.
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow Oauth withour email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA Authentication
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete the two factor confirmation so  next time sign in, user still have to pass the two factor authentication to sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async jwt({ token }) {
      // If logout no need to do anything
      if (!token.sub) {
        return token;
      }

      // Since we have custom field inside the user table that not inlcuded in the jwt token so we have to find the corresponding user and add all the needed fields to the token
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      // Update the token manually in the settingss
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      // console.log(token);
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
  },
});

///////////////////////////////////////////////////////

// User and account objects example return from Oauth

// User:  {
//   id: 'clsotu36h00001026frklhcj4',
//   name: 'Khoi Do',
//   email: 'khoizpro2003@gmail.com',
//   emailVerified: 2024-02-18T03:57:45.069Z,
//   image: null,
//   password: '$2a$10$QvDWobv65JrgHq3.sCcG5eBpHLw8brxt0Xm6p2YBL.qL7xXV0vmsa',
//   role: 'USER'
// }

///---------------------------------------------------

// Account:  {
//   access_token: 'ya29.a0AfB_byBnP48InhkEwhvcCHD607cYIjw6C0gTOHQBFJs2Du8YNupGO9a2cmtCZrUr2gU5K2i1K32yeXBASI5pp2rtJ4TOflvzXXtynJ2mLh51ZdioDUTeSJf17bWelc-Oa82LVO0GcLLvvtKmXoZwYf3_MjPnUf0y0vmRaCgYKAf0SARASFQHGX2MiV3So3WiSl6EXCkyiLivJTw0171',
//   expires_in: 3599,
//   scope: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
//   token_type: 'bearer',
//   id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkODA2ZjE4NDJiNTg4MDU0YjE4YjY2OWRkMWEwOWE0ZjM2N2FmYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MTExNjk4MjkwNTEtaG41bWVrbHNvczBya292dG00ZjZxMnJoYWZhcXR1NGsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5MTExNjk4MjkwNTEtaG41bWVrbHNvczBya292dG00ZjZxMnJoYWZhcXR1NGsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYyMzMxNzk0OTg5MTIyNjEzODAiLCJlbWFpbCI6Imtob2l6cHJvMjAwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Iktad29kakQyLWhDRkJlTHV2R01jR3ciLCJuYW1lIjoiQjIxRENDTjA3MC3EkOG7lyBNaW5oIEtow7RpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xZS1JLSU91RzB2XzA3ZWJhNVFNbXpDUmdoUFRpMlEyeFktNTBtZk0yaWNQdz1zOTYtYyIsImdpdmVuX25hbWUiOiJCMjFEQ0NOMDcwLcSQ4buXIE1pbmgiLCJmYW1pbHlfbmFtZSI6Iktow7RpIiwibG9jYWxlIjoidmkiLCJpYXQiOjE3MDgyMjg2OTAsImV4cCI6MTcwODIzMjI5MH0.fYwF1xUugW2ShFxXFblOVJLtnS2yVWt7wZ4atEeyOTxk149QXMjyH74mAmLzRHp7KqdcXW-OWFKldIyOBhSyCJXm_9dDUX8QBpmW25CUSACNhPfAZXMiDfFhYBBTU6karEBLyg_obfoA6O_6NwNjmh9_VUj2N2t6Dp22JuTz25Pjjgkwco_lYsNvKvKa8Emi4KiNdvCpd_fH9jZ5ALuo-8O4cHJ72AMu36CmQTfgATrsX2BIuvPtwKq2A5HlKw3XcXlj6lFnumUWDcUiJC_yzXydwcUPQ1J4WWOnD2uTR0lRc2NpIh6t7hZSy5THjOU6A0rsKOpcbE44BeSY8rnGpQ',
//   expires_at: 1708232289,
//   provider: 'google',
//   type: 'oidc',
//   providerAccountId: '36a7fb27-7367-4cb7-bdc7-0983c1ccef1c'
// }

/////////////////////////////////////////////////////////////////////////
