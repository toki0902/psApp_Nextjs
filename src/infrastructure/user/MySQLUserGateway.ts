import { IUserGateway } from "@/src/domain/dataAccess/IUserGateway";
import mysql from "mysql2/promise";
import { UserRecord } from "./UserRecord";

import { createConnectionPool } from "../db/MySQLConnection";

export class MySQLUserGateway implements IUserGateway {
  private pool = createConnectionPool();
  async findById(id: string): Promise<UserRecord | undefined> {
    const userResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>("select * from users where user_id = ?", [
      id,
    ]);
    const record = userResult[0][0];

    if (!record) {
      return undefined;
    }
    return new UserRecord(record.user_id, record.name, record.social_id);
  }

  async findBySocialId(socialId: string): Promise<UserRecord | undefined> {
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
    return new UserRecord(record.user_id, record.name, record.social_id);
  }

  //fix: 名前が???になります
  async insert(
    socialId: string,
    name: string
    //一時的にレコードにしている。
  ): Promise<UserRecord> {
    const insertResult = await (
      await this.pool
    ).execute<mysql.ResultSetHeader>(
      "insert into users (name, social_id) values (?, ?)",
      [name, socialId]
    );

    //一時的にオートインクリメントの体
    const insertId = String(insertResult[0].insertId);

    return new UserRecord(insertId, name, socialId);
  }
}
