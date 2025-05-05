import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";

export class RegisterNewPlaylistMemberByPlaylistTitle {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (playlistTitle: string, userId: string, videoId: string) => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistTitleAndUserId(
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
      videoId,
      [playlistData.playlistId],
    );
    return;
  };
}
