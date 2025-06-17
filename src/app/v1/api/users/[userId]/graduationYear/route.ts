import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { auth } from "@/src/backend/interface/auth/auth";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { MySQLUserRepository } from "@/src/backend/infrastructure/repository/MySQLUserRepository";
import { ChangeGraduationYearByUserId } from "@/src/backend/application/user/ChangeGraduationYear";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";
import { User } from "@/src/backend/domain/entities/User";

const pool = await createConnectionPool();
const userRepository = new MySQLUserRepository();
const changeGraduationYearByUserId = new ChangeGraduationYearByUserId(
  userRepository,
);

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
    const { userId: userIdParam } = await params;
    const { graduationYear } = await req.json();

    const isValid =
      typeof graduationYear === "number" &&
      Number.isInteger(graduationYear) &&
      graduationYear >= 1000 &&
      graduationYear <= 9999 &&
      userIdParam;

    if (isValid) {
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

    await changeGraduationYearByUserId.run(pool, graduationYear, user);

    return new NextResponse(
      JSON.stringify({ message: "卒業年度を設定しました。" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
