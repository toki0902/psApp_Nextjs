import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import { UnAuthorizeError } from "@/src/backend/interface/error/errors";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const origin = req.nextUrl.origin;
    const allowedOrigin = process.env.NEXT_PUBLIC_ROOT_URL || "";
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

    if (origin !== allowedOrigin) {
      throw new UnAuthorizeError(
        "同一のオリジン以外からのアクセスです。",
        "invalid access from other origin",
      );
    }

    const token = req.cookies.get("secret_passphrase")?.value || "";
    if (!token) {
      throw new UnAuthorizeError(
        "クッキーが存在しません。",
        "cookie not found",
      );
    }

    const { payload } = await jwtVerify(token, secret);

    if (!payload.verified) {
      throw new UnAuthorizeError("クッキーが無効です。", "cookie not invalid");
    }

    const newToken = await new SignJWT({ verified: true })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set("secret_passphrase", newToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return res;
  } catch (err) {
    const error = new UnAuthorizeError(
      "クッキーが無効です。",
      `invalid cookie due to: ${JSON.stringify(err)}`,
    );
    return errorHandler(error);
  }
};
export const POST = async (req: NextRequest) => {
  try {
    const origin = req.headers.get("origin") || "";
    const allowedOrigin = process.env.NEXT_PUBLIC_ROOT_URL || "";

    if (origin !== allowedOrigin) {
      throw new UnAuthorizeError(
        "同一のオリジン以外からのアクセスです。",
        "invalid access from other origin",
      );
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

    const token = await new SignJWT({ verified: true })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set("secret_passphrase", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return res;
  } catch (err) {
    return errorHandler(err);
  }
};
