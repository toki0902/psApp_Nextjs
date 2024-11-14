import { NotFoundError } from "@/src/app/error/errors";
import { ISignInRepository } from "@/src/domain/auth/ISigninRepository";
import { IUserGateway } from "@/src/domain/dataAccess/IUserGateway";
import { User } from "@/src/domain/entities/User";

import type { User as NextAuthUser } from "next-auth";

//実装すべきなのはproviderへのリダイレクト、callback内での処理。
export class SignInService {
  constructor(
    private _signInRepository: ISignInRepository,
    private _userGateway: IUserGateway
  ) {}

  createSignInURL = async (provider: string): Promise<string> => {
    return this._signInRepository.createSignInURL(provider);
  };

  fetchUserAndRegister = async (user: NextAuthUser): Promise<User> => {
    if (!user?.name) {
      //fix: インターフェース層のerror.tsに依存している、、。
      throw new NotFoundError("Insufficient information provided by provider");
    }

    const selectedUser = await this._userGateway.findBySocialId(user.id);

    if (!selectedUser) {
      const insertResult = await this._userGateway.insert(user.id, user.name);

      return new User(
        insertResult.userId,
        insertResult.name,
        insertResult.socialId,
        user.image || null
      );
    }

    return new User(
      selectedUser.userId,
      selectedUser.name,
      selectedUser.socialId,
      user.image || null
    );
  };
}
