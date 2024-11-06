import { ISignInRepository } from "@/src/domain/auth/ISignInRepository";
import { NextResponse } from "next/server";

export class NextAuthSignInRepository implements ISignInRepository {
  signInAndCallback = async (provider: string): Promise<NextResponse> => {
    const callbackUrl = `${process.env.ROOT_URL}/v1/api/sessions/callback`;
    const redirectUrl = `${process.env.NEXTAUTH_URL}/signin/${provider}?callbackUrl=${callbackUrl}`;

    return NextResponse.redirect(redirectUrl, 302);
  };
}
