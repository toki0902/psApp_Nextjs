import { NotFoundError } from "@/src/backend/interface/error/errors";
import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/backend/domain/entities/User";

import type { User as NextAuthUser } from "next-auth/";
import { Pool } from "mysql2/promise";

export class FetchUserAndRegister {
  constructor(private _userRepository: IUserRepository) {}

  run = async (pool: Pool, user: NextAuthUser): Promise<User> => {
    const conn = await pool.getConnection();
    if (!user.name || !user.id) {
      //fix: インターフェース層のerror.tsに依存している、、。
      throw new NotFoundError(
        "ユーザ名またはIDが設定されていません。",
        "Insufficient information provided by provider",
      );
    }

    const selectedUser = await this._userRepository.findBySocialId(
      conn,
      user.id,
    );

    if (!selectedUser) {
      const insertResult = await this._userRepository.insert(
        conn,
        user.id,
        user.name,
      );

      conn.release();
      return new User(
        insertResult.userId,
        insertResult.name,
        user.image || "",
        null,
      );
    }
    conn.release();
    return new User(
      selectedUser.userId,
      selectedUser.name,
      user.image || "",
      selectedUser.graduationYear,
    );
  };
}
