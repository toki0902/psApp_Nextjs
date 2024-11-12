import { NextResponse } from "next/server";
import { MissingParamsError, NotFoundError, UnAuthorizeError } from "./errors";

export const errorHandler = (
  error: NotFoundError | UnAuthorizeError | MissingParamsError
): NextResponse => {
  console.error(`${error.name}!: ${error.message}`);
  return new NextResponse(
    JSON.stringify({ message: error.message, errorType: error.name }),
    {
      status: error.statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};
