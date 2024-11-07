import { UserRecord } from "@/src/infrastructure/user/UserRecord";
import mysql from "mysql2/promise";

export interface IUserGateway {
  findById: (conn: mysql.Connection, id: string) => Promise<UserRecord>;
  findBySocialId: (
    conn: mysql.Connection,
    socialId: string
  ) => Promise<UserRecord>;
  insert: (
    conn: mysql.Connection,
    socialId: string,
    name: string
    //一時的にRecordにしてます
  ) => Promise<UserRecord>;
}
