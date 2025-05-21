import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";
import { withTransaction } from "../../utils/dbUtils";

export class RegisterNewPlaylistMemberByPlaylistIds {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (
    pool: Pool,
    playlistIds: string[],
    userId: string,
    videoId: string,
  ): Promise<void> => {
    await withTransaction(pool, async (conn) => {
      const playlistData =
        await this._playlistRepository.fetchPlaylistsByPlaylistIds(
          conn,
          playlistIds,
        );

      if (!playlistData) {
        throw new NotFoundError(
          "お気に入りが存在しません。",
          "playlist is not found",
        );
      }

      const allOwnedByUser = playlistData.every(
        (playlist) => playlist.ownerId === userId,
      );

      if (!allOwnedByUser) {
        throw new UnAuthorizeError(
          "このお気に入りを所持していません。",
          "you don't own this playlist",
        );
      }

      const playlistMemberData =
        await this._playlistRepository.fetchPlaylistMembersByPlaylistIds(
          conn,
          playlistIds,
        );

      const videoNotIncludedPlaylistIds = playlistMemberData
        .filter((member) =>
          member.videos.every((item) => item.videoId !== videoId),
        )
        .map((playlist) => playlist.playlistId);

      await this._playlistRepository.insertPlaylistMemberByPlaylistIdsAndVideoId(
        conn,
        videoId,
        videoNotIncludedPlaylistIds,
      );
    });

    return;
  };
}
