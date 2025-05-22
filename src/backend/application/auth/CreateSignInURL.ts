export class CreateSignInURL {
  run = async (provider: string): Promise<string> => {
    const redirectUrl = `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/auth/signin/${provider}`;
    return redirectUrl;
  };
}
