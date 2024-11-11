import { UserRecord } from "@/src/infrastructure/user/UserRecord";
import mysql from "mysql2/promise";

export interface IUserGateway {
  findById: (id: string) => Promise<UserRecord | undefined>;
  findBySocialId: (socialId: string) => Promise<UserRecord | undefined>;
  insert: (
    socialId: string,
    name: string
    //一時的にRecordにしてます
  ) => Promise<UserRecord>;
}
