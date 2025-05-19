import mysql from "mysql2/promise";
import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/backend/domain/entities/User";

import { createConnectionPool } from "../db/MySQLConnection";
import { nanoid } from "nanoid";
import { MySQLError } from "@/src/backend/interface/error/errors";

export class MySQLUserRepository implements IUserRepository {
  private pool = createConnectionPool();
  //undefinedを返しても問題ない！
  async findById(id: string): Promise<User | undefined> {
    const userResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>("select * from users where user_id = ?", [
      id,
    ]);
    const record = userResult[0][0];

    if (!record) {
      return undefined;
    }

    return new User(record.user_id, record.name, "", record.graduation_year);
  }

  async findBySocialId(socialId: string): Promise<User | undefined> {
    const userResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>(
      "select * from users where social_id = ?",
      [socialId],
    );
    const record = userResult[0][0];

    if (!record) {
      return undefined;
    }
    return new User(record.user_id, record.name, "", record.graduation_year);
  }

  async changeGraduationYearByUserId(
    graduationYear: number,
    userId: string,
  ): Promise<void> {
    try {
      await (
        await this.pool
      ).execute<mysql.ResultSetHeader>(
        "update users set (graduation_year = ?) where user_id = ?",
        [graduationYear, userId],
      );
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to change graduation year in process 'changeGraduationYearByUserId' due to :${err}`,
      );
    }
  }

  async insert(socialId: string, name: string): Promise<User> {
    try {
      const userId = nanoid();

      await (
        await this.pool
      ).execute<mysql.ResultSetHeader>(
        "insert into users (user_id, name, social_id) values (?, ?, ?)",
        [userId, name, socialId],
      );

      return new User(userId, name, "", null);
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to register new user in process 'insert' due to :${err}`,
      );
    }
  }
}
