import { NotFoundError, UnAuthorizeError } from "@/src/app/error/errors";
import { IPlaylistRepository } from "@/src/backend/domain/dataAccess/repository/IPlaylistRepository";

export class RegisterNewPlaylistMemberByPlaylistId {
  constructor(private _playlistRepository: IPlaylistRepository) {}

  run = async (playlistId: string, userId: string, videoId: string) => {
    const playlistData =
      await this._playlistRepository.fetchPlaylistByPlaylistId(playlistId);

    if (!playlistData) {
      throw new NotFoundError("playlist is not found");
    }

    if (playlistData.ownerId !== userId) {
      throw new UnAuthorizeError("you don't own this playlist");
    }

    await this._playlistRepository.insertPlaylistMember(
      videoId,
      playlistData.playlistId
    );
    return;
  };
}
