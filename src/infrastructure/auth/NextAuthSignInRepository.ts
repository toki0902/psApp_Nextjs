import { ISignInRepository } from "@/src/domain/auth/ISigninRepository";

export class NextAuthSignInRepository implements ISignInRepository {
  createSignInURL = async (provider: string): Promise<string> => {
    const callbackUrl = `${process.env.ROOT_URL}/v1/api/sessions/callback`;
    const redirectUrl = `${process.env.NEXTAUTH_URL}/signin/${provider}?callbackUrl=${callbackUrl}`;
    return redirectUrl;
  };
}
