import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRepository";
import { SignInService } from "@/src/application/auth/SignInService";
import { NextResponse } from "next/server";
import { MySQLUserGateway } from "@/src/infrastructure/gateways/MySQLUserGateway";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError } from "@/src/app/error/errors";

const signInRepository = new NextAuthSignInRepository();
const userGateway = new MySQLUserGateway();
const signInService = new SignInService(signInRepository, userGateway);

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ provider: string }> }
): Promise<NextResponse> => {
  try {
    const { provider } = await params;
    if (!provider) {
      throw new MissingParamsError("provider is not found");
    }

    const URL = await signInService.createSignInURL(provider);

    return NextResponse.redirect(URL, 302);
  } catch (err) {
    return errorHandler(err);
  }
};
