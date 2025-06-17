import { NotFoundError } from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { IVideoRepository } from "@/src/backend/domain/dataAccess/repository/IVideoRepository";
import { Playlist } from "@/src/backend/domain/entities/Playlist";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";
import { PlaylistFactory } from "./PlaylistFactory";

export class FetchPlaylistAndVideosByUserIdAndPlaylistTitle {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  //fix : 最初に見つかったタイトルに一致するプレイリストしか返せない。
  run = async (
    pool: Pool,
    user: User,
    playlistTitle: string,
  ): Promise<Playlist> => {
    const conn = await pool.getConnection();
    const [playlistSummery, playlistMember] =
      await this._playlistRepository.fetchPlaylistByPlaylistTitleAndUserId(
        conn,
        playlistTitle,
        user.userId,
      );

    if (!playlistSummery) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    const factory = new PlaylistFactory(this._videoRepository);
    const [playlist] = await factory.createMultipleFromSummeryAndMembers(
      conn,
      [playlistSummery],
      playlistMember ? [playlistMember] : [],
    );

    conn.release();
    return playlist;
  };
}
