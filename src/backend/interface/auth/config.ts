import LINE from "next-auth/providers/line";

import { FetchUserAndRegister } from "@/src/backend/application/auth/FetchUserAndRegister";

import { MySQLUserRepository } from "../../infrastructure/repository/MySQLUserRepository";

import { UnAuthorizeError } from "@/src/backend/interface/error/errors";
import { NextAuthConfig, Session } from "next-auth/";
import { JWT } from "next-auth/jwt";

const userRepository = new MySQLUserRepository();
const fetchUserAndRegister = new FetchUserAndRegister(userRepository);

export const nextAuthOptions: NextAuthConfig = {
  debug: false,
  secret: process.env.AUTH_SECRET,
  //googleは認可が降りるまでなしで。
  providers: [LINE({ checks: ["state"] })],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const now = Math.floor(Date.now() / 1000);
      if (!user) {
        if (token.exp > now) {
          const oneMonthMs = 1000 * 60 * 60 * 24 * 30;

          token = { ...token, exp: now + oneMonthMs };
          return token;
        }
        return null;
      }

      if (!account) {
        throw new UnAuthorizeError(
          "ログインに失敗しました。",
          "there is no account data",
        );
      }

      if (!user.name || !user.id || !user.image)
        throw new UnAuthorizeError(
          "プロバイダーデータ取得に失敗しました。",
          "missing provider data",
        );

      const userData = { ...user, id: account.providerAccountId };
      const userToken = await fetchUserAndRegister.run(userData);
      const providerInfo: JWT["provider"] = {
        provider: account.provider,
        displayName: user.name,
        socialId: user.id,
        image: user.image,
      };

      const oneMonthMs = 1000 * 60 * 60 * 24 * 30;

      token = {
        user: userToken,
        provider: providerInfo,
        exp: now + oneMonthMs,
      };

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
      session.graduationYear = token.user.graduationYear;

      const providerInfo: Session["provider"] = {
        provider: token.provider.provider,
        displayName: token.provider.displayName,
        image: token.provider.image,
      };
      session.provider = providerInfo;
      return session;
    },
  },
};
