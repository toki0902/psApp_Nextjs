import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

import { NextAuthSignInRepository } from "./NextAuthSignInRepository";
import { SignInService } from "@/src/application/auth/SignInService";
import { MySQLUserGateway } from "../user/MySQLUserGateway";

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
      const userToken = await signInService.fetchUserAndRegister(user);

      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};
