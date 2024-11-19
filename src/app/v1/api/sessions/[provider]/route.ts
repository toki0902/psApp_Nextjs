import { SignInService } from "@/src/application/auth/SignInService";
import { NextResponse } from "next/server";
import { MySQLUserRepository } from "@/src/infrastructure/repository/MySQLUserRepository";
import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError } from "@/src/app/error/errors";

const userRepository = new MySQLUserRepository();
const signInService = new SignInService(userRepository);

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
