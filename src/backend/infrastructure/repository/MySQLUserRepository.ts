import mysql, { Connection } from "mysql2/promise";
import { IUserRepository } from "@/src/backend/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/backend/domain/entities/User";

import { nanoid } from "nanoid";
import { MySQLError } from "@/src/backend/interface/error/errors";

export class MySQLUserRepository implements IUserRepository {
  //undefinedを返しても問題ない！
  async findById(conn: Connection, id: string): Promise<User | undefined> {
    const userResult = await conn.execute<mysql.RowDataPacket[]>(
      "select * from users where user_id = ?",
      [id],
    );
    const record = userResult[0][0];

    if (!record) {
      return undefined;
    }

    return new User(record.user_id, record.name, "", record.graduation_year);
  }

  async findBySocialId(
    conn: Connection,
    socialId: string,
  ): Promise<User | undefined> {
    const userResult = await conn.execute<mysql.RowDataPacket[]>(
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
    conn: Connection,
    graduationYear: number,
    userId: string,
  ): Promise<void> {
    try {
      await conn.execute<mysql.ResultSetHeader>(
        "update users set graduation_year = ? where user_id = ?",
        [graduationYear, userId],
      );
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to change graduation year in process 'changeGraduationYearByUserId' due to :${err}`,
      );
    }
  }

  async changeNameByUserId(
    conn: Connection,
    name: string,
    userId: string,
  ): Promise<void> {
    try {
      await conn.execute<mysql.ResultSetHeader>(
        "update users set name = ? where user_id = ?",
        [name, userId],
      );
    } catch (err) {
      throw new MySQLError(
        "データベースが不具合を起こしました。時間が経ってからやり直してください。",
        `failed to change name in process 'changeNameByUserId' due to :${err}`,
      );
    }
  }

  async insert(
    conn: Connection,
    socialId: string,
    name: string,
  ): Promise<User> {
    try {
      const userId = nanoid();

      await conn.execute<mysql.ResultSetHeader>(
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
