import Google from "next-auth/providers/google";
import LINE from "next-auth/providers/line";

import { FetchUserAndRegister } from "@/src/backend/application/auth/FetchUserAndRegister";

import { MySQLUserRepository } from "../repository/MySQLUserRepository";

import { UnAuthorizeError } from "@/src/app/error/errors";
import { NextAuthConfig } from "next-auth/";

const userRepository = new MySQLUserRepository();
const fetchUserAndRegister = new FetchUserAndRegister(userRepository);

export const nextAuthOptions: NextAuthConfig = {
  debug: false,
  secret: process.env.AUTH_SECRET,
  providers: [Google, LINE({ checks: ["state"] })],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (!user) {
        if (token.exp > Date.now()) {
          const oneMonthMs = 1000 * 60 * 60 * 24 * 30;
          token = { ...token, exp: Date.now() + oneMonthMs };
        }
        return null;
      }

      if (!account) {
        throw new UnAuthorizeError(
          "ログインに失敗しました。",
          "there is no account data",
        );
      }

      const userData = { ...user, id: account.providerAccountId };

      const userToken = await fetchUserAndRegister.run(userData);

      const oneMonthMs = 1000 * 60 * 60 * 24 * 30;
      token = { user: userToken, exp: Date.now() + oneMonthMs };
      return token;
    },

    async session({ token, session }) {
      if (!token) {
        throw new UnAuthorizeError(
          "JWTトークンが存在しません。",
          "JWT token not granted",
        );
      }

      session.userId = token.user.userId;
      session.image = token.user.image;
      session.name = token.user.name;
      return session;
    },
  },
};
