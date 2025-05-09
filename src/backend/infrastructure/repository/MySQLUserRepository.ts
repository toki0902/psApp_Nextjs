import mysql from "mysql2/promise";
import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/backend/domain/entities/User";

import { createConnectionPool } from "../db/MySQLConnection";
import { nanoid } from "nanoid";
import { MySQLError } from "@/src/app/error/errors";

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
    return new User(record.user_id, record.name, record.social_id, "");
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
    return new User(record.user_id, record.name, record.social_id, "");
  }

  //fix: 名前が???になります, idをランダム文字列へ
  async insert(socialId: string, name: string): Promise<User> {
    try {
      const userId = nanoid();

      await (
        await this.pool
      ).execute<mysql.ResultSetHeader>(
        "insert into users (user_id, name, social_id) values (?, ?, ?)",
        [userId, name, socialId],
      );

      return new User(userId, name, socialId, "");
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to register new user in process 'insert' due to :${err}`,
      );
    }
  }
}
