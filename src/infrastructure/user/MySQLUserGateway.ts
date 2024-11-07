import { IUserGateway } from "@/src/domain/dataAccess/IUserGateway";
import mysql from "mysql2/promise";
import { UserRecord } from "./UserRecord";

import { createConnectionPool } from "../db/MySQLConnection";

export class MySQLUserGateway implements IUserGateway {
  private pool = createConnectionPool();
  async findById(id: string): Promise<UserRecord> {
    const userResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>("select * from users where user_id = ?", [
      id,
    ]);
    const record = userResult[0][0];
    return new UserRecord(record.user_id, record.name, record.social_id);
  }

  async findBySocialId(socailId: string): Promise<UserRecord> {
    const userResult = await (
      await this.pool
    ).execute<mysql.RowDataPacket[]>("select * from users where user_id = ?", [
      socailId,
    ]);
    const record = userResult[0][0];
    return new UserRecord(record.user_id, record.name, record.social_id);
  }

  async insert(
    socailId: string,
    name: string
    //一時的にレコードにしている。
  ): Promise<UserRecord> {
    const insertResult = await (
      await this.pool
    ).execute<mysql.ResultSetHeader>(
      "insert into users (name, social_id) values (?, ?)",
      [name, socailId]
    );

    //一時的にオートインクリメントの体
    const insertId = String(insertResult[0].insertId);

    return new UserRecord(insertId, socailId, name);
  }
}
