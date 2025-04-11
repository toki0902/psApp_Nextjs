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

    const hasPlaylist = playlistData.every(
      (playlist) => playlist.ownerId === userId,
    );

    if (!hasPlaylist) {
      throw new UnAuthorizeError("you don't own this playlists");
    }

    await this._playlistRepository.insertPlaylistMemberByPlaylistIdsAndVideoId(
      videoId,
      playlistIds,
    );

    return;
  };
}
