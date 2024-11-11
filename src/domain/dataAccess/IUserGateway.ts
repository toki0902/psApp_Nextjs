import { UserRecord } from "@/src/infrastructure/user/UserRecord";

export interface IUserGateway {
  findById: (id: string) => Promise<UserRecord | undefined>;
  findBySocialId: (socialId: string) => Promise<UserRecord | undefined>;
  insert: (
    socialId: string,
    name: string
    //一時的にRecordにしてます
  ) => Promise<UserRecord>;
}
