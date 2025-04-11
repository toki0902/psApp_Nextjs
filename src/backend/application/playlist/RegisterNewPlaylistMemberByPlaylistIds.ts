import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";

export class RegisterNewPlaylistMemberByPlaylistIds {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (
    playlistIds: string[],
    userId: string,
    videoId: string,
  ): Promise<void> => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistsByPlaylistIds(playlistIds);

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    const allOwnedByUser = playlistData.every(
      (playlist) => playlist.ownerId === userId,
    );

    if (!allOwnedByUser) {
      throw new UnAuthorizeError("you don't own this playlists");
    }

    const playlistMemberData =
      await this._playlistRepository.fetchPlaylistMembersByPlaylistIds(
        playlistIds,
      );

    const videoNotIncludedPlaylistIds = playlistMemberData
      .filter((member) =>
        member.videos.every((item) => item.videoId !== videoId),
      )
      .map((playlist) => playlist.playlistId);

    await this._playlistRepository.insertPlaylistMemberByPlaylistIdsAndVideoId(
      videoId,
      videoNotIncludedPlaylistIds,
    );

    return;
  };
}
