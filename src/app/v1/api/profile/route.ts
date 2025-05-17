import { auth } from "@/src/backend/interface/auth/auth";
import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import {
  MissingParamsError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session)
      throw new UnAuthorizeError(
        "認証に失敗しました。もう一度ログインし直してください。",
        "You are not authenticated. Please log in and try again",
      );

    const body = await req.json();
    if (
      !(body.name === null || typeof body.name === "string") ||
      !(body.graduationYear === null || typeof body.graduationYear === "number")
    ) {
      throw new MissingParamsError(
        "パラメータが不足または無効です。",
        "Required parameter is missing or invalid",
      );
    }
  } catch (err) {
    errorHandler(err);
  }
};
