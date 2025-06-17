import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";

export class RegisterNewPlaylist {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (pool: Pool, title: string, user: User) => {
    const conn = await pool.getConnection();
    await this._playlistRepository.insertPlaylist(conn, title, user.userId);
    conn.release();
    return;
  };
}
