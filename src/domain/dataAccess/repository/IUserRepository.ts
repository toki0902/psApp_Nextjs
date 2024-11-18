import { User } from "../../entities/User";

export interface IUserRepository {
  findById: (id: string) => Promise<User | undefined>;
  findBySocialId: (socialId: string) => Promise<User | undefined>;
  insert: (socialId: string, name: string) => Promise<User>;
}
