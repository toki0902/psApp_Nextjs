import { ISignInRepository } from "@/src/domain/auth/ISigninRepository";
import { IUserGateway } from "@/src/domain/dataAccess/IUserGateway";
import { User } from "@/src/domain/entities/User";
import { NextResponse } from "next/server";

import type { User as NextAuthUser } from "next-auth";

//実装すべきなのはproviderへのリダイレクト、callback内での処理。
export class SignInService {
  constructor(
    private _signInRepository: ISignInRepository,
    private _userGateway: IUserGateway
  ) {}

  redirectAuthProvider = async (provider: string): Promise<NextResponse> => {
    return await this._signInRepository.createProviderURL(provider);
  };

  fetchUserAndRegister = async (
    user: NextAuthUser
  ): Promise<User | undefined> => {
    if (!user.image || !user.name) {
      return undefined;
    }
    const selectedUser = await this._userGateway.findBySocialId(user.id);
    if (!selectedUser) {
      const insertResult = await this._userGateway.insert(user.id, user.name);

      return new User(
        insertResult.userId,
        insertResult.name,
        insertResult.socialId,
        user.image
      );
    }

    return new User(
      selectedUser.userId,
      selectedUser.name,
      selectedUser.socialId,
      user.image
    );
  };

  // //DBへの保存をしてtokenを返却。
  // save = async (token: JWT): Promise<void> => {
  //   if (!token.name) {
  //     return;
  //   }
  //   //既に存在しているかの確認
  //   const socialId = token.sub;

  //   if (!socialId) {
  //     //メールでの認証になるかも？
  //     return undefined;
  //   }

  //   const user = await this._userGateway.findById(conn, socialId);

  //   if (user) {
  //     return;
  //   } else {
  //     await this._userGateway.insert(conn, socialId, token.name);
  //   }
  // };
}
