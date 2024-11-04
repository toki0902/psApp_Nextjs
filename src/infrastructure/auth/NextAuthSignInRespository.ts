import { ISigninRepository } from "@/src/domain/auth/ISigninRepository";
import { signIn } from "next-auth/react";

export class NextAuthSignInRepository implements ISigninRepository {
  signInAndCallback = async (provider: string) => {
    signIn(provider, {
      callbackUrl: `${process.env.NEXTAUTH_URL}/sessions/callback`,
    });
  };
}
