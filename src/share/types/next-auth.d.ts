import { type DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session extends DefaultSession {
    userId: string;
    name: string;
    image?: string;
    graduationYear: number | null;
    provider: {
      provider: string;
      displayName: string;
      image: string;
    };
  }
}

import { type DefaultJWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      userId: string;
      name: string;
      image: string;
      graduationYear: number | null;
    };
    provider: {
      provider: string;
      displayName: string;
      socialId: string;
      image: string;
    };
    exp: number;
  }
}
