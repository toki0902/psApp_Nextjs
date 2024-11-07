import { IUserGateway } from "@/src/domain/dataAccess/IUserGateway";
import mysql from "mysql2/promise";
import { UserRecord } from "./UserRecord";

export class MySQLUserGateway implements IUserGateway {
  async findById(conn: mysql.Connection, id: string): Promise<UserRecord> {
    const userResult = await conn.execute<mysql.RowDataPacket[]>(
      "select * from user where user_id = ?",
      [id]
    );
    const record = userResult[0][0];
    return new UserRecord(record.user_id, record.name, record.social_id);
  }

  async findBySocialId(
    conn: mysql.Connection,
    socailId: string
  ): Promise<UserRecord> {
    const userResult = await conn.execute<mysql.RowDataPacket[]>(
      "select * from user where user_id = ?",
      [socailId]
    );
    const record = userResult[0][0];
    return new UserRecord(record.user_id, record.name, record.social_id);
  }

  async insert(
    conn: mysql.Connection,
    socailId: string,
    name: string
    //一時的にレコードにしている。
  ): Promise<UserRecord> {
    const insertResult = await conn.execute<mysql.ResultSetHeader>(
      "insert into user (name, social_id) values (?, ?)",
      [name, socailId]
    );

    //一時的にオートインクリメントの体
    const insertId = String(insertResult[0].insertId);

    return new UserRecord(insertId, socailId, name);
  }
}
