import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";

export class ChangeGraduationYearByUserId {
  constructor(private _userRepository: IUserRepository) {}

  run = async (graduationYear: number, userId: string): Promise<void> => {
    await this._userRepository.changeGraduationYearByUserId(
      graduationYear,
      userId,
    );

    return;
  };
}
