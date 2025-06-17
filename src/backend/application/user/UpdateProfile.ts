import { Pool } from "mysql2/promise";
import { IUserRepository } from "../../domain/dataAccess/repository/IUserRepository";
import { withTransaction } from "../../utils/dbUtils";
import { User } from "../../domain/entities/User";

export class UpdateProfile {
  constructor(private _userRepository: IUserRepository) {}
  run = async (
    pool: Pool,
    user: User,
    name: string | null,
    graduationYear: number | null,
  ) => {
    await withTransaction(pool, async (conn) => {
      if (name) {
        await this._userRepository.changeNameByUserId(conn, name, user.userId);
      }

      if (graduationYear) {
        await this._userRepository.changeGraduationYearByUserId(
          conn,
          graduationYear,
          user.userId,
        );
      }
    });
  };
}
