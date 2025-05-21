import { IUserRepository } from "../../domain/dataAccess/repository/IUserRepository";

export class UpdateProfile {
  constructor(private _userRepository: IUserRepository) {}
  run = async (name: string | null, graduationYear: number | null) => {
    if (name) {
      //nameのupdate処理
    }

    if (graduationYear) {
      //graduationYearのupdate処理
    }
  };
}
