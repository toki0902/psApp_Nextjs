import { Connection } from "mysql2/promise";
import { User } from "../../entities/User";

export interface IUserRepository {
  findById: (conn: Connection, id: string) => Promise<User | undefined>;
  findBySocialId: (
    conn: Connection,
    socialId: string,
  ) => Promise<User | undefined>;
  changeGraduationYearByUserId: (
    conn: Connection,
    graduationYear: number,
    userId: string,
  ) => Promise<void>;
  changeNameByUserId: (
    conn: Connection,
    name: string,
    userId: string,
  ) => Promise<void>;
  insert: (conn: Connection, socialId: string, name: string) => Promise<User>;
}
