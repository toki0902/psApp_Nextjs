import { SignInService } from "@/src/application/auth/SignInService";
import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRepository";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const signInRepository = new NextAuthSignInRepository();
const signInService = new SignInService(signInRepository);

export const GET = async (req: NextRequest) => {
  const JWT = await getToken({ req });

  console.log(JWT);

  return NextResponse.json({ JWT });
};
