import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRepository";
import { SignInService } from "@/src/application/auth/SignInService";

interface Context {
  params: {
    provider: string;
  };
}

const signInRepository = new NextAuthSignInRepository();
const signInService = new SignInService(signInRepository);

export const POST = async (req: Request, { params }: Context) => {
  const { provider } = await params;

  return await signInService.redirectAuthProvider(provider);
};
