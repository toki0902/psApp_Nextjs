import { NextResponse } from "next/server";

import { CreateSignInURL } from "@/src/application/auth/CreateSignInURL";

import { errorHandler } from "@/src/app/error/errorHandler";
import { MissingParamsError } from "@/src/app/error/errors";

const createSignInURL = new CreateSignInURL();

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ provider: string }> }
): Promise<NextResponse> => {
  try {
    const { provider } = await params;
    if (!provider) {
      throw new MissingParamsError("provider is not found");
    }

    const URL = await createSignInURL.run(provider);

    return NextResponse.redirect(URL, 302);
  } catch (err) {
    return errorHandler(err);
  }
};
