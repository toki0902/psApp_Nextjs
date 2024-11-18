import mysql from "mysql2/promise";
import { IUserRepository } from "@/src/domain/dataAccess/repository/IUserRepository";
import { User } from "@/src/domain/entities/User";

import { createConnectionPool } from "../db/MySQLConnection";

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
    return new User(record.user_id, record.name, record.social_id, null);
  }

  async findBySocialId(socialId: string): Promise<User | undefined> {
    const userResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>(
      "select * from users where social_id = ?",
      [socialId]
    );
    const record = userResult[0][0];

    if (!record) {
      return undefined;
    }
    return new User(record.user_id, record.name, record.social_id, null);
  }

  //fix: 名前が???になります, idをランダム文字列へ
  async insert(socialId: string, name: string): Promise<User> {
    const insertResult = await (
      await this.pool
    ).execute<mysql.ResultSetHeader>(
      "insert into users (name, social_id) values (?, ?)",
      [name, socialId]
    );

    //一時的にオートインクリメントの体
    const insertId = String(insertResult[0].insertId);

    return new User(insertId, name, socialId, null);
  }
}
