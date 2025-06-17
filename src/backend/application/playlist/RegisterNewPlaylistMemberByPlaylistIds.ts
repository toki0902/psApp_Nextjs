import {
  NotFoundError,
  UnAuthorizeError,
} from "@/src/backend/interface/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";
import { Pool } from "mysql2/promise";
import { withTransaction } from "../../utils/dbUtils";
import { User } from "../../domain/entities/User";
import { IVideoRepository } from "../../domain/dataAccess/repository/IVideoRepository";
import { PlaylistFactory } from "./PlaylistFactory";

export class RegisterNewPlaylistMemberByPlaylistIds {
  constructor(
    private _playlistRepository: IPlaylistRepository,
    private _videoRepository: IVideoRepository,
  ) {}

  run = async (
    pool: Pool,
    playlistIds: string[],
    user: User,
    videoId: string,
  ): Promise<void> => {
    await withTransaction(pool, async (conn) => {
      const [playlistSummery, playlistMembers] =
        await this._playlistRepository.fetchPlaylistsByPlaylistIds(
          conn,
          playlistIds,
        );

      if (!playlistSummery.length) {
        throw new NotFoundError(
          "お気に入りが存在しません。",
          "playlist is not found",
        );
      }

      const factory = new PlaylistFactory(this._videoRepository);
      const playlists = await factory.createMultipleFromSummeryAndMembers(
        conn,
        playlistSummery,
        playlistMembers,
      );

      const allOwnedByUser = playlists.every((playlist) =>
        playlist.isOwner(user.userId),
      );

      if (!allOwnedByUser) {
        throw new UnAuthorizeError(
          "このお気に入りを所持していません。",
          "you don't own this playlist",
        );
      }

      const videoNotIncludedPlaylistIds = playlists
        .filter((playlist) => !playlist.hasVideo(videoId))
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
