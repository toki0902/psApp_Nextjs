import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";
import { PlaylistFactory } from "./PlaylistFactory";

export class FetchPlaylistsAndVideosByUserId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (pool: Pool, user: User): Promise<Playlist[]> => {
    const conn = await pool.getConnection();
    const [playlistSummery, playlistMembers] =
      await this._playlistRepository.fetchPlaylistsByUserId(conn, user.userId);

    if (!playlistSummery.length) {
      return [];
    }

    const factory = new PlaylistFactory(this._videoRepository);
    const playlists = await factory.createMultipleFromSummeryAndMembers(
      conn,
      playlistSummery,
      playlistMembers,
    );

    conn.release();

    return playlists;
  };
}
