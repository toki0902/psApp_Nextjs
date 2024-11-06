import { NextResponse } from "next/server";

export interface ISignInRepository {
  signInAndCallback: (provider: string) => Promise<NextResponse>;
  //todo: db保存のメソッド追加
}
