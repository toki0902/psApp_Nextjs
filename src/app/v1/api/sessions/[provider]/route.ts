import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRepository";
import { SignInService } from "@/src/application/auth/SignInService";
import { NextResponse } from "next/server";
import { MySQLUserGateway } from "@/src/infrastructure/user/MySQLUserGateway";

interface Context {
  params: {
    provider: string;
  };
}

const signInRepository = new NextAuthSignInRepository();
const userGateway = new MySQLUserGateway();
const signInService = new SignInService(signInRepository, userGateway);

export const POST = async (
  req: Request,
  { params }: Context
): Promise<NextResponse> => {
  //なぜかawaitをけすと参照できない
  const { provider } = await params;

  return signInService.redirectAuthProvider(provider);
};
