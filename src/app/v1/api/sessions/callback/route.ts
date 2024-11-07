import { SignInService } from "@/src/application/auth/SignInService";
import { NextAuthSignInRepository } from "@/src/infrastructure/auth/NextAuthSignInRepository";
import { MySQLUserGateway } from "@/src/infrastructure/user/MySQLUserGateway";
import { captureRejectionSymbol } from "events";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const signInRepository = new NextAuthSignInRepository();
const userGateway = new MySQLUserGateway();
const signInService = new SignInService(signInRepository, userGateway);

export const GET = async (req: NextRequest) => {
  const JWT_str = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  const JWT = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!JWT_str || !JWT) {
    return new NextResponse(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // await signInService.save(JWT);

  const response = NextResponse.redirect(new URL("/", process.env.ROOT_URL));

  response.cookies.set("authToken", JWT_str, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return response;
};
