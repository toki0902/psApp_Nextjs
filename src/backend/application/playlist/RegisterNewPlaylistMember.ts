import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";

export class RegisterNewPlaylistMemberByPlaylistTitle {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (
    pool: Pool,
    playlistTitle: string,
    user: User,
    videoId: string,
  ) => {
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

    if (!playlistSummery.isOwner(user.userId)) {
      throw new UnAuthorizeError(
        "このお気に入りを所持していません。",
        "you don't own this playlist",
      );
    }

    await this._playlistRepository.insertPlaylistMemberByPlaylistIdsAndVideoId(
      conn,
      videoId,
      [playlistSummery.playlistId],
    );
    conn.release();
    return;
  };
}
