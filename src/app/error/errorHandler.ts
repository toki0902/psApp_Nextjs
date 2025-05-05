import { NextResponse } from "next/server";
import {
  MissingParamsError,
  MySQLError,
  NotFoundError,
  UnAuthorizeError,
} from "./errors";

export const errorHandler = (
  error:
    | MissingParamsError
    | NotFoundError
    | UnAuthorizeError
    | MySQLError
    | any,
): NextResponse => {
  if (
    error instanceof MissingParamsError ||
    error instanceof NotFoundError ||
    error instanceof UnAuthorizeError ||
    error instanceof MySQLError
  ) {
    console.error(error.log);

    return new NextResponse(
      JSON.stringify({ message: error.message, errorType: error.name }),
      {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // それ以外の未知のエラーの場合（予期せぬ例外など）
  console.error("[Unknown Error]", error);

  return new NextResponse(
    JSON.stringify({
      message: "サーバーエラーが発生しました",
      errorType: "UnknownError",
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
};
