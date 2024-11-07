import { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

export interface ISignInRepository {
  createProviderURL: (provider: string) => Promise<NextResponse>;
}
