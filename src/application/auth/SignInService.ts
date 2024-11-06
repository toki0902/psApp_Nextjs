import { ISignInRepository } from "@/src/domain/auth/ISignInRepository";
import { JWT as DefaultJWT, JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

//実装すべきなのはproviderへのリダイレクト、callback内での処理。
export class SignInService {
  constructor(private _signInRepository: ISignInRepository) {}
  redirectAuthProvider = async (provider: string): Promise<NextResponse> => {
    return await this._signInRepository.signInAndCallback(provider);
  };

  //DBへの保存をしてtokenを返却。
  save = async (token: JWT): Promise<void> => {
    //todo: DBへの保存
    console.log("dbへの保存をします。");
  };
}
