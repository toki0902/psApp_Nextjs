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
    const { userId } = await params;
    const { graduationYear } = await req.json();

    const isValid =
      typeof graduationYear === "number" &&
      Number.isInteger(graduationYear) &&
      graduationYear >= 1000 &&
      graduationYear <= 9999 &&
      userId;

    if (isValid) {
      throw new MissingParamsError(
        "パラメータが不足または無効です。",
        "Required parameter is missing or invalid",
      );
    }

    const session: Session | null = await auth();

    if (!(session?.userId === userId)) {
      console.log("Unauthorized!");
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );
    }

    await changeGraduationYearByUserId.run(pool, graduationYear, userId);

    return new NextResponse(
      JSON.stringify({ message: "卒業年度を設定しました。" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return errorHandler(err);
  }
};
