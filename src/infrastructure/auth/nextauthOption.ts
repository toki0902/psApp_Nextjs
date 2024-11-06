import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      return token;
    },

    session: ({ session, user }) => {
      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
};
