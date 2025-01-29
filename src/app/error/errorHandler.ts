import { NextResponse } from "next/server";
import {
  MissingParamsError,
  MySQLError,
  NotFoundError,
  UnAuthorizeError,
} from "./errors";

export const errorHandler = (
  error: MissingParamsError | NotFoundError | UnAuthorizeError | MySQLError
): NextResponse => {
  console.log(error);
  console.error(`${error.name}!: ${error.message}`);
  return new NextResponse(
    JSON.stringify({ message: error.message, errorType: error.name }),
    {
      status: error.statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};
