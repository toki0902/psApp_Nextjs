import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "../../domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";

export class ChangePlaylistTitleByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}
  run = async (
    pool: Pool,
    playlistId: string,
    user: User,
    newTitle: string,
  ): Promise<void> => {
    const conn = await pool.getConnection();
    const [playlistSummery] =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds(conn, [
        playlistId,
      ]);

    if (!playlistSummery.length) {
      throw new NotFoundError(
        "お気に入りが存在しません。",
        "playlist is not found",
      );
    }

    if (!playlistSummery[0].isOwner(user.userId)) {
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
