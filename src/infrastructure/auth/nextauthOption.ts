import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

import { NextAuthSignInRepository } from "./NextAuthSignInRepository";
import { SignInService } from "@/src/application/auth/SignInService";
import { MySQLUserGateway } from "../gateways/MySQLUserGateway";
import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { errorHandler } from "@/src/app/error/errorHandler";

//todo: useSessionを使用すると/v1/apiではなく/apiを参照してしまう。

const signInRepository = new NextAuthSignInRepository();
const userGateway = new MySQLUserGateway();
const signInService = new SignInService(signInRepository, userGateway);

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }
      const userToken = await signInService.fetchUserAndRegister(user);

      token = { ...userToken };
      return token;
    },
    async session({ token, session }) {
      if (!token) {
        throw new UnAuthorizeError("JWT token not granted");
      }

      console.log(token);

      session.user.userId =
        typeof token.userId === "string" ? token.userId : "";
      session.user.socialId =
        typeof token.socialId === "string" ? token.socialId : "";
      session.user.image =
        typeof token.image === "string" || token.image === null
          ? token.image
          : null;
      session.user.name = typeof token.name === "string" ? token.name : "";
      return session;
    },
  },
};
