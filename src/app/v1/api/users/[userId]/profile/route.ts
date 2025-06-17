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
import { User } from "@/src/backend/domain/entities/User";

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
    if (!session)
      throw new UnAuthorizeError(
        "認証されていません。ログインしてください",
        "You are not authenticated. Please log in and try again",
      );

    const user = new User(
      session.userId,
      session.name,
      session.image || "",
      session.graduationYear,
    );
    if (!user.isMe(userIdParam))
      throw new UnAuthorizeError(
        "認可が降りていません。自身のリソースを操作してください。",
        "You are not authorized. Please operate on your own resources",
      );

    const { name, graduationYear } = body;

    await updateProfile.run(pool, user, name, graduationYear);

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
