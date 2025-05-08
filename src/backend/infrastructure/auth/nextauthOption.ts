import Google from "next-auth/providers/google";
import LINE from "next-auth/providers/line";

import { FetchUserAndRegister } from "@/src/backend/application/auth/FetchUserAndRegister";

import { MySQLUserRepository } from "../repository/MySQLUserRepository";

import { UnAuthorizeError } from "@/src/app/error/errors";
import { JWT } from "next-auth/jwt";
import { NextAuthConfig, User } from "next-auth/";
import { Session } from "next-auth";

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
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User | undefined;
      account: any;
    }) {
      if (!user) {
        return token;
      }

      const userData = { ...user, id: account.providerAccountId };

      const userToken = await fetchUserAndRegister.run(userData);

      token = { ...userToken };
      return token;
    },

    async session({ token, session }: { token: JWT; session: Session }) {
      if (!token) {
        throw new UnAuthorizeError(
          "JWTトークンが存在しません。",
          "JWT token not granted",
        );
      }

      session.user.userId =
        typeof token.userId === "string" ? token.userId : "";
      session.user.socialId =
        typeof token.socialId === "string" ? token.socialId : "";
      session.user.image =
        typeof token.image === "string" ? token.image : undefined;
      session.user.name = typeof token.name === "string" ? token.name : "";
      return session;
    },
  },
};
