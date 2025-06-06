import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";

export class ChangePlaylistTitleByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (
    pool: Pool,
    playlistId: string,
    userId: string,
    newTitle: string,
  ): Promise<void> => {
    const conn = await pool.getConnection();
    const playlistData =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds(conn, [
        playlistId,
      ]);

    if (!playlistData?.length) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    if (playlistData[0].ownerId !== userId) {
      throw new UnAuthorizeError(
        "このお気に入りを所持していません。",
        "you don't own this playlist",
      );
    }

    await this._playlistRepository.changePlaylistTitleByPlaylistId(
      conn,
      playlistId,
      newTitle,
    );
    conn.release();

    return;
  };
}
