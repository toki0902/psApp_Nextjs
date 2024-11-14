import { User } from "../entities/User";

export interface IUserGateway {
  findById: (id: string) => Promise<User | undefined>;
  findBySocialId: (socialId: string) => Promise<User | undefined>;
  insert: (
    socialId: string,
    name: string
    //一時的にRecordにしてます
  ) => Promise<User>;
}
