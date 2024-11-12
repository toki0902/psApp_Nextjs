import { NextResponse } from "next/server";
import { NotFoundError, UnAuthorizeError } from "./errors";

export const errorHandler = (error: NotFoundError | UnAuthorizeError) => {
  console.error(`${error.name}!: ${error.message}`);
  return new NextResponse(
    JSON.stringify({ message: error.message, errorType: error.name }),
    {
      status: error.statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};
