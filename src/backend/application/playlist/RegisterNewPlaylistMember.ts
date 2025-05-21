import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";

export class RegisterNewPlaylistMemberByPlaylistTitle {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (
    pool: Pool,
    playlistTitle: string,
    userId: string,
    videoId: string,
  ) => {
    const conn = await pool.getConnection();
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistTitleAndUserId(
        conn,
        playlistTitle,
        userId,
      );

    if (!playlistData) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    if (playlistData.ownerId !== userId) {
      throw new UnAuthorizeError(
        "このお気に入りを所持していません。",
        "you don't own this playlist",
      );
    }

    await this._playlistRepository.insertPlaylistMemberByPlaylistIdsAndVideoId(
      conn,
      videoId,
      [playlistData.playlistId],
    );
    conn.release();
    return;
  };
}
