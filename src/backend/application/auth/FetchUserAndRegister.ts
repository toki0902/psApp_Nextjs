import { NotFoundError } from "@/src/app/error/errors";
import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/backend/domain/entities/User";

import type { User as NextAuthUser } from "next-auth/";

export class FetchUserAndRegister {
  constructor(private _userRepository: IUserRepository) {}

  run = async (user: NextAuthUser): Promise<User> => {
    if (!user.name || !user.id) {
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
        user.image || undefined
      );
    }

    return new User(
      selectedUser.userId,
      selectedUser.name,
      selectedUser.socialId,
      user.image || undefined
    );
  };
}
