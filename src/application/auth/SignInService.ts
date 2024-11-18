import { NotFoundError } from "@/src/app/error/errors";
import { IUserRepository } from "@/src/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/domain/entities/User";

import type { User as NextAuthUser } from "next-auth";

export class SignInService {
  constructor(private _userRepository: IUserRepository) {}

  createSignInURL = async (provider: string): Promise<string> => {
    const callbackUrl = `${process.env.ROOT_URL}/v1/api/sessions/callback`;
    const redirectUrl = `${process.env.NEXTAUTH_URL}/signin/${provider}?callbackUrl=${callbackUrl}`;
    return redirectUrl;
  };

  fetchUserAndRegister = async (user: NextAuthUser): Promise<User> => {
    if (!user?.name) {
      //fix: インターフェース層のerror.tsに依存している、、。
      throw new NotFoundError("Insufficient information provided by provider");
    }

    const selectedUser = await this._userRepository.findBySocialId(user.id);

    if (!selectedUser) {
      const insertResult = await this._userRepository.insert(
        user.id,
        user.name
      );

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
