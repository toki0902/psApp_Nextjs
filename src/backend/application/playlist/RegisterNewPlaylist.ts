import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";

export class RegisterNewPlaylist {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (pool: Pool, title: string, ownerId: string) => {
    const conn = await pool.getConnection();
    await this._playlistRepository.insertPlaylist(conn, title, ownerId);
    conn.release();
    return;
  };
}
