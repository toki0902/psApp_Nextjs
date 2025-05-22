import { Pool } from "mysql2/promise";
import { IUserRepository } from "../../domain/dataAccess/repository/IUserRepository";
import { withTransaction } from "../../utils/dbUtils";

export class UpdateProfile {
  constructor(private _userRepository: IUserRepository) {}
  run = async (
    pool: Pool,
    userId: string,
    name: string | null,
    graduationYear: number | null,
  ) => {
    await withTransaction(pool, async (conn) => {
      if (name) {
        await this._userRepository.changeNameByUserId(conn, name, userId);
      }

      if (graduationYear) {
        await this._userRepository.changeGraduationYearByUserId(
          conn,
          graduationYear,
          userId,
        );
      }
    });
  };
}
