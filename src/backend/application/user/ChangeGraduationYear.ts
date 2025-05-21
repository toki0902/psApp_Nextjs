import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { Pool } from "mysql2/promise";

export class ChangeGraduationYearByUserId {
  constructor(private _userRepository: IUserRepository) {}

  run = async (
    pool: Pool,
    graduationYear: number,
    userId: string,
  ): Promise<void> => {
    const conn = await pool.getConnection();
    await this._userRepository.changeGraduationYearByUserId(
      conn,
      graduationYear,
      userId,
    );

    return;
  };
}
