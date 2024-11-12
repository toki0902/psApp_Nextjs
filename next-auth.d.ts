import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "./src/domain/entities/User";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name?: string;
      image?: string | null;
      userId?: string;
      socialId?: string;
    } & DefaultSession["user"];
  }
}
