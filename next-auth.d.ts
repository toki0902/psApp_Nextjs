import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "./src/backend/domain/entities/User";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      userId?: string;
      socialId?: string;
    } & DefaultSession["user"]; // `name` & `image` は DefaultSession にすでに含まれているのでそのままでOK
    expires: string; // 追加（必須プロパティ）
  }

  interface User {
    userId?: string;
    socialId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    socialId?: string;
  }
}
