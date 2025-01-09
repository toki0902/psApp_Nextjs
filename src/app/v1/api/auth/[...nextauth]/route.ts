import { nextAuthOptions } from "@/src/backend/infrastructure/auth/nextauthOption";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
