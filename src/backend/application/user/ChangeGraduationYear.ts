import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";

export class ChangeGraduationYearByUserId {
  constructor(private _userRepository: IUserRepository) {}

  run = async (
    pool: Pool,
    graduationYear: number,
    user: User,
  ): Promise<void> => {
    const conn = await pool.getConnection();
    await this._userRepository.changeGraduationYearByUserId(
      conn,
      graduationYear,
      user.userId,
    );

    conn.release();

    return;
  };
}
