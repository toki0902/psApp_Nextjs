import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";
import { PlaylistFactory } from "./PlaylistFactory";

export class FetchPlaylistAndVideosByUserIdAndPlaylistId {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (
    pool: Pool,
    user: User,
    playlistId: string,
  ): Promise<Playlist> => {
    const conn = await pool.getConnection();
    const [playlistSummery, playlistMembers] =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds(conn, [
        playlistId,
      ]);

    if (!playlistSummery.length) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    const factory = new PlaylistFactory(this._videoRepository);
    const [playlist] = await factory.createMultipleFromSummeryAndMembers(
      conn,
      playlistSummery,
      playlistMembers,
    );

    if (!playlist.isOwner(user.userId)) {
      throw new UnAuthorizeError(
        "このお気に入りを所持していません。",
        "you don't own this playlist",
      );
    }

    conn.release();

    return playlist;
  };
}
