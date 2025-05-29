import { auth } from "@/src/backend/interface/auth/auth";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { NextRequest, NextResponse } from "next/server";

import { MySQLUserRepository } from "@/src/backend/infrastructure/repository/MySQLUserRepository";
import { UpdateProfile } from "@/src/backend/application/user/UpdateProfile";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";
import { Session } from "next-auth";

const mySQLUserRepository = new MySQLUserRepository();
const updateProfile = new UpdateProfile(mySQLUserRepository);
const pool = await createConnectionPool();

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
    const { userId: userIdParam } = await params;
    const body = await req.json();
    if (
      !userIdParam ||
      !(body.name === null || typeof body.name === "string") ||
      !(body.graduationYear === null || typeof body.graduationYear === "number")
    ) {
      throw new MissingParamsError(
        "パラメータが不足または無効です。",
        "Required parameter is missing or invalid",
      );
    }

    const session: Session | null = await auth();

    if ((session?.userId !== userIdParam && userIdParam !== "me") || !session) {
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    const userId = userIdParam === "me" ? session.userId : userIdParam;

    const { name, graduationYear } = body;

    await updateProfile.run(pool, userId, name, graduationYear);

    return new NextResponse(
      JSON.stringify({
        message: "プロフィールを更新しました。もう一度ログインしてください",
        provider: session.provider,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
