export class CreateSignInURL {
  run = async (provider: string): Promise<string> => {
    const callbackUrl = `${process.env.ROOT_URL}/v1/api/sessions/callback`;
    const redirectUrl = `${process.env.NEXTAUTH_URL}/signin/${provider}?callbackUrl=${callbackUrl}`;
    return redirectUrl;
  };
}
