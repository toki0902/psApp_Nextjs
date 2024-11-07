import { SignInService } from "@/src/application/auth/SignInService";
import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRepository";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const signInRepository = new NextAuthSignInRepository();
const signInService = new SignInService(signInRepository);

export const GET = async (req: NextRequest) => {
  const JWT = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  if (!JWT) {
    return new NextResponse(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = NextResponse.redirect(new URL("/", process.env.ROOT_URL));

  response.cookies.set("authToken", JWT, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return response;
};
